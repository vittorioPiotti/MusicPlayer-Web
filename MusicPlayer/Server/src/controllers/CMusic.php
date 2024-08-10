<?php



/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

    /**
     * @access public
     * @package controllers
     * @author Vittorio Piotti
     *
     * Class CMusic
    */

    require_once __DIR__ . '/../models/MMusic.php';

    class CMusic {


        public function __construct() {
        }

        public function getRequest($apiMethod) {
            switch ($apiMethod) {
                case 'getMusic':
                    $this->getMusic();
                    break;
                case 'getMusicMin':
                    $this->getMusicMin();
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(array("error" => "Metodo non trovato"));
                    break;
            }
        }




        public function postRequest($apiMethod) {
            switch ($apiMethod) {
                default:
                    http_response_code(404);
                    echo json_encode(array("error" => "Metodo non trovato"));
                    break;
            }
        }
        
        

        
        public function getMusic(){
        	  $idMusic = isset($_GET['idMusic']) ? $_GET['idMusic'] : null;
              $model = new MMusic();
              $resp = $model->getMusic($idMusic);
              echo $resp;
        
        }

        public function getMusicMin(){
            $idMusic = isset($_GET['idMusic']) ? $_GET['idMusic'] : null;
            $model = new MMusic();
            $resp = $model->getMusicMin($idMusic);
            echo $resp;
      
      }

   
     
    }


?>
