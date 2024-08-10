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


import Footer from './layout/Footer.js';
import Header from './layout/Header.js';
import Main from './layout/Main.js';
import Navbar from './layout/Navbar.js';
import Animations from './utilities/Animations.js';
import Constants from './utilities/Constants.js';

export default class App {

    constructor(page,singleId,albumId,idArtist,idMusic,musicIdSession,albumIdSession) {
        this.musicIdSession = musicIdSession;
        this.albumIdSession = albumIdSession;
        this.idArtist = idArtist;
        this.idMusic = idMusic;
        this.page = page;
        this.albumId = albumId;
        this.singleId = singleId;
        this.footer = new Footer("footer");
        this.header = new Header("header");
        this.navbar = new Navbar("navbar",this.callbacksManager().navbar,this.albumId,this.singleId);
        this.main = new Main(this.callbacksManager().main, this.musicIdSession != -1 && this.albumIdSession != -1 ? true : false );
    }



    


    init = () => {
        this.header.init();
        this.footer.init(); 
        this.navbar.init(
            this.page == 'home' 
                ? "Accedi per caricare brani"
                : `${Constants.CHEVRON_LEFT} Home`
            ,
            this.page == 'home' 
                ? `${Constants.CHEVRON_LEFT} Home`
                : "Accedi per caricare brani"
            ,
            this.page == 'home' 
                ? this.callbacksManager().navbar.goToProfile
                : this.callbacksManager().navbar.goToHome
        
        ); 
        this.main.init(this.page,
            this.page == 'artist' ? this.idArtist : 
            this.page == 'music' ? this.idMusic : -1,
            this.navbar.isLoaded
        ); 
    }



    

    
    callbacksManager = () => {
        const callbacksMain = () =>{
            
            const getIsPlaying = () =>{
                return this.navbar.getIsPlaying()
            }

            const getAlbumId = () =>{
                return this.navbar.albumId;
            }
            const getSingleId = () =>{
                return this.navbar.singleId;
            }
            const togglePlay = (albumId,element) =>{
                
                if(this.navbar.isDownloading == false && this.navbar.isToggleClicked == false){
                    Animations.fade(element, ()=>{
                        this.navbar.togglePlayCallback(albumId)
                    })
                }
            }   
            const checkAvailableSong = () =>{
                return this.navbar.checkAvailableSong()
            }

            const togglePlaySong = (albumId,songId) =>{
                return this.navbar.togglePlaySong(albumId,songId)
             

            }

            const onlyPlay = (albumId) =>{
                
                if(this.navbar.isDownloading == false && this.navbar.isToggleClicked == false){
                        this.navbar.togglePlayCallback(albumId)
                    }
                }
        

            const onlyShuffle =  (albumId) =>{
                
                if(this.navbar.isDownloading == false && this.navbar.isToggleClicked == false){
                        
                         this.navbar.toggleShuffle(albumId)
          
                }
            }   

            const shuffle =  (albumId,element) =>{
                
                if(this.navbar.isDownloading == false && this.navbar.isToggleClicked == false){
                    Animations.fade(element,  ()=>{
                        
                         this.navbar.toggleShuffle(albumId)
                    })
                }
            }   

            const initNavbar = (page) => {
                this.navbar.setupDynamicbar(  
                page == 'home' 
                    ? "Accedi per caricare brani"
                    : `${Constants.CHEVRON_LEFT} Home`
                ,
                page == 'home' 
                    ? `${Constants.CHEVRON_LEFT} Home`
                    : "Accedi per caricare brani"
                ,
                page == 'home' 
                    ? this.callbacksManager().navbar.goToProfile
                    : this.callbacksManager().navbar.goToHome
                );
            }

            const setMusicList = async (elementId,elementType) => {
                this.navbar.setMusicList(elementId)
            }


            return {
                onlyPlay:onlyPlay,
                onlyShuffle:onlyShuffle,
                getAlbumId:getAlbumId,
                getIsPlaying:getIsPlaying,
                getSingleId:getSingleId,
                initNavbar: initNavbar,
                setMusicList:setMusicList,
                checkAvailableSong:checkAvailableSong,
                togglePlaySong:togglePlaySong,
                togglePlay:togglePlay,
                shuffle:shuffle,
            }
        }

        const callbacksNavbar = () => {


            const updateMusic = (forceInx) =>{
                if(this.main.page == "music"){
                    this.main.updateMusic(this.navbar.albumId,forceInx);
                }
            }


            const goToHome = () => {
                if(this.main.page != "home"){
                    this.main.init("home",-1,this.navbar.isLoaded); 
                }
            }

            const goToProfile = () => {
                if(this.main.page != "home"){
                    this.main.init("home",-1,this.navbar.isLoaded); 
                }
            }


            const goToMusic = (idAlbum) => {
                if( this.main.page != "music" ||  this.main.music.elementId != idAlbum ){
                    this.main.init("music",idAlbum,this.navbar.isLoaded); 
                }else{
                    
                    Constants.scrollTop();

                }
            }

            return {
                updateMusic:updateMusic,
                goToHome: goToHome,
                goToProfile:goToProfile,
                goToMusic:goToMusic,
            }

        }

        return {
            navbar: callbacksNavbar(),
            main: callbacksMain()
        }


    }
   


}




