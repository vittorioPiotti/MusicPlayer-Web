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

import TimingBar from '../design/TimingBar.js';
import Animations from '../utilities/Animations.js';
import Constants from "../utilities/Constants.js";
import WorkerManager from '../utilities/WorkerManager.js';


export default class Navbar extends WorkerManager{
    

    constructor(id,callbacks,albumId,singleId){

        
        super()
        this.opera;
        this.id = id;
        this.callbacks = callbacks;
        this.timingBar;
        this.timingBarSmall;
        this.albumIcon;
        this.explicitSong;
        this.songName;
        this.songInfo;
        this.albumIconSmall;
        this.explicitSongSmall;
        this.songNameSmall;
        this.songInfoSmall;
        this.navSongSvg;
        this.navSongSvgSmall;
        this.isActive = false;
        this.isProcessing = false;
        this.icons;
        this.iconIds;
        this.navbarCenterElement;
        this.navbarCenterElementSmall;
        this.isDownloading = false;
        this.isClickable = false;
        this.isShuffle = false;
        this.isRepeat = false;
        this.contentCenter;
        this.contentCenterSmall;
        this.progressBar;
        this.progressBarSmall;
        this.albumId = albumId;
        this.singleId = singleId;
        this.audioArray = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isToggleClicked = false;
        this.isFirstToggleShuffle = true;
        this.isFirstLoad = true;
        this.appIsExplicit = -1;
        this.lastAlbumId = -1;
        this.startAudio = new Audio('../../../../client/assets/audios/test.mp3');
        this.systemData = this.getSystemData();


    }

    createStickyNavbar(elementId, stickyClass) {
        var navbar = document.getElementById(elementId);
        var sticky = navbar.offsetTop;
        function stickyNavbar() {
            if (window.pageYOffset > sticky) {
                navbar.classList.add(stickyClass);
            } else {
                navbar.classList.remove(stickyClass);
            }
        }
        window.onscroll = function() {
            stickyNavbar();
        };
    }
    setMusicData = (albumId,singleId) =>{
        this.albumId = albumId
        this.singleId = singleId;
        this.fetchData()
    }


    
    getIsPlaying =  () => {
        


        return this.isPlaying

    }
    
    initOpera = () =>{
        const musics = []
            musics.push({
                name:  "",
                collabs: "",
                url:"",
                isExplicit:false,
                isHover: false,
                isPlaying: false,
                id:-1
            })  
        return {
            prodotto:
            {
                image:"",
                author: "",
                id:-1
            },
            canzoni: musics
        }
    }




    

