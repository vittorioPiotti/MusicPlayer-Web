<?php



/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

    $sessionTTL = 3600; 

    session_set_cookie_params([
        'lifetime' => $sessionTTL,
        'path' => '/',
        'domain' => '', 
        'secure' => false, 
        'httponly' => false, 
    ]);
    ini_set('session.gc_maxlifetime', $sessionTTL);
    session_start();


   
    
    

    if (isset($_POST['theme'])) {
        $_SESSION['theme'] = $_POST['theme'];
    } 
    if (isset($_POST['user_id'])) {
        $_SESSION['user_id'] = $_POST['user_id'];
    } 

    if (isset($_POST['music_id'])) {
        $_SESSION['music_id'] = $_POST['music_id'];
    } 

    if (isset($_POST['album_id'])) {
        $_SESSION['album_id'] = $_POST['album_id'];
    } 


?>
