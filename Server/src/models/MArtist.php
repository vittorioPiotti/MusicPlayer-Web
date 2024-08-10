<?php


/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

    /**
     * @access public
     * @package models
     * @author Vittorio Piotti
     *
     * Class MArtist
    */

    require_once __DIR__ . '/../foundations/FDB.php';

    class MArtist {
        
        private $db; 

        private $queryGetArtist = "
            SELECT 
                IdArtista AS ArtistId,
                Immagine AS ArtistImage,
                Nome AS ArtistName,
                Descrizione AS ArtistDescription,
                LuogoNascita AS BirthPlace,
                DataNascita AS BirthDate,
                GenereMusicale AS ArtistGenre
            FROM 
                MusicPlayer_Artista
            WHERE 
                IdArtista = :idArtist;
        ";

        private $queryGetAllArtistData = "
        SELECT DISTINCT
            a.IdArtista,
            a.Immagine AS ArtistImage,
            a.Nome AS ArtistName,
            a.Descrizione AS ArtistDescription,
            a.LuogoNascita AS BirthPlace,
            a.DataNascita AS BirthDate,
            a.GenereMusicale AS ArtistGenre,
            p.IdPubblicazione,
            p.Immagine AS PublicationImage,
            p.Titolo AS PublicationTitle,
            p.GenereMusicale AS PublicationGenre,
            CASE
                WHEN EXISTS (
                    SELECT 1 
                    FROM MusicPlayer_Canzone c 
                    WHERE c.IdPubblicazioneMusicale = p.IdPubblicazione 
                    AND c.IsExplicit = 1
                ) THEN 1
                ELSE 0
            END AS IsExplicit,
            COALESCE(pc.SongCount, 0) AS SongCount,
            CASE
                WHEN COALESCE(pc.SongCount, 0) > 1 THEN 1
                ELSE 0
            END AS IsAlbum
        FROM 
            MusicPlayer_Artista a
            LEFT JOIN MusicPlayer_Pubblicazione p ON a.IdArtista = p.IdArtista
            LEFT JOIN (
                SELECT
                    p.IdPubblicazione,
                    COUNT(c.IdCanzone) AS SongCount
                FROM
                    MusicPlayer_Pubblicazione p
                    LEFT JOIN MusicPlayer_Canzone c ON p.IdPubblicazione = c.IdPubblicazioneMusicale
                GROUP BY
                    p.IdPubblicazione
            ) pc ON p.IdPubblicazione = pc.IdPubblicazione
        WHERE 
            a.IdArtista = :idArtist
        ORDER BY RAND()
    ";
        
    private $queryGetAlbums = "
        SELECT 
            p.IdPubblicazione, 
            p.Titolo, 
            p.Immagine, 
            p.GenereMusicale, 
            CASE
                WHEN EXISTS (
                    SELECT 1 
                    FROM MusicPlayer_Canzone c 
                    WHERE c.IdPubblicazioneMusicale = p.IdPubblicazione 
                    AND c.IsExplicit = 1
                ) THEN 1
                ELSE 0
            END AS IsExplicit
        FROM 
            MusicPlayer_Pubblicazione p
            LEFT JOIN MusicPlayer_Canzone c ON p.IdPubblicazione = c.IdPubblicazioneMusicale
        WHERE 
            p.IdPubblicazione NOT IN (:listIds) 
            AND p.IdArtista = :idArtist
        GROUP BY 
            p.IdPubblicazione, p.Titolo, p.Immagine, p.GenereMusicale
        HAVING 
            COUNT(c.IdCanzone) > 1
        ORDER BY 
            RAND()
    ";

        private $queryGetSingles = "
            SELECT 
                p.IdPubblicazione, p.Titolo, p.Immagine, p.GenereMusicale, p.IsExplicit
            FROM 
                MusicPlayer_Pubblicazione p
                LEFT JOIN MusicPlayer_Canzone c ON p.IdPubblicazione = c.IdPubblicazioneMusicale
            WHERE 
                p.IdPubblicazione NOT IN (:listIds) AND p.IdArtista = :idArtist
            GROUP BY 
                p.IdPubblicazione, p.Titolo, p.Immagine, p.GenereMusicale, p.IsExplicit
            HAVING 
                COUNT(c.IdCanzone) = 1
            ORDER BY 
                RAND()

        ";

        public function __construct() {
            $this->db = FDB::getInstance()->getConnection();
        }
    
        public function closeConnection() {
            FDB::getInstance()->closeConnection();
        }
        
        public function getArtist($idArtist) {
            $statement = $this->db->prepare($this->queryGetArtist);
            $statement->bindParam(':idArtist', $idArtist, PDO::PARAM_INT);
            $statement->execute();
            $results = $statement->fetch(PDO::FETCH_ASSOC);
            $this->closeConnection();
            return json_encode($results);
        }
        
        public function getAllArtistData($idArtist) {
            $statement = $this->db->prepare($this->queryGetAllArtistData);
            $statement->bindParam(':idArtist', $idArtist, PDO::PARAM_INT);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->closeConnection();
            
            if (empty($results)) {
                return json_encode([]);
            }
            
            // Dati dell'artista
            $response = [
                'artista' => [
                    'IdArtista' => $results[0]['IdArtista'],
                    'ArtistImage' => $results[0]['ArtistImage'],
                    'ArtistName' => $results[0]['ArtistName'],
                    'ArtistDescription' => $results[0]['ArtistDescription'],
                    'BirthPlace' => $results[0]['BirthPlace'],
                    'BirthDate' => $results[0]['BirthDate'],
                    'ArtistGenre' => $results[0]['ArtistGenre'],
                ],
                'album' => [],
                'single' => []
            ];
            
            // Separazione delle pubblicazioni in album e singoli
            foreach ($results as $row) {
                if (!empty($row['IdPubblicazione'])) { // Controllo se ci sono pubblicazioni
                    $publication = [
                        'IdPubblicazione' => $row['IdPubblicazione'],
                        'PublicationImage' => $row['PublicationImage'],
                        'PublicationTitle' => $row['PublicationTitle'],
                        'PublicationGenre' => $row['PublicationGenre'],
                        'IsExplicit' => $row['IsExplicit']
                    ];
            
                    if ((int)$row['IsAlbum'] === 1) {
                        $response['album'][] = $publication;
                    } else {
                        $response['single'][] = $publication;
                    }
                }
            }
            
            return json_encode($response);
        }
        
        

        public function getAlbums($idArtist, $listIds) {
            $statement = $this->db->prepare($this->queryGetAlbums);
            $statement->bindParam(':idArtist', $idArtist, PDO::PARAM_INT);
            $statement->bindParam(':listIds', $listIds, PDO::PARAM_STR);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->closeConnection();
            return json_encode($results);
        }

        public function getSingles($idArtist, $listIds) {
            $statement = $this->db->prepare($this->queryGetSingles);
            $statement->bindParam(':idArtist', $idArtist, PDO::PARAM_INT);
            $statement->bindParam(':listIds', $listIds, PDO::PARAM_STR);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->closeConnection();
            return json_encode($results);
        }
    }
?>