    getIsPc = () => {
        const platform = navigator.platform;
        const isWindows = /Windows/.test(platform);
        const isMac = /Mac/.test(platform);

        const os = isWindows ? 'Windows' :
                    isMac ? 'macOS' : ''

        return os
    }
    getSystemData() {

        //macos 
        //  chrome-edge-opera ruota di 90 gradi a sinistra
        //  firefox immagine non visibile
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor) && !/OPR/.test(userAgent) && !/Edg/.test(userAgent);
        const isEdge = /Edg/.test(userAgent) || /Edge/.test(userAgent);
        const isFirefox = /Firefox/.test(userAgent);
        const isOpera = /OPR/.test(userAgent) || /Opera/.test(userAgent);
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent) && !/OPR/.test(userAgent) && !/Edg/.test(userAgent);    
        const isWindows = /Windows/.test(platform);
        const isMac = /Mac/.test(platform);
        const isAndroid = /Android/.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const browser = isChrome ? 'Chrome' :
                        isEdge ? 'Edge' :
                        isFirefox ? 'Firefox' :
                        isOpera ? 'Opera' :
                        isSafari ? 'Safari' :
                        '';
        const os = isWindows ? 'Windows' :
                    isMac ? 'macOS' :
                    isAndroid ? 'Android' :
                    isIOS ? 'iOS' :
                    '';



        switch(os){
            case 'macOS':
            case 'Windows':
                switch(browser){
                    case 'Chrome':
                    case 'Edge':
                    case 'Opera':
                        return 1;
                    case 'Firefox':
                        return 2;
                    default:
                        return -1;
                }
            default:
                return -1;
        }
     
    }
    
    
    
    getMimeTypeFromExtension(url) {
        const extension = url.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            case 'webp':
                return 'image/webp';
            case 'svg':
                return 'image/svg+xml';
            default:
                return 'image/jpeg'; // Default, in case the type is unknown
        }
    }
    
    rotateImage90DegreesRight(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Se l'immagine è su un dominio diverso
            img.onload = () => {
                // Crea un canvas e un contesto
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Imposta la dimensione del canvas
                canvas.width = img.height;
                canvas.height = img.width;
                
                // Ruota l'immagine di 90 gradi verso destra
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(0);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                
                // Crea un URL per l'immagine ruotata
                const rotatedImageUrl = canvas.toDataURL('image/png');
                resolve(rotatedImageUrl);
            };
    
            img.onerror = (error) => {
                reject(error);
            };
    
            img.src = imageUrl;
        });
    }
    
    setParams = async (title, artist, album, imageUrl) => {
        if ('mediaSession' in navigator) {
            const mimeType = this.getMimeTypeFromExtension(imageUrl);
            const image = this.systemData === 1 && imageUrl !== './assets/images/song.png' ? await this.rotateImage90DegreesRight(imageUrl) : imageUrl;
    
            // Aggiorna MediaSession Metadata
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                artist: artist,
                album: album,
                artwork: [
                    { src: image, sizes: '512x512', type: mimeType }
                ]
            });
    
            // Gestisci play
            navigator.mediaSession.setActionHandler('play', async () => {

                if (this.audioArray.length === 0) return;
                    this.isPlaying = true;
                    this.audioArray[this.currentIndex].play();
                    this.audioArray[this.currentIndex].playbackRate = 1;

                    this.timingBar.play();
                    this.timingBarSmall.play();
                    this.callbacks.updateMusic(-1);

                    this.clickPlayFill()

                
            });
    
            // Gestisci pause
            navigator.mediaSession.setActionHandler('pause', async () => {

                if (this.audioArray.length === 0) return;
                    this.isPlaying = false;
                    const pc = this.getIsPc()
                    if(pc == 'macOS' || pc == "Windows"){
                       
                        this.audioArray[this.currentIndex].pause()
                    }else{
                        
                         this.audioArray[this.currentIndex].playbackRate = 0;

                    }

                    this.timingBar.pause();
                    this.timingBarSmall.pause();
                    this.callbacks.updateMusic(-1);

                    this.clickPlayFill()

                
    
            });
    
            // Gestisci previous track
            navigator.mediaSession.setActionHandler('previoustrack', async () => {
                if (this.audioArray.length === 0) return;
    
                // Pause all tracks
                this.audioArray.forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
    
                // Se shuffle è abilitato, seleziona un brano casuale
                if (this.isShuffle) {
                    this.currentIndex = Math.floor(Math.random() * this.audioArray.length);
                } else {
                    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.audioArray.length - 1;
                }
    
                // Aggiorna i dati e i metadati della musica
                this.setMusicData(this.opera.prodotto.id, this.opera.canzoni[this.currentIndex].id);
                const result = await this.fetchOneAudioWorker(this.opera.canzoni[this.currentIndex].url, this.currentIndex);
                await this.setParams(this.opera.canzoni[this.currentIndex].name, this.opera.prodotto.author, this.opera.canzoni.length === 1 ? "Singolo" : this.opera.prodotto.title, this.opera.prodotto.image);
    
                // Riproduci la nuova traccia
                if (!this.isPlaying) {
                    this.isPlaying = true;

                    this.clickPlayFill()
                  
                }
    
                this.audioArray[this.currentIndex].play();
                this.audioArray[this.currentIndex].volume = this.progressBar.value / 100;
                this.timingBar.play();
                this.timingBarSmall.play();
    
                // Fade in le nuove animazioni
                Animations.fade(this.contentCenter, () => this.secondLoad(result));
                Animations.fade(this.contentCenterSmall, () => this.secondLoadSmall(result));
    
                this.callbacks.updateMusic(-1);
            });
    
            // Gestisci next track
            navigator.mediaSession.setActionHandler('nexttrack', async () => {
                if (this.audioArray.length === 0) return;
    
                // Pause all tracks
                this.audioArray.forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
    
                // Se shuffle è abilitato, seleziona un brano casuale
                if (this.isShuffle) {
                    this.currentIndex = Math.floor(Math.random() * this.audioArray.length);
                } else {
                    this.currentIndex = (this.currentIndex < this.audioArray.length - 1) ? this.currentIndex + 1 : 0;
                }
    
                // Aggiorna i dati e i metadati della musica
                this.setMusicData(this.opera.prodotto.id, this.opera.canzoni[this.currentIndex].id);
                const result = await this.fetchOneAudioWorker(this.opera.canzoni[this.currentIndex].url, this.currentIndex);
                await this.setParams(this.opera.canzoni[this.currentIndex].name, this.opera.prodotto.author, this.opera.canzoni.length === 1 ? "Singolo" : this.opera.prodotto.title, this.opera.prodotto.image);
    
                if (!this.isPlaying) {
                    this.isPlaying = true;

                    this.clickPlayFill()
                  
                }
    
                this.audioArray[this.currentIndex].play();
                this.audioArray[this.currentIndex].volume = this.progressBar.value / 100;
                this.timingBar.play();
                this.timingBarSmall.play();
    
                // Fade in le nuove animazioni
                Animations.fade(this.contentCenter, () => this.secondLoad(result));
                Animations.fade(this.contentCenterSmall, () => this.secondLoadSmall(result));
    
                this.callbacks.updateMusic(-1);
            });

            const updatePosition = () => {
                const playbackRate = this.audioArray[this.currentIndex].playbackRate;
                
                if (playbackRate > 0) {
                    navigator.mediaSession.setPositionState({
                        duration: this.audioArray[this.currentIndex].duration,
                        playbackRate: playbackRate,
                        position: this.audioArray[this.currentIndex].currentTime
                    });
                }
            };
            if(this.audioArray.length != 0){
                this.audioArray[this.currentIndex].addEventListener('timeupdate', updatePosition);
            }
        }
    };


   
     setOpera = (obj) => {
        const musics = obj.canzoni.map(canzone => ({
            name: canzone.name,
            collabs: canzone.collabs,
            url: canzone.url,
            isExplicit: canzone.isExplicit,
            isHover: false,
            isPlaying: false,
            id: canzone.id
        }));
        
        return {
            prodotto: {
                image: obj.prodotto.image,
                author: obj.prodotto.author,
                id: obj.prodotto.id,
                title: obj.prodotto.title 
            },
            canzoni: musics
        };
    };
    

    
     initProgressbar(progressBar, callback) {
        function updateProgress() {
            const value = progressBar.value;
            callback(value);
            progressBar.style.setProperty('--range-progress', `${value}%`);
            progressBar.style.setProperty('--thumb-position', `${value}%`)
            const otherProgressBar = progressBar.id === 'progress-bar' ?
                document.getElementById('progress-bar-small') :
                document.getElementById('progress-bar');
            if (otherProgressBar) {
                otherProgressBar.value = value;
                otherProgressBar.style.setProperty('--range-progress', `${value}%`);
                otherProgressBar.style.setProperty('--thumb-position', `${value}%`);
            }
        }
        progressBar.addEventListener('input', () => {
            const value = progressBar.value;
            progressBar.style.setProperty('--range-progress', `${value}%`);
            progressBar.style.setProperty('--thumb-position', `${value}%`);
        });
        progressBar.addEventListener('change', updateProgress);
    }

    animationOnCallback = (newText, callback) => {
        document.getElementById('dynamic-bar').innerHTML = newText;
        callback();
    }
    
    setupDynamicbar = (currentText,newText, callback) => {
        document.getElementById('dynamic-bar').innerHTML = currentText;
        document.getElementById('dynamic-bar').addEventListener('click', () => {
            Animations.fade(document.getElementById('dynamic-bar'), () => {
                this.animationOnCallback(newText, callback);
            });
        });
    }
    

    setProgressBar = (progressBar,value) =>{
        progressBar.style.setProperty('--range-progress', `${value}%`);
        progressBar.style.setProperty('--thumb-position', `${value}%`);
        progressBar.value = value;
    }


    callbacksManager = () =>{
        const progressBar = () =>{
            const onChange = (id,value) =>{
                this.setTime(value)
                if(id == 'timing-bar'){
                    this.timingBarSmall.setValue(value);
                    this.timingBarSmall.updateProgressBarStyle();
                }else{
                    this.timingBar.setValue(value);
                    this.timingBar.updateProgressBarStyle();
                }
            }
            return {
                onChange: onChange
            }
        }
        return {
            progressBar:progressBar()
        }
    }

    loadPlay = () =>{
        
        this.audioArray[this.currentIndex].play();
        this.isPlaying = true;
        this.forceTogglePlay(this.icons['play-fill-icon'], this.timingBar)
        this.forceTogglePlay(this.icons['play-fill-icon-small'], this.timingBarSmall)
    }

    doPlay = () =>{
        this.audioArray[this.currentIndex].play();
        this.isPlaying = true;
    }

    doStop = () =>{
        this.audioArray[this.currentIndex].pause();
        this.isPlaying = false;
        this.timingBarSmall.setValue(0);
        this.timingBar.setValue(0);
        this.audioArray[this.currentIndex].pause();
        this.audioArray[this.currentIndex].currentTime = 0;   
    }
    loadPause = () =>{
      
        this.audioArray[this.currentIndex].pause();
        this.isPlaying = false;
        this.forceTogglePause(this.icons['play-fill-icon'], this.timingBar)
        this.forceTogglePause(this.icons['play-fill-icon-small'], this.timingBarSmall)

    }

    play =() => {
        if (!this.isPlaying) {
            this.audioArray[this.currentIndex].play();
            this.isPlaying = true;
        }
    }

    forcePlay = () =>{
        this.audioArray[this.currentIndex].play();
        this.isPlaying = true;
    }

    setVolume =(volume) => {
        if (this.isProcessing || this.audioArray == []) {
            return;
        } else {
            this.isProcessing = true;
            
            if (this.currentIndex >= 0 && this.currentIndex < this.audioArray.length) {
                const audio = this.audioArray[this.currentIndex];
                if (audio) {
                    audio.volume = volume;
                }
            }
            setTimeout(() => {
                this.isProcessing = false;
            }, 300); 
        }
    }
    
    pause() {
        if (this.isPlaying) {
            this.audioArray[this.currentIndex].pause();
            this.isPlaying = false;
        }
    }

    setTime(seconds) {
        if (this.audioArray[this.currentIndex]) {
            this.audioArray[this.currentIndex].currentTime = seconds;
        }
    }





    async next(state) {
        
        if (this.isProcessing) {
            return; 
        } else {
            this.prepareDoPreviousOrNext()
            if (this.isShuffle) {
                this.currentIndex = Math.floor(Math.random() * this.audioArray.length);
            } else if (this.isRepeat && state) {
            } else {
                if (this.currentIndex < this.audioArray.length - 1) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 0;
                }
            }
            await this.doPreviousOrNext()
        }
    }
    
    
    
    async previous() {
        if (this.isProcessing) {
            return; 
        } else {    
            this.prepareDoPreviousOrNext()
            if (this.isShuffle) {
                this.currentIndex = Math.floor(Math.random() * this.audioArray.length);
            } else {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                } else {
                    this.currentIndex = this.audioArray.length - 1;
                }
            }
            this.doPreviousOrNext()
        }
    }


    prepareDoPreviousOrNext = () =>{
        this.stopAllWorkers();
        this.resetWorkers();
        this.isProcessing = true;
        this.timingBarSmall.setValue(0);
        this.timingBar.setValue(0);
        this.audioArray[this.currentIndex].pause();
        this.audioArray[this.currentIndex].currentTime = 0;          
        this.timingBar.pause()
        this.timingBarSmall.pause()
        this.isActive = false;
        this.setCursor(false);
        this.progressBar.disabled = true;
        this.progressBarSmall.disabled = true;
        this.timingBar.progressBar.disabled = true
        this.timingBarSmall.progressBar.disabled = true
        this.isDownloading = true;
        
    }

    doPreviousOrNext = async () =>{
       
        await this.fetchData();
        this.setMusicData(this.opera.prodotto.id,this.opera.canzoni[this.currentIndex].id)

        this.waitingNavbarSecond(this.opera.prodotto.image)
        await new Promise(resolve => setTimeout(resolve, 500));
        this.fetchOneAudioWorker( this.opera.canzoni[this.currentIndex].url, this.currentIndex)
            .then(result  => {
                if (this.isPlaying) {
                    this.audioArray[this.currentIndex].play();
                    this.timingBar.play()
                    this.timingBarSmall.play()
                }
                this.isActive = true;
                this.setCursor(true);
                this.progressBar.disabled = false;
                this.progressBarSmall.disabled = false;
                this.timingBar.progressBar.disabled = false
                this.timingBarSmall.progressBar.disabled =false
                const duration = result;
                this.audioArray[this.currentIndex].volume = this.progressBar.value/100;
                this.timingBar.setDuration(duration);
                this.timingBarSmall.setDuration(duration);  
                Animations.fade( this.contentCenter, () => {
                    this.songInfo.innerHTML  = `${this.opera.prodotto.author} - ${this.opera.canzoni[this.currentIndex].collabs != "" ? `${this.opera.canzoni[this.currentIndex].collabs}` : "Single"}`;
                    this.songName.innerHTML  = this.opera.canzoni[this.currentIndex].name
                    this.timingBar.setDisabled(false)
                });
                Animations.fade( this.contentCenterSmall, () => {
                    this.songInfoSmall.innerHTML  = `${this.opera.prodotto.author} - ${this.opera.canzoni[this.currentIndex].collabs != "" ? `${this.opera.canzoni[this.currentIndex].collabs}` : "Single"}`;
                    this.songNameSmall.innerHTML  = this.opera.canzoni[this.currentIndex].name
                    this.timingBarSmall.setDisabled(false)
                });
                this.setParams(this.opera.canzoni[this.currentIndex].name,this.opera.prodotto.author,this.opera.canzoni.length == 1 ? "Singolo" :this.opera.prodotto.title,this.opera.prodotto.image)  
                this.callbacks.updateMusic(-1);

                setTimeout(()=>{  this.isDownloading = false; this.isProcessing = false;}, 700)
            })
            .catch(error => {
                console.error('Error during audio processing:', error);
                this.isProcessing = false;
                return;
            });
            
    }




    stop() {
        if (this.isPlaying) {
            this.audioArray[this.currentIndex].pause();
            this.audioArray[this.currentIndex].currentTime = 0;
            this.isPlaying = false;
        }
    }

    initNavbar = (data) =>{
       
        this.opera = this.setOpera(data)
        for(let i = 0; i < this.opera.canzoni.length; i ++){
            
            if(this.opera.canzoni[i].id == this.singleId){
                
                this.currentIndex = i;

            }
        }
        this.initAudioArray()
        this.fetchData()
        this.setMusicData(this.opera.prodotto.id,this.opera.canzoni[this.currentIndex].id)

    
    
    }


    initAudioArray = () =>{
        this.audioArray  = this.opera.canzoni.map(canzone => new Audio(canzone.url));
        this.audioArray.forEach((audio, index) => {
            audio.addEventListener('ended', async ()=> {
                await this.next(true)
                this.setParams(this.opera.canzoni[this.currentIndex].name,this.opera.prodotto.author,this.opera.canzoni.length == 1 ? "Singolo" :this.opera.prodotto.title,this.opera.prodotto.image)  
//forse setParams
                });
        });      
    }
    updateNavbar = (data) =>{
        this.opera = this.setOpera(data)
        
        this.initAudioArray()      
        this.currentIndex = 0;
        this.fetchData()

    }
    startPlayback = () => {
        this.startAudio.play()
            .then(() => {
                console.log('Riproduzione avviata con successo');
                
                // Imposta i parametri della traccia
                this.setParams('Nessun brano in riproduzione', '', '', './assets/images/song.png', 'image/png');
                
                // Arresta la riproduzione dopo un breve intervallo di tempo
                setTimeout(() => {
                    this.startAudio.pause();  // Usa pause() invece di stop() perché stop() non è supportato in HTML5 Audio
                    this.startAudio.currentTime = 0;  
                }, 50); // Cambia 1000 con il tempo in millisecondi che vuoi attendere prima di fermare la riproduzione
                
                document.removeEventListener('click', this.startPlayback);
            })
            .catch((error) => {
                console.error('Errore durante l\'avvio della riproduzione:', error);
            });
    };
    
    init = async (currentText,newText,callback) =>  {
        document.getElementById(this.id).innerHTML = this.innerHTML();
        this.createStickyNavbar(this.id, 'sticky-navbar');
        this.progressBar = document.getElementById('progress-bar');
        this.progressBarSmall = document.getElementById('progress-bar-small');
        if(this.albumId == -1){
            this.opera = this.initOpera();
        }else{
            await this.fetchWorker('getMusicMin',{elementId:this.albumId},this.initNavbar)


        }
        this.timingBar = new TimingBar('timing-bar',this.callbacksManager().progressBar);
        this.timingBarSmall = new TimingBar('timing-bar-small',this.callbacksManager().progressBar);
        this.albumIcon = document.getElementById('nav-album-icon')
        this.explicitSong = document.getElementById('navbar-explicit-song')
        this.songName = document.getElementById('song-name')
        this.songInfo = document.getElementById('song-info')
        this.navSongSvg = document.getElementById('nav-song-svg');
        this.navSongSvgSmall = document.getElementById('nav-song-svg-small');
        this.albumIconSmall = document.getElementById('nav-album-icon-small')
        this.explicitSongSmall = document.getElementById('navbar-explicit-song-small')
        this.songNameSmall = document.getElementById('song-name-small')
        this.songInfoSmall = document.getElementById('song-info-small')
        this.navbarCenterElement = document.getElementById('navbar-center-elem');
        this.navbarCenterElementSmall = document.getElementById('navbar-center-elem-small');
        this.contentCenter = document.getElementById('content-center');
        this.contentCenterSmall = document.getElementById('content-center-small');
        this.iconIds = [
            'nav-album-icon','nav-album-icon-small','shuffle-icon', 'skip-backward-icon', 'play-fill-icon',
            'skip-forward-icon', 'repeat-icon', 'volume-off-fill-icon', 'volume-up-fill-icon',
            'shuffle-icon-small', 'skip-backward-icon-small', 'play-fill-icon-small',
            'skip-forward-icon-small', 'repeat-icon-small', 'volume-off-fill-icon-small', 'volume-up-fill-icon-small'
        ];
        this.icons = this.iconIds.reduce((acc, id) => {
            const element = document.getElementById(id);
            if (!element) {
            }
            acc[id] = element;
            return acc;
        }, {});
        this.setProgressBar(this.progressBar,70);
        this.setProgressBar(this.progressBarSmall,70);
        this.initProgressbar(this.progressBar, (value) => { this.setVolume(value/100)        });
        this.initProgressbar(this.progressBarSmall,(value) => {this.setVolume (value/100)        });
        this.setupDynamicbar(currentText,newText,callback);
        this.setAnimations()
        if(this.albumId == -1){
            this.isDownloading = false;
            this.inactiveNavbar()

 
            document.addEventListener('click', this.startPlayback, { once: true });
            

            
        }else{
            this.lastAlbumId = this.opera.prodotto.id
            this.isDownloading = true;
            this.waitingNavbarStart(this.opera.prodotto.image)
            this.setCurrentIndexSong(this.singleId)
            await new Promise(resolve => setTimeout(resolve, 500));
            this.fetchOneAudioWorker( this.opera.canzoni[this.currentIndex].url, this.currentIndex)
                .then(result => {
                        if (this.terminated) return;
                        this.activeNavbar(result)
                      

                        setTimeout(()=>{  this.isDownloading = false;}, 700)
                })
                .catch(error => {
                    console.error('Error during audio processing:', error);
                });

        }
        
    }
    
    setCursor(stato) {
        this.iconIds.forEach(id => {
                const element = this.icons[id];
                if (element) {
                    element.style.cursor = stato ? 'pointer' : 'default';
                }
        });
    }


    toggleVolume(value) {
        [this.progressBar, this.progressBarSmall].forEach(bar => {
            if (bar) {
                bar.value = value;
                bar.style.setProperty('--range-progress', `${value}%`);
            }
        });
    }


    toggleRepetitionMode(btnShuffle, btnRepeat, state,stateForceShuffle,stateOperation) {
        return () => {
            if (this.isProcessing && stateForceShuffle == false) {
                return; 
            } else {
                const [activeBtn, inactiveBtn] = state ? [btnShuffle, btnRepeat] : [btnRepeat, btnShuffle];
                if (activeBtn.classList.contains('icon-active')) {
                    activeBtn.classList.remove('icon-active');
                    this.isShuffle = false;
                    this.isRepeat = false;
                } else {
                    activeBtn.classList.add('icon-active');
                    if(inactiveBtn.classList.contains('icon-active')){
                        Animations.fade(inactiveBtn, ()=>{  
                            inactiveBtn.classList.remove('icon-active')
                        });
                    }else{
                        inactiveBtn.classList.remove('icon-active')
                    }

                    if(stateOperation == true){
                        if (activeBtn === btnShuffle) {
                            this.isShuffle = true;
                            this.isRepeat = false;
                        } else {
                            

                            this.isShuffle = false;
                            this.isRepeat = true;
                        }
                    }
                }

            }
            setTimeout(() => {
                this.isProcessing = false;
            }, 300);
        }  
    }
    
    forceTogglePause =(svgElement, progressBarInstance) =>{

        const forcePlayCallback = (svgElement, progressBarInstance) => () => {
            const newPath = 'm11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393';
        
            // Imposta il percorso direttamente
            svgElement.querySelector('path').setAttribute('d', newPath);
        
            progressBarInstance.isPlaying = false;
            progressBarInstance.startInterval();
        
            // Imposta attributi SVG
            svgElement.setAttribute('width', '16');
            svgElement.setAttribute('height', '16');
            svgElement.setAttribute('viewBox', '0 0 16 16');
        };
        Animations.fade(svgElement, forcePlayCallback(svgElement, progressBarInstance));
    }
    forceTogglePauseSecond =(svgElement, progressBarInstance) =>{

        const forcePlayCallback = (svgElement, progressBarInstance) => () => {
            const newPath = 'm11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393';
        
            // Imposta il percorso direttamente
            svgElement.querySelector('path').setAttribute('d', newPath);
        
            progressBarInstance.isPlaying = false;
            progressBarInstance.startInterval();
        
            // Imposta attributi SVG
            svgElement.setAttribute('width', '16');
            svgElement.setAttribute('height', '16');
            svgElement.setAttribute('viewBox', '0 0 16 16');
        };
        forcePlayCallback(svgElement, progressBarInstance)
    }
    forceTogglePlaySecond =(svgElement, progressBarInstance) =>{


        const forcePlayCallback = (svgElement, progressBarInstance) => () => {
            const newPath = 'M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5';
        
            // Imposta il percorso direttamente
            svgElement.querySelector('path').setAttribute('d', newPath);
        
            progressBarInstance.isPlaying = true;
            progressBarInstance.startInterval();
        
            // Imposta attributi SVG
            svgElement.setAttribute('width', '16');
            svgElement.setAttribute('height', '16');
            svgElement.setAttribute('viewBox', '0 0 16 16');
        };
        forcePlayCallback(svgElement, progressBarInstance)
    }
    forceTogglePlay =(svgElement, progressBarInstance) =>{


        const forcePlayCallback = (svgElement, progressBarInstance) => () => {
            const newPath = 'M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5';
        
            // Imposta il percorso direttamente
            svgElement.querySelector('path').setAttribute('d', newPath);
        
            progressBarInstance.isPlaying = true;
            progressBarInstance.startInterval();
        
            // Imposta attributi SVG
            svgElement.setAttribute('width', '16');
            svgElement.setAttribute('height', '16');
            svgElement.setAttribute('viewBox', '0 0 16 16');
        };
        Animations.fade(svgElement, forcePlayCallback(svgElement, progressBarInstance));
    }
    
            togglePlayCallback = async (albumId) =>{
                if(this.isDownloading == false && this.isToggleClicked  == false){
                    this.isDownloading = true
                    this.isToggleClicked  = true
                    for(let i = 0; i < this.audioArray.length; i ++){
                        this.audioArray[i].pause();
                        this.audioArray[i].currentTime = 0;
                    }


                    if(albumId != this.albumId){
                        this.albumId = albumId;
                        //set currentIndex 0
                        await this.changeNavbar(this.albumId,-1)
                            .then (()=>{
                                    if(this.isPlaying == false){
                                        this.loadPlay();
                                    }else{
                                        this.audioArray[this.currentIndex].play();
                                        this.isPlaying = true;
                                    }
                            })
                    }else{
                        //set currentIndex 0
                            this.changeNavbarSecond(-1)
                            .then (()=>{
                                if(this.isPlaying == false){
                                    this.loadPlay();
                                }else{
                                    this.audioArray[this.currentIndex].play();
                                    this.isPlaying = true;
                                } 
                            })
                    }
           
                    const isPlayingApp = this.isPlaying;
                    this.isPlaying = true
                    this.callbacks.updateMusic(0)
                    this.isPlaying =isPlayingApp
                    

                    setTimeout(()=>{  this.isDownloading = false;this.isToggleClicked = false;}, 1000)
                }
            }
  
            setCurrentIndexSong = (songId) =>{
                for(let i = 0; i < this.opera.canzoni.length; i++){
                    if(this.opera.canzoni[i].id == songId){
                        this.currentIndex = i;
                        break;
                    }
                }
            }

            setMusicList = (elementId) =>{
                if(this.isDownloading == false){

                    if(elementId != this.opera.prodotto.id){
                        this.isDownloading = true
                        this.stop()
                        this.changeNavbar(elementId)
                            .then(() => {
                                if(document.getElementById('play-fill-icon').innerHTML.trim() == `<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"></path>`){
                                    this.loadPlay()
                                }else{
                                    this.play()
                                }
                                setTimeout(()=>{  this.isDownloading = false;}, 700)
                            })
                    }else{
                        this.stop()
                        this.timingBar.setValue(0);
                        this.timingBarSmall.setValue(0);

                        if(document.getElementById('play-fill-icon').innerHTML.trim() == `<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"></path>`){
                            this.loadPlay()
                        }else{
                            this.play()
                        }
                    }
                }


                
            }

            getCurrentIndexSong = (songId) =>{
                for(let i = 0; i < this.opera.canzoni.length; i++){
                    if(this.opera.canzoni[i].id == songId){
                       return i;
                   
                    }
                }
            }
         

         
            toggleShuffle = async (albumId) => {

                let stateUpdateMusic = false;
                if(this.isDownloading == false && this.isToggleClicked == false){

                    this.isDownloading = true;
                    this.isToggleClicked  = true;
                    for(let i = 0; i < this.audioArray.length; i ++){
                        this.audioArray[i].pause();
                        this.audioArray[i].currentTime = 0;
                    }
                    if(albumId != this.albumId){
                        
                        this.albumId = albumId;
                        

                        await this.changeNavbar(this.albumId,-2)

                        stateUpdateMusic = true;
                    }else{
                       
                       
    
                        await this.next(true);
                     
                         
                        
                        this.animateExplicitSong(this.explicitSong)
                        this.appIsExplicit = this.animateExplicitSong(this.explicitSongSmall)

                  
                    }
                    if (this.isShuffle == false) {
                        if (this.icons['shuffle-icon']) {
                                
                            Animations.fade(this.icons['shuffle-icon'], this.toggleRepetitionMode(this.icons['shuffle-icon'], this.icons['repeat-icon'], true,true,true));
                        }
                        if (this.icons['shuffle-icon-small']) {
                            Animations.fade(this.icons['shuffle-icon-small'], this.toggleRepetitionMode(this.icons['shuffle-icon-small'], this.icons['repeat-icon-small'], true,true,true));
                            
                        }
                    }
                    if(this.isPlaying == false){
                        this.loadPlay();
                    }else{

                        this.forcePlay();
                    }
                    if(this.isFirstToggleShuffle == true){
                        this.isFirstToggleShuffle = false;
                    }

               
                    
                    if(stateUpdateMusic == true){
                        this.callbacks.updateMusic(-1)

                    }
   


                    setTimeout(()=>{  this.isDownloading = false;this.isToggleClicked = false}, 1000)

                }
            
        
            }

    
            checkAvailableSong = () =>{
                return  this.isDownloading == false && this.isToggleClicked  == false;
            }



            togglePlaySong = async (albumId,songId) =>{
                this.lastAlbumId = this.albumId;
              
                if(this.isDownloading == false && this.isToggleClicked  == false){
                    this.isDownloading = true
                    this.isToggleClicked  = true
                    for(let i = 0; i < this.audioArray.length; i ++){
                        this.audioArray[i].pause();
                        this.audioArray[i].currentTime = 0;   
                    }
                    if(albumId != this.albumId){

                        this.albumId = albumId;
                        //settare currentIndex su songId
                        await this.changeNavbar(this.albumId,songId)
                            .then (()=>{
                                    if(this.isPlaying == false){
                                        this.loadPlay();
                                    }else{
                                        this.audioArray[this.currentIndex].play();
                                        this.isPlaying = true;
                                    }
                         
                            })
                    }else{
                        this.setMusicData(this.opera.prodotto.id,songId)


                        //if( this.opera.canzoni[this.currentIndex].id != songId ){
                            if(this.getCurrentIndexSong(songId) == this.currentIndex){
                                if(this.isPlaying == false){
                                    this.loadPlay();

                                }
                                else{
                                    this.timingBar.pause()
                                    this.timingBarSmall.pause()
                                    this.loadPause()
                                }
                        
                            }else{
                                this.changeNavbarSecond(songId)
                                .then (()=>{
    
    
                                    if(this.isPlaying == false){
                                        this.loadPlay();
                                    }else{
                                        this.audioArray[this.currentIndex].play();
                                        this.isPlaying = true;
                                    } 
                                })
                            }

                    
                    }

                

                    setTimeout(()=>{  this.isDownloading = false;this.isToggleClicked = false;}, 1000)
                }
            }
             clickPlayFill =async () =>{
                const playCallback = (svgElement, progressBarInstance) => {
                    return new Promise((resolve) => {
                        const [newPath1, newPath2] = [
                            'M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5',
                            'm11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393'
                        ];
                
                        const currentPath = svgElement.querySelector('path').getAttribute('d');
                        const newPath = currentPath === newPath1 ? newPath2 : newPath1;
                
                        svgElement.querySelector('path').setAttribute('d', newPath);
                        if (newPath === newPath1) {
                            this.play();
                            progressBarInstance.isPlaying = true;
                            progressBarInstance.startInterval();
                            this.audioArray[this.currentIndex].playbackRate = 1;

                        } else {
                            this.pause();
                            progressBarInstance.isPlaying = false;
                            progressBarInstance.stopInterval();
                        }
                
                        svgElement.setAttribute('width', '16');
                        svgElement.setAttribute('height', '16');
                        svgElement.setAttribute('viewBox', '0 0 16 16');
                
                        resolve();
                    });
                }
                
                const togglePlay = async (svgElement, progressBarInstance) => {
                    await new Promise((resolve) => {
                        Animations.fade(svgElement, async () => {
                            await playCallback(svgElement, progressBarInstance);
                            resolve();
                        });
                    });
                }
                
                if (this.icons['play-fill-icon']) {
                    if (this.isActive) {
                        await togglePlay(this.icons['play-fill-icon'], this.timingBar);
                    }
                }
                if (this.icons['play-fill-icon-small']) {
                    if (this.isActive) {
                        await togglePlay(this.icons['play-fill-icon-small'], this.timingBarSmall);
                    }
                }
        
                if (this.isActive) {
          


                    this.callbacks.updateMusic(-1);
                }
            }

    setAnimations = () => {
      
  
        const iconsMethods = {
            'play-fill-method': async () => {


             this.clickPlayFill()
               
            },
                
          'nav-album-method': () => {
                if (this.isClickable) {
                    const iconsToFade = ['nav-album-icon', 'nav-album-icon-small'];

                    iconsToFade.forEach(iconName => {
                        const icon = this.icons[iconName];
                        if (icon) {
                            Animations.fade(icon, () => {});
                        }
                    });

                    this.callbacks.goToMusic(this.opera.prodotto.id);
                }
            },

            'shuffle-method': () => {

                if (this.icons['shuffle-icon']) {
                    if(this.isActive){
                        Animations.fade(this.icons['shuffle-icon'], this.toggleRepetitionMode(this.icons['shuffle-icon'], this.icons['repeat-icon'], true,false,false));
                    }
                }
                if (this.icons['shuffle-icon-small']) {
                    if(this.isActive){
                        Animations.fade(this.icons['shuffle-icon-small'], this.toggleRepetitionMode(this.icons['shuffle-icon-small'], this.icons['repeat-icon-small'], true,false,false));
                    }
                }
            },
            'skip-backward-method': () => {
                if (this.icons['skip-backward-icon']) {
                    if(this.isActive){
                        Animations.fade(this.icons['skip-backward-icon'], async ()=> await this.previous());
                    }
                }
                if (this.icons['skip-backward-icon-small']) {
                    if(this.isActive){
                        Animations.fade(this.icons['skip-backward-icon-small'], async ()=> await this.previous());
                    }
                }
            },
           
            'skip-forward-method': () => {
                if (this.icons['skip-forward-icon']) {
                    if(this.isActive){
                        Animations.fade(this.icons['skip-forward-icon'],   async ()=> await this.next(false));
                    }
                }
                if (this.icons['skip-forward-icon-small']) {
                    if(this.isActive){
                        Animations.fade(this.icons['skip-forward-icon-small'],async ()=>await this.next(false));
                    }
                }
            },
            'repeat-method': () => {
                if (this.icons['repeat-icon']) {
                    if(this.isActive){
                        Animations.fade(this.icons['repeat-icon'], this.toggleRepetitionMode(this.icons['shuffle-icon'], this.icons['repeat-icon'], false,false,false));
                    }
                }
                if (this.icons['repeat-icon-small']) {
                    if(this.isActive){
                        Animations.fade(this.icons['repeat-icon-small'], this.toggleRepetitionMode(this.icons['shuffle-icon-small'], this.icons['repeat-icon-small'], false,false,false));
                    }
                }
            },
            'volume-off-fill-method': () => {
     
                if (this.icons['volume-off-fill-icon']) {
                    if(this.isActive){
                        this.toggleVolume(0);
                        this.setVolume(0)
                        Animations.fade(this.icons['volume-off-fill-icon'], () => {});
                    }
                }
                if (this.icons['volume-off-fill-icon-small']) {
                    if(this.isActive){
                        this.toggleVolume(0);
                        this.setVolume(0)
                        Animations.fade(this.icons['volume-off-fill-icon-small'], () => {});
                    }
                }
            },
            'volume-up-fill-method': () => {
               
                if (this.icons['volume-up-fill-icon']) {
                    if(this.isActive){
                        this.toggleVolume(100);
                        this.setVolume(1)
                        Animations.fade(this.icons['volume-up-fill-icon'], () => {});
                    }
                }
                if (this.icons['volume-up-fill-icon-small']) {
                    
                    if(this.isActive){
                        this.toggleVolume(100);
                        this.setVolume(1)
                        Animations.fade(this.icons['volume-up-fill-icon-small'], () => {});
                    }
                }
            },
        };
    
        this.iconIds.forEach(id => {
            const methodKey = id.replace(/-icon(-small)?/, '-method');
            if (this.icons[id] && iconsMethods[methodKey]) {
                this.icons[id].addEventListener('click', iconsMethods[methodKey]);
            } else {
            }
        });
    }
    
   




    inactiveNavbar = () =>{
        this.isActive = false;
        this.setCursor(false);
        this.isClickable = false;
        this.progressBar.disabled = true;
        this.progressBarSmall.disabled = true;
        this.navbarCenterElement.style.display='flex';
        this.navbarCenterElementSmall.style.display='flex';
        this.firstLoad('Nessun brano in riproduzione');
        this.firstLoadSmall('Nessun brano in riproduzione');
        
    }

    activeNavbar = (duration) =>{

        if(this.lastAlbumId == -1){
            this.isFirstLoad = false;

            this.audioArray[this.currentIndex].play().then(() => {
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: this.opera.canzoni[this.currentIndex].name,
                        artist: this.opera.prodotto.author,
                        album: this.opera.prodotto.title,
                        artwork: [
                            { src: this.opera.prodotto.image, sizes: '96x96', type: 'image/png' }
                        ]
                    });
            
                    const updatePosition = () => {
                        const playbackRate = this.audioArray[this.currentIndex].playbackRate;
                        
                        if (playbackRate > 0) {
                            navigator.mediaSession.setPositionState({
                                duration: this.audioArray[this.currentIndex].duration,
                                playbackRate: playbackRate,
                                position: this.audioArray[this.currentIndex].currentTime
                            });
                        }
                    };
            
                    this.audioArray[this.currentIndex].addEventListener('timeupdate', updatePosition);
                }
            });
        }else{
            if(this.isFirstLoad == true){
                this.isFirstLoad = false;
                const startPlayback = () => {
                    this.audioArray[this.currentIndex].play()
                        .then(() => {
                            this.doPlay()
                            
                            this.setParams(this.opera.canzoni[this.currentIndex].name,this.opera.prodotto.author,this.opera.canzoni.length == 1 ? "Singolo" :this.opera.prodotto.title,this.opera.prodotto.image)  

                            this.doStop()
                
                            // Rimuove l'event listener dopo la prima interazione
                            document.removeEventListener('click', startPlayback);
                        })
                        .catch((error) => {
                            console.error('Errore durante l\'avvio della riproduzione:', error);
                        });
                };
                document.addEventListener('click', startPlayback, { once: true });
            
            }else{
                if(this.isPlaying){
                    this.setParams(this.opera.canzoni[this.currentIndex].name,this.opera.prodotto.author,this.opera.canzoni.length == 1 ? "Singolo" :this.opera.prodotto.title,this.opera.prodotto.image)  
                }
            }
        }
    
        this.isActive = true;
        this.setCursor(true);
        this.isClickable = true;
        this.progressBar.disabled = false;
        this.progressBarSmall.disabled = false;
        this.navbarCenterElement.style.display='flex';
        this.navbarCenterElementSmall.style.display='flex';
        Animations.fade( this.contentCenter,  () => {
            this.secondLoad(duration);
        });
        Animations.fade( this.contentCenterSmall,  () => {
            this.secondLoadSmall(duration);
        });
    }

    waitingNavbarStart = (imageURL) =>{
        this.isActive = false;
        this.setCursor(false);
        this.isClickable = true;
        this.progressBar.disabled = true;
        this.progressBarSmall.disabled = true;
        this.navbarCenterElement.style.display='flex';
        this.navbarCenterElementSmall.style.display='flex';
        this.waitingLoad(imageURL)
        this.waitingLoadSmall(imageURL)
    }

    waitingNavbarSecond = (imageURL) =>{
        this.isActive = false;
        this.setCursor(false);
        this.isClickable = true;
        this.progressBar.disabled = true;
        this.progressBarSmall.disabled = true;
        this.navbarCenterElement.style.display='flex';
        this.navbarCenterElementSmall.style.display='flex';
        Animations.fade( this.contentCenter,  () => {
            this.waitingLoad(imageURL)
        })
        Animations.fade( this.contentCenterSmall,  () => {
            this.waitingLoadSmall(imageURL)
        })
    }

    waitingNavbar = (imageURL) =>{
        this.isActive = false;
        this.setCursor(false);
        this.isClickable = true;
        this.progressBar.disabled = true;
        this.progressBarSmall.disabled = true;
        this.navbarCenterElement.style.display='flex';
        this.navbarCenterElementSmall.style.display='flex';
        Animations.fade( this.navbarCenterElement,  () => {
            this.waitingLoad(imageURL)
        })
        Animations.fade( this.navbarCenterElementSmall,  () => {
            this.waitingLoadSmall(imageURL)
        })
    }

    changeNavbar = async (albumId,songId) =>{
        this.stopAllWorkers();
        this.resetWorkers();
    
        await this.fetchWorker('getMusicMin',{elementId:albumId},this.updateNavbar)

        
        if(songId == -1){
            this.currentIndex = 0;
        }else if (songId == -2){
            this.currentIndex = Math.floor(Math.random() * this.opera.canzoni.length)
        } else {
            this.setCurrentIndexSong(songId);
        }
        this.setMusicData(this.opera.prodotto.id,this.opera.canzoni[this.currentIndex].id)

        this.waitingNavbar(this.opera.prodotto.image)
        await new Promise(resolve => setTimeout(resolve, 500));

        this.fetchOneAudioWorker( this.opera.canzoni[this.currentIndex].url, this.currentIndex)
            .then(result => {
                if (this.terminated) return;
                this.activeNavbar(result)
                
            })
            .catch(error => {
                console.error('Error during audio processing:', error);
            });

     

        
    }
    

    changeNavbarSecond = async (songId) =>{
        this.waitingNavbarSecond(this.opera.prodotto.image)
        await new Promise(resolve => setTimeout(resolve, 500));
        if(songId == -1){
            this.currentIndex = 0;
        }else{
            this.setCurrentIndexSong(songId);
        }
        this.setMusicData(this.opera.prodotto.id,this.opera.canzoni[this.currentIndex].id)
 
        this.fetchOneAudioWorker( this.opera.canzoni[this.currentIndex].url, this.currentIndex)
            .then(result => {
                if (this.terminated) return;
                this.activeNavbar(result)
                
            })
            .catch(error => {
                console.error('Error during audio processing:', error);
            });
    }


    animateExplicitSong = (element) =>{
        if(this.appIsExplicit != this.opera.canzoni[this.currentIndex].isExplicit){
            Animations.fade(element, () => {
                element.innerHTML = `${this.opera.canzoni[this.currentIndex].isExplicit ? Constants.EXPLICIT('span',11,0,2) : ""}`; 
            });
            return !this.appIsExplicit;
        }
        return this.appIsExplicit;
    }


    waitingLoad = (imageURL) =>{
        this.timingBar.setDisabled( true)
        this.timingBar.setDuration( 100  )
        this.timingBar.setValue(0);
        this.progressBar.disabled = true;
        this.navSongSvg.style.display ='none';
        this.albumIcon.style.cursor='pointer';
        this.albumIcon.style.backgroundImage=`url('${imageURL}')`;
        this.songInfo.innerHTML  = Constants.LOADING_SECOND('animated-circle',30,0,0,10);
        this.animateExplicitSong(this.explicitSong)
        this.songName.innerHTML  = "";
        const circle = document.querySelector('.animated-circle circle');
        circle.style.opacity = 1;
    }


    waitingLoadSmall = (imageURL) =>{
        this.timingBarSmall.setDisabled(true)
        this.timingBarSmall.setDuration(100);
        this.timingBarSmall.setValue(0);
        this.progressBarSmall.disabled = true;
        this.navSongSvgSmall.style.display ='none';
        this.albumIconSmall.style.cursor='pointer';
        this.albumIconSmall.style.backgroundImage=`url('${imageURL}')`;
        this.songInfoSmall.innerHTML  = Constants.LOADING_SECOND('animated-circle-second',30,0,0,10);
        this.appIsExplicit = this.animateExplicitSong(this.explicitSongSmall)
        this.songNameSmall.innerHTML  = "";
        const circleSmall = document.querySelector('.animated-circle-second circle');
        circleSmall.style.opacity = 1;
    }

    firstLoad = (text) =>{
        this.timingBar.setDisabled( true)
        this.timingBar.setDuration( 100  )
        this.timingBar.setValue(0);
        this.progressBar.disabled = true;
        this.navSongSvg.style.display ='block';
        this.albumIcon.style.backgroundColor='var(--bg-btn-music)';
        this.albumIcon.style.cursor='default';
        this.songInfo.innerHTML  = text;
        this.animateExplicitSong(this.explicitSong)
        this.songName.innerHTML  = "";
    }

    firstLoadSmall = (text) =>{
        this.timingBarSmall.setDisabled(true)
        this.timingBarSmall.setDuration(100);
        this.timingBarSmall.setValue(0);
        this.progressBarSmall.disabled = true;
        this.navSongSvgSmall.style.display ='block';
        this.albumIconSmall.style.backgroundColor='var(--bg-btn-music)';
        this.albumIconSmall.style.cursor='default';
        this.songInfoSmall.innerHTML  = text;
        this.appIsExplicit = this.animateExplicitSong(this.explicitSongSmall)
        this.songNameSmall.innerHTML  = "";
    }

    secondLoad = (duration) =>{
        this.timingBar.setDisabled( false)
        this.progressBar.disabled = false;
        this.timingBar.setDuration( duration  )
        this.timingBar.setValue(0);
        this.navSongSvg.style.display ='none';
        this.albumIcon.style.backgroundColor='transparent';
        this.albumIcon.style.backgroundImage = `url(${this.opera.prodotto.image})`;
        this.animateExplicitSong(this.explicitSong)
        this.songName.innerHTML  = this.opera.canzoni[this.currentIndex].name;
        this.songInfo.innerHTML  = `${this.opera.prodotto.author} - ${this.opera.canzoni[this.currentIndex].collabs != "" ? `${this.opera.canzoni[this.currentIndex].collabs }` : "Single"}`;

    }
    


    secondLoadSmall = (duration) =>{
        this.albumIcon.style.cursor='pointer';
        this.albumIconSmall.style.cursor='pointer';
        this.albumIconSmall.style.backgroundColor='transparent';
        this.navSongSvgSmall.style.display ='none';
        this.timingBarSmall.setDisabled(false)
        this.timingBarSmall.setValue(0);
        this.progressBarSmall.disabled = false;
        this.timingBarSmall.setDuration(duration);
        this.albumIconSmall.style.backgroundImage = `url(${this.opera.prodotto.image})`;
        this.appIsExplicit = this.animateExplicitSong(this.explicitSongSmall)
        this.songNameSmall.innerHTML  = this.opera.canzoni[this.currentIndex].name;
        this.songInfoSmall.innerHTML  = `${this.opera.prodotto.author} - ${this.opera.canzoni[this.currentIndex].collabs != "" ? `${this.opera.canzoni[this.currentIndex].collabs }` : "Single"}`;
    }


    




    fetchData = () =>{

  
   

        fetch('config/session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `music_id=${encodeURIComponent(this.opera.canzoni[this.currentIndex].id)}&album_id=${encodeURIComponent(this.opera.prodotto.id)}`,
        })
        .catch(error => {
       
        });  
    }


    innerHTML = () =>
        `
            <div class="outer-nav">
                <div class="navbar" >
                    <div class="nav-border">
                        <div class="nav-item left">
                            <svg xmlns="http://www.w3.org/2000/svg"  id="shuffle-icon" width="16" height="16" fill="currentcolor" class="bi bi-shuffle icon " viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="skip-backward-icon" width="16" height="16" fill="currentcolor" class="bi bi-skip-backward icon " viewBox="0 0 16 16">
                            <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m7 1.133L1.696 8 7.5 11.367zm7.5 0L9.196 8 15 11.367z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="play-fill-icon" width="16" height="16" fill="currentcolor" class="bi bi-play-fill icon " viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="skip-forward-icon" width="16" height="16" fill="currentcolor" class="bi bi-skip-forward icon " viewBox="0 0 16 16">
                            <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5M1 4.633v6.734L6.804 8zm7.5 0v6.734L14.304 8z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="repeat-icon" width="16" height="16" fill="currentcolor" class="bi bi-repeat icon" viewBox="0 0 16 16">
                            <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                            </svg>
                        </div>
                        <div class="outer-navbar-center-elem" id="navbar-center-elem">

                            <div class="nav-item center" >
                                <div class="center-square" id="nav-album-icon" >
                                    <div id="navbar-explicit-song" class="nav-explicit-svg"></div>
                                    <div id="nav-song-svg" class="nav-song-svg"></div>
                                </div>
                                <div class="center-div" id="content-center">
                                    <div class="nav-song-name" id="song-name"></div>
                                    <div class="nav-song-info"  id="song-info"></div>
                                    <div class="song-panel">
                                        <input type="range" id="timing-bar" value="0" min="0" max="100" readonly="" class="timing-bar">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nav-item right">
                            <svg xmlns="http://www.w3.org/2000/svg" id="volume-off-fill-icon"  width="16" height="16" fill="currentcolor" class="bi bi-volume-off-fill icon " viewBox="0 0 16 16">
                            <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                            </svg>
                            <input type="range" id="progress-bar" class="progress-bar" value="0" min="0" max="100" readonly="" />
                            <svg xmlns="http://www.w3.org/2000/svg" id="volume-up-fill-icon"  width="16" height="16" fill="currentcolor" class="bi bi-volume-up-fill icon" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                            <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="navbar-small" >
                                            <div class="outer-navbar-center-elem-small" id="navbar-center-elem-small">

                    <div class="navbar-row-small">
                            <div class="inner-navbar-row-small " >
                                <div class="image-album-small" id="nav-album-icon-small" >
                                    <span id="navbar-explicit-song-small" class="nav-explicit-svg"></span>
                                    <div id="nav-song-svg-small" class="nav-song-svg"></div>
                                </div>
                                <div class="center-div" id="content-center-small">
                                    <div class="nav-song-name" id="song-name-small"></div>
                                    <div class="nav-song-info"  id="song-info-small"> </div>
                                    <div class="song-panel">
                                        <input type="range" id="timing-bar-small" value="0" min="0" max="100" readonly="" class="timing-bar">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-row-small-second">
                        <div class="navbar-col-small">
                            <svg xmlns="http://www.w3.org/2000/svg"  id="shuffle-icon-small" width="16" height="16" fill="currentcolor" class="bi bi-shuffle icon " viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="skip-backward-icon-small" width="16" height="16" fill="currentcolor" class="bi bi-skip-backward icon " viewBox="0 0 16 16">
                            <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m7 1.133L1.696 8 7.5 11.367zm7.5 0L9.196 8 15 11.367z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="play-fill-icon-small" width="16" height="16" fill="currentcolor" class="bi bi-play-fill icon " viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="skip-forward-icon-small" width="16" height="16" fill="currentcolor" class="bi bi-skip-forward icon " viewBox="0 0 16 16">
                            <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5M1 4.633v6.734L6.804 8zm7.5 0v6.734L14.304 8z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="repeat-icon-small" width="16" height="16" fill="currentcolor" class="bi bi-repeat icon" viewBox="0 0 16 16">
                            <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                            </svg>
                        </div>
                        <div class="navbar-col-small">
                            <svg xmlns="http://www.w3.org/2000/svg" id="volume-off-fill-icon-small"  width="16" height="16" fill="currentcolor" class="bi bi-volume-off-fill icon " viewBox="0 0 16 16">
                            <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                            </svg>
                            <input type="range" id="progress-bar-small" class="progress-bar" value="0" min="0" max="100" readonly="" />
                            <svg xmlns="http://www.w3.org/2000/svg" id="volume-up-fill-icon-small"  width="16" height="16" fill="currentcolor" class="bi bi-volume-up-fill icon" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                            <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-footer">
                <div class="inner-nav-footer" >
                    <p class="p-nav-footer" id="dynamic-bar">Accedi per caricare brani</p>
                </div>
            </div>
        `
        
  
    



    
}

