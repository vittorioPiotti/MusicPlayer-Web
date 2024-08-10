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
     * Class MHome
    */


class MHome {
    private $db;

    private $queryGetMusics = "
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
    FROM MusicPlayer_Pubblicazione p
    WHERE p.IdPubblicazione NOT IN (:listIds)
    ORDER BY RAND()
    LIMIT 10;
";

    private $queryGetArtists = "
        SELECT IdArtista, Nome, Immagine, GenereMusicale
        FROM MusicPlayer_Artista
        WHERE IdArtista NOT IN (:listIds)
        ORDER BY RAND()
        LIMIT 10;
    ";
    
    private $queryGetSearchedArtists = "
        SELECT IdArtista, Nome, Immagine, GenereMusicale
        FROM MusicPlayer_Artista
        WHERE Nome REGEXP :searchText
        AND (
            (SELECT COUNT(*) FROM MusicPlayer_Artista WHERE Nome REGEXP :searchText) <= 10
            OR IdArtista NOT IN (:listIds)
        )
        ORDER BY RAND()
        LIMIT 10;
    ";


    private $queryGetSearchedMusics = "
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
    FROM MusicPlayer_Pubblicazione p
    WHERE p.Titolo REGEXP :searchText
    AND (
        (SELECT COUNT(*) FROM MusicPlayer_Pubblicazione WHERE Titolo REGEXP :searchText) <= 10
        OR p.IdPubblicazione NOT IN (:listIds)
    )
    ORDER BY RAND()
    LIMIT 10;
";



private $queryGetAllHomeData = "
    SELECT DISTINCT
        a.IdArtista,
        a.Nome AS ArtistName,
        a.Immagine AS ArtistImage,
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
        CASE
            WHEN pc.SongCount > 1 THEN 1
            ELSE 0
        END AS IsAlbum
    FROM 
        MusicPlayer_Artista a
    JOIN 
        MusicPlayer_Pubblicazione p ON a.IdArtista = p.IdArtista
    LEFT JOIN 
        (
            SELECT
                p.IdPubblicazione,
                COUNT(c.IdCanzone) AS SongCount
            FROM
                MusicPlayer_Pubblicazione p
            LEFT JOIN 
                MusicPlayer_Canzone c ON p.IdPubblicazione = c.IdPubblicazioneMusicale
            GROUP BY
                p.IdPubblicazione
        ) pc ON p.IdPubblicazione = pc.IdPubblicazione
    ORDER BY 
        RAND()
    LIMIT 10
";






    public function __construct() {
        $this->db = FDB::getInstance()->getConnection();
    }

    public function closeConnection() {
        FDB::getInstance()->closeConnection();
    }

    public function getSearchedMusics($searchText, $listIds) {
        $statement = $this->db->prepare($this->queryGetSearchedMusics);
        $statement->bindParam(':searchText', $searchText, PDO::PARAM_STR);
        $statement->bindParam(':listIds', $listIds, PDO::PARAM_STR);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
        return json_encode($results);
    }

    public function getSearchedArtists($searchText, $listIds) {
        $statement = $this->db->prepare($this->queryGetSearchedArtists);
        $statement->bindParam(':searchText', $searchText, PDO::PARAM_STR);
        $statement->bindParam(':listIds', $listIds, PDO::PARAM_STR);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
        return json_encode($results);
    }

    public function getArtists($listIds) {
        $statement = $this->db->prepare($this->queryGetArtists);
        $statement->bindParam(':listIds', $listIds, PDO::PARAM_STR);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
        return json_encode($results);
    }

    public function getMusics($listIds) {
        $statement = $this->db->prepare($this->queryGetMusics);
        $statement->bindParam(':listIds', $listIds, PDO::PARAM_STR);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
        return json_encode($results);
    }

    public function getAllHomeData() {
        $statement = $this->db->prepare($this->queryGetAllHomeData);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
    
        // Initialize the response structure
        $response = [
            'artists' => [],
            'musics' => []
        ];
    
        $artistsSeen = [];
        $musicsSeen = [];
    
        foreach ($results as $row) {
            // Add artist data
            if (!empty($row['IdArtista'])) {
                $artistId = $row['IdArtista'];
                if (!in_array($artistId, $artistsSeen)) {
                    $response['artists'][] = [
                        'IdArtista' => $artistId,
                        'Nome' => $row['ArtistName'],
                        'Immagine' => $row['ArtistImage'],
                        'GenereMusicale' => $row['ArtistGenre']
                    ];
                    $artistsSeen[] = $artistId;
                }
            }
            // Add music data
            if (!empty($row['IdPubblicazione'])) {
                $musicId = $row['IdPubblicazione'];
                if (!in_array($musicId, $musicsSeen)) {
                    $response['musics'][] = [
                        'IdPubblicazione' => $musicId,
                        'Titolo' => $row['PublicationTitle'],
                        'Immagine' => $row['PublicationImage'],
                        'GenereMusicale' => $row['PublicationGenre'],
                        'IsExplicit' => $row['IsExplicit']
                    ];
                    $musicsSeen[] = $musicId;
                }
            }
        }
    
        return json_encode($response);
    }
    
    
    
}
?>
