<?php


/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/src/autoloader.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$api = new FAPI();
$api->listener();



?>