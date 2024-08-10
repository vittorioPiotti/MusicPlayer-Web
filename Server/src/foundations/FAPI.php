<?php



/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

    /**
     * @access public
     * @package foundation
     * @author Vittorio Piotti
     * 
     * Class FAPI
     */


    require_once __DIR__ . '/../controllers/CHome.php';
    require_once __DIR__ . '/../controllers/CArtist.php';
	require_once __DIR__ . '/../controllers/CMusic.php';

    class FAPI {



        public function listener() {
            $serverMethod = $_SERVER['REQUEST_METHOD'];
            
            $apiType = isset($_GET['type']) ? $_GET['type'] : null;
            
            switch ($serverMethod) {
                case 'GET':
                    $this->getRequest($apiType);
                    break;
                case 'POST':
                    $this->postRequest($apiType);
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(array("error" => "Metodo non consentito"));
                    break;
            }
        }

        private function getRequest($apiType) {
            $apiMethod = isset($_GET['method']) ? $_GET['method'] : null;

            switch ($apiType) {
                case 'home':
					$cHome = new CHome();
                    $cHome->getRequest($apiMethod);
                    break;
                case 'music':
                    $cMusic = new CMusic();
                    $cMusic->getRequest($apiMethod);
                    break;
                case 'artist':
					$cArtist = new CArtist();
                    $cArtist->getRequest($apiMethod);
                    break;
                case 'auth':
                    echo json_encode(array("error" => "API auth non disponibile "));
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(array("error" => "API non trovata"));
                    break;
            }
        }

        private function postRequest($apiType) {
            $apiMethod = isset($_GET['method']) ? $_GET['method'] : null;

            switch ($apiType) {
                case 'home':
                    $cHome = new CHome();
                    $cHome->postRequest($apiMethod);
                    break;
                case 'music':
                    $cMusic = new CMusic();
                    $cMusic->getRequest($apiMethod);
                    break;
                case 'artist':
                    $cArtist = new CArtist();
                    $cArtist->postRequest($apiMethod);
                    break;
                case 'auth':
                    echo json_encode(array("error" => "API auth non disponibile "));
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(array("error" => "API non trovata"));
                    break;
            }
        }


    }


?>
