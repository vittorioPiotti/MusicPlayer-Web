<?php


/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

 
session_start(); // Assicurati che la sessione sia avviata per accedere alle variabili di sessione

header('Content-Type: application/json'); // Imposta l'intestazione per il tipo di contenuto JSON

// Recupera i dati dalla sessione
$data = [
    'page' => isset($_SESSION['page']) ? $_SESSION['page'] : 'home',
    'idArtist' => isset($_SESSION['idArtist']) ? $_SESSION['idArtist'] : -1,
    'idMusic' => isset($_SESSION['idMusic']) ? $_SESSION['idMusic'] : -1,
    'theme' => isset($_SESSION['theme']) ? htmlspecialchars($_SESSION['theme']) : 'light',
    'userId' => isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : -1,
    'sessionId' => session_id(),
    'musicId' => isset($_SESSION['music_id']) ? (int) $_SESSION['music_id'] : -1,
    'albumId' => isset($_SESSION['album_id']) ? (int) $_SESSION['album_id'] : -1

];

// Restituisci i dati come JSON
echo json_encode($data);
?>
