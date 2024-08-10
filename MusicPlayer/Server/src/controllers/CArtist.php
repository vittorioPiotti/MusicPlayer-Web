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
     * Class CArtist
    */

    

    require_once __DIR__ . '/../models/MArtist.php';

    class CArtist {


        public function __construct() {
        }

        public function getRequest($apiMethod) {
            switch ($apiMethod) {
                case 'getAllArtistData':
                    $this->getAllArtistData();
                    break;
                case 'getArtist':
                    $this->getArtist();
                    break;
                case 'getAlbums':
                    $this->getAlbums();
                    break;
                case 'getSingles':
                    $this->getSingles();
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
        
       public function getArtist(){
       	      $idArtist = isset($_GET['idArtist']) ? $_GET['idArtist'] : null;
              $model = new MArtist();
              $resp = $model->getArtist($idArtist);
              echo $resp;
       }
       
       
       public function getAlbums(){
        	  $idArtist = isset($_GET['idArtist']) ? $_GET['idArtist'] : null;
              $listIds = isset($_GET['listIds']) ? $_GET['listIds'] : null;
              $model = new MArtist();
              $resp = $model->getAlbums($idArtist,$listIds);
              echo $resp;
            
        
        }
        public function getSingles(){
        	    $idArtist = isset($_GET['idArtist']) ? $_GET['idArtist'] : null;
              $listIds = isset($_GET['listIds']) ? $_GET['listIds'] : null;
              $model = new MArtist();
              $resp = $model->getSingles($idArtist,$listIds);
              echo $resp;
        
        }
        
        public function getAllArtistData(){
        	  $idArtist = isset($_GET['idArtist']) ? $_GET['idArtist'] : null;
              $model = new MArtist();
              $resp = $model->getAllArtistData($idArtist);
              echo $resp;
        
        }

   
     
    }


?>
