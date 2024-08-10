<?php


/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

/**
 * @access public
 * @package models
 * @author
 *
 * Class MMusic
 */

require_once __DIR__ . '/../foundations/FDB.php';

class MMusic {

    private $db;

    private $queryGetMusic = "
    SELECT 
        p.IdPubblicazione, 
        p.Immagine, 
        p.IdArtista, 
        CASE
            WHEN EXISTS (
                SELECT 1 
                FROM MusicPlayer_Canzone c2 
                WHERE c2.IdPubblicazioneMusicale = p.IdPubblicazione 
                AND c2.IsExplicit = 1
            ) THEN 1
            ELSE 0
        END AS PubblicazioneIsExplicit, 
        p.GenereMusicale, 
        p.DataPubblicazione, 
        p.CasaDiscografica,
        p.Titolo AS PubblicazioneTitolo, 
        a.Nome AS ArtistName,
        c.Titolo AS SongTitle,
        c.Audio AS SongAudio,
        c.IdCanzone AS SongId,
        c.IsExplicit AS SongIsExplicit,
        c.Featurings AS SongFeaturings
    FROM 
        MusicPlayer_Pubblicazione p
    JOIN 
        MusicPlayer_Artista a ON p.IdArtista = a.IdArtista
    LEFT JOIN 
        MusicPlayer_Canzone c ON p.IdPubblicazione = c.IdPubblicazioneMusicale
    WHERE 
        p.IdPubblicazione = :idMusic
    ORDER BY 
        c.Track;
";
private $queryGetMusicMin = "
    SELECT 
        p.IdPubblicazione, 
        p.Immagine, 
        p.Titolo AS PubblicazioneTitolo, 
        a.Nome AS ArtistName,
        c.Titolo AS SongTitle,
        c.IdCanzone AS SongId,
        c.Audio AS SongUrl,
        c.Featurings AS SongCollabs,
        c.IsExplicit AS SongIsExplicit,
        CASE
            WHEN EXISTS (
                SELECT 1 
                FROM MusicPlayer_Canzone c2 
                WHERE c2.IdPubblicazioneMusicale = p.IdPubblicazione 
                AND c2.IsExplicit = 1
            ) THEN 1
            ELSE 0
        END AS PubblicazioneIsExplicit
    FROM 
        MusicPlayer_Pubblicazione p
    JOIN 
        MusicPlayer_Artista a ON p.IdArtista = a.IdArtista
    LEFT JOIN 
        MusicPlayer_Canzone c ON p.IdPubblicazione = c.IdPubblicazioneMusicale
    WHERE 
        p.IdPubblicazione = :idMusic
    ORDER BY 
        c.Track;
";
    public function __construct() {
        $this->db = FDB::getInstance()->getConnection();
    }

    public function closeConnection() {
        FDB::getInstance()->closeConnection();
    }

    public function getMusic($idMusic) {
        $statement = $this->db->prepare($this->queryGetMusic);
        $statement->bindParam(':idMusic', $idMusic, PDO::PARAM_INT);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();

        if (empty($results)) {
            return json_encode([]);
        }

        // Initialize the response structure
        $response = [
            'pubblicazione' => [
                'IdPubblicazione' => $results[0]['IdPubblicazione'],
                'Immagine' => $results[0]['Immagine'],
                'IdArtista' => $results[0]['IdArtista'],
                'IsExplicit' => $results[0]['PubblicazioneIsExplicit'],
                'GenereMusicale' => $results[0]['GenereMusicale'],
                'DataPubblicazione' => $results[0]['DataPubblicazione'],
                'CasaDiscografica' => $results[0]['CasaDiscografica'],
                'ArtistName' => $results[0]['ArtistName'],
                'Titolo' => $results[0]['PubblicazioneTitolo']
            ],
            'canzoni' => []
        ];

        // Populate canzoni array
        foreach ($results as $row) {
            $song = [
                'Titolo' => $row['SongTitle'],
                'Audio' => $row['SongAudio'],
                'IdCanzone' => $row['SongId'],
                'IsExplicit' => $row['SongIsExplicit'],
                'Featurings' => $row['SongFeaturings'] // Added Featurings field
            ];
            $response['canzoni'][] = $song;
        }

        return json_encode($response);
    }
    public function getMusicMin($idMusic) {
        $statement = $this->db->prepare($this->queryGetMusicMin);
        $statement->bindParam(':idMusic', $idMusic, PDO::PARAM_INT);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
    
        if (empty($results)) {
            return json_encode([]);
        }
    
        // Inizializza la struttura della risposta
        $response = [
            'prodotto' => [
                'image' => $results[0]['Immagine'],
                'author' => $results[0]['ArtistName'],
                'id' => $results[0]['IdPubblicazione'],
                'title' => $results[0]['PubblicazioneTitolo']
            ],
            'canzoni' => []
        ];
    
        // Popola l'array canzoni
        foreach ($results as $row) {
            $song = [
                'name' => $row['SongTitle'],
                'collabs' => $row['SongCollabs'], // Assumendo che Featurings contenga i collaboratori
                'url' => $row['SongUrl'],
                'isExplicit' => (bool)$row['SongIsExplicit'],
                'id' => $row['SongId']
            ];
            $response['canzoni'][] = $song;
        }
    
        return json_encode($response);
    }
    
}



?>

