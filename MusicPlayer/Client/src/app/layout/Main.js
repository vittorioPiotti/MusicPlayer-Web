/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

/**
 * Swiper 11.1.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2024 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 30, 2024
 */

/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */

/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

import Artist from "../pages/Artist.js";
import Home from "../pages/Home.js";
import Music from "../pages/Music.js";
import Constants from "../utilities/Constants.js";

export default class Main {
    constructor(callbacks,isMusicSession) {
    
        this.isMusicSession = isMusicSession
        this.page = "";
        this.callbacks = callbacks
        this.isCreated = false;
        this.isLoaded = false;

        this.home = new Home(
            'main',
            this.callbacksManager().home  
        );

        this.artist = new Artist(
            'main',
            this.callbacksManager().artist
        );

        this.music = new Music(
            'main',
            this.callbacksManager().music
        );
    }


    init = async (page,elementId,isLoaded) => {
        
        return new Promise((resolve, reject) => {

 
         
          
            const lastPage = this.isMusicSession == true ? 'music' : this.page;
            if(this.isMusicSession == true){
                this.isMusicSession = false
            }

            
            
            const initPage = async (page,elementId) => {

                this.page = page;
                switch(this.page) {
                    case 'home':
                        document.title = "MP · Home";

                        this.stopAllWorkers(lastPage)


                        this.home.init(lastPage);
                        
                        break;
                    case 'artist':
                        document.title = "MP · Artist";


                            this.stopAllWorkers(lastPage)
                     
                            this.artist.init(elementId,this.isLoaded);
                        
                        break;
                    case 'music':
                        
                        this.stopAllWorkers(lastPage)
                        document.title = "MP · Music";
                        this.music.init(elementId);  
                        break;
        
                    default:
                        break;
                }
                
                this.callbacks.initNavbar(this.page);
            

            }

            const  initNavbar = async () =>{
                this.callbacks.initNavbar(this.page);
            }


            const initialize = async (page, elementId) => {
                // Esegui initPage e initNavbar in parallelo
                await Promise.all([
                    initPage(page, elementId),
                    initNavbar()
                ]);
                Constants.scrollTop();
            }

        
            initialize(page,elementId);

            resolve(true); // or reject() on error
    });
      
    }


    stopAllWorkers = (lastPage) =>{
        switch(lastPage){
            case 'music':
                this.music.stopAllWorkers();
                break;
            case 'artist':
                this.artist.stopAllWorkers();
                break;
            case 'home':
                this.home.stopAllWorkers();
                break;
            default:
                break;
        }
    }

   
    updateMusic = (albumId,forceInx) =>{
        if(albumId == this.music.elementId){

            this.music.updateMusic(forceInx)
        }
        
    }


    callbacksManager = () =>{

        const callbacksHome = () => {
        
            const goToPage = async (elementId,elementType) =>{
                switch(elementType){
                    case "album":
                        await this.init("music",elementId,this.isLoaded)
                        break;
                    case "artist":
                        await this.init("artist",elementId,this.isLoaded)
                        break;
                    default:
                        break;
                }

            }

            const setMusicList = (elementId,elementType) =>{
                this.callbacks.setMusicList(elementId,elementType)
            }
            
            return {

                goToPage:goToPage,
                setMusicList:setMusicList
            };
        };

        const callbacksArtist = () => {
   
            const goToPage = async (elementId,elementType) =>{
           
                switch(elementType){
                    case "single":
                        await this.init("music",elementId,this.isLoaded)
                        break;
                    case "album":
                        await this.init("music",elementId,this.isLoaded)
                        break;
                    default:
                        break;
                }

            }

            const onlyPlay = (albumId) =>{
                this.callbacks.onlyPlay(albumId)

            }

            const onlyShuffle = (albumId)=>{
                this.callbacks.onlyShuffle(albumId)

            }
            const setMusicList = (elementId,elementType) =>{
                this.callbacks.setMusicList(elementId,elementType)
            }
            

            return {
                onlyPlay:onlyPlay,
                onlyShuffle:onlyShuffle,
                goToPage:goToPage,
                setMusicList:setMusicList
            };
        };

        const callbacksMusic = () => {
            

            const getAlbumId = () =>{
                return this.callbacks.getAlbumId();
            }
            const getIsPlaying = () =>{
                return this.callbacks.getIsPlaying();

            }
            const getSingleId = () =>{
                return this.callbacks.getSingleId();
            }

            const checkAvailableSong = () =>{
                return this.callbacks.checkAvailableSong();
            }
            const togglePlay = (albumId,element) =>{
                this.callbacks.togglePlay(albumId,element)

            }

            const togglePlaySong = (albumId,songId) =>{
                this.callbacks.togglePlaySong(albumId,songId)
            }


            const shuffle = (albumId,element) =>{
                this.callbacks.shuffle(albumId,element)

            }

            const goToPage = (elementId,elementType) =>{
                this.callbacks.setMusicList(elementId,elementType)
            }

            const goToArtist = (elementId) => {

                this.init("artist",elementId,this.isLoaded)
            };



         
            
            return {
                getAlbumId:getAlbumId,
                getIsPlaying:getIsPlaying,
                getSingleId:getSingleId,
                goToArtist: goToArtist,
                goToPage:goToPage,
                togglePlay:togglePlay,
                checkAvailableSong:checkAvailableSong,
                togglePlaySong:togglePlaySong,
                shuffle:shuffle
            };
        };

        return{
            home:callbacksHome(),
            artist:callbacksArtist(),
            music:callbacksMusic()
        }

    }
   
}
