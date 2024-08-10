<?php


/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

    include 'config/session.php';
    
    $_SESSION['page'] = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_STRING) ?: 'home';
    $_SESSION['idArtist'] = filter_input(INPUT_GET, 'idArtist', FILTER_SANITIZE_NUMBER_INT) ?: -1;
    $_SESSION['idMusic'] = filter_input(INPUT_GET, 'idMusic', FILTER_SANITIZE_NUMBER_INT) ?: -1;
    $_SESSION['theme'] = isset($_SESSION['theme']) ? htmlspecialchars($_SESSION['theme']) : 'light';
    $_SESSION['user_id'] = isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : -1;
    $_SESSION['music_id'] = isset($_SESSION['music_id']) ? (int) $_SESSION['music_id'] : -1;
    $_SESSION['album_id'] = isset($_SESSION['album_id']) ? (int) $_SESSION['album_id'] : -1;

?>
