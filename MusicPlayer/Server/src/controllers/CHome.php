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
     * Class CHome
    */

    require_once __DIR__ . '/../models/MHome.php';

    class CHome {


        public function __construct() {
        }

        public function getRequest($apiMethod) {
            switch ($apiMethod) {
                case 'getMusicsAndArtists':
                    $this->getMusicsAndArtists();
                    break;
                case 'getMusics':
                    $this->getMusics();
                    break;
                case 'getArtists':
                    $this->getArtists();
                    break;
				case 'getSearchedArtists':
                    $this->getSearchedArtists();
                    break;
                case 'getSearchedMusics':
                    $this->getSearchedMusics();
                    break;
                case 'getAllHomeData':
                    $this->getAllHomeData();
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
        private function getMusicsAndArtists() {
                  
            echo json_encode(array("error" => "Metodo getMusicsAndArtists non disponibile"));

        }
        
        public function getSearchedMusics(){
        	$searchText = isset($_GET['searchText']) ? $_GET['searchText'] : null;
              $listIds = isset($_GET['listIds']) ? $_GET['listIds'] : null;
              $model = new MHome();
              $resp = $model->getSearchedMusics($searchText,$listIds);
              echo $resp;
        
        }


        public function getAllHomeData(){
            $model = new MHome();
            $resp = $model->getAllHomeData();
            echo $resp;

        }

        public function getSearchedArtists () {
              $searchText = isset($_GET['searchText']) ? $_GET['searchText'] : null;
              $listIds = isset($_GET['listIds']) ? $_GET['listIds'] : null;
              $model = new MHome();
              $resp = $model->getSearchedArtists($searchText,$listIds);
              echo $resp;
        }
        
        private function getMusics() {
            $listIds = isset($_GET['listIds']) ? $_GET['listIds'] : null;
            $model = new MHome();
            $resp = $model->getMusics($listIds);
            echo $resp;
        }

        private function getArtists(){
            $listIds = isset($_GET['listIds']) ? $_GET['listIds'] : null;
            $model = new MHome();
            $resp = $model->getArtists($listIds);
            echo $resp;
          }
     
    }


?>
