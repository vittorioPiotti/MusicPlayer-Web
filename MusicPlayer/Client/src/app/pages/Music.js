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

import Animations from '../utilities/Animations.js';
import Constants from '../utilities/Constants.js';
import WorkerManager from '../utilities/WorkerManager.js';

export default class Music extends WorkerManager{
    constructor(id, callbacks) {
        super(); 
        this.opera = [];
        this.id = id;
        this.callbacks = callbacks;
        this.totalTimeSpan = null;
        this.elementId = -1;//oppure deve essere null - da verificare
        this.isAllDownloaded = false;
        this.isToggleClickedSong = false;
        this.isClickedSong = -1;

    }


   




    init = async (elementId) => {
      
        this.resetWorkers();
        this.isAllDownloaded = false;
        this.elementId = elementId;
        await this.fetchWorker('getMusic',{elementId:this.elementId},this.updateMusicData)        
        this.updateMusic(-1);
        this.isAllDownloaded = false;//forse?



            
        
   
   
    }

    updateMusic = (forceInx)=>{
       

        if((this.elementId == this.callbacks.getAlbumId() && this.elementId != -1) || (this.elementId == -1 && this.callbacks.getAlbumId() != -1) ){
        
         
            let inx = -1
            for(let i = 0; i < this.opera.canzoni.length; i ++){
                if(this.opera.canzoni[i].id == this.callbacks.getSingleId()){
                    inx = i;
                    break;
                }
            }
            if(forceInx != -1){
                inx = forceInx
            }
            if(inx != -1){
             

                if( this.isClickedSong != inx ){
                    this.isClickedSong = inx;
                    this.isToggleClickedSong  = false;
                }else{
                    this.isToggleClickedSong = !this.isToggleClickedSong
                }


                const containerCanzoni = document.getElementById('container-canzoni');
                const canzoniElements = containerCanzoni.getElementsByClassName('container-canzone');
                const numberSongElement = canzoniElements[inx].querySelector('.number-song');
               
                
                const containerCanzoniSmall = document.getElementById('container-canzoni-small');
                const canzoniSmall = containerCanzoniSmall.querySelectorAll('.container-canzone-small');
                const numberSongElementSmall = canzoniSmall[inx].querySelector('.number-song-small');
             
                Array.from(canzoniElements).forEach((canzone, j) => {
                    const _numberSongElement = canzone.querySelector('.number-song');
                    _numberSongElement.innerHTML = j + 1;
                    this.opera.canzoni[j].isPlaying = false
                })
                Array.from(canzoniSmall).forEach((canzone, j) => {
                    const _numberSongElementSmall = canzone.querySelector('.number-song-small');
                    _numberSongElementSmall.innerHTML = j + 1;
                })
                
                if( this.callbacks.getIsPlaying() == true ){
                    Animations.fade( numberSongElement, () => {
                        numberSongElement.innerHTML = Constants.MUSIC;
                    })
                    Animations.fade( numberSongElementSmall, () => {
                        numberSongElementSmall.innerHTML = Constants.MUSIC;
                    })
                    this.opera.canzoni[inx].isPlaying = true;
                }else{
                    Animations.fade( numberSongElement, () => {
                        numberSongElement.innerHTML = Constants.POINT;
                    })
                    Animations.fade( numberSongElementSmall, () => {
                        numberSongElementSmall.innerHTML = Constants.POINT;
                    })
        
                    this.opera.canzoni[inx].isPlaying = false;
                }
               
                
            }


        
        }




            
    }

    updateMusicData = (data) =>{
        this.opera = this.setOpera(data)
        this.initializer();
    }


    callbackFetchAudioWorker = (data) =>{

        const totalMinutes = Math.floor(data / 60);

        Animations.fade(this.totalTimeSpan, () => {
            this.totalTimeSpan.innerHTML = `${totalMinutes} minutes`;
        });

        

        setTimeout(()=>{  this.isAllDownloaded = true;}, 1000)


    }





    onClickSong = async (numberSongElement, canzoniElements,i,state) => {

        //se diverso da  attuale
        this.startState  = !this.startState 
        this.clickCounter = -1



        const appIsPlaying = this.opera.canzoni[i].isPlaying;
        Array.from(canzoniElements).forEach((canzone, j) => {
            const numberSongElement = canzone.querySelector('.number-song');
            numberSongElement.innerHTML = j + 1;
            this.opera.canzoni[j].isPlaying = false
        })
       
    
        if(appIsPlaying == true){
            Animations.fadeCustomTimer(150, numberSongElement, () => {
                numberSongElement.innerHTML = Constants.PLAY;
            });
            this.opera.canzoni[i].isPlaying = false

        }else{
            Animations.fadeCustomTimer(150, numberSongElement, () => {
                numberSongElement.innerHTML = state == true ? Constants.MUSIC :  Constants.PAUSE;
            });
            this.opera.canzoni[i].isPlaying = true
        }
        
 
    };


    onClickSongSmall = async (canzoniSmall,canzone,i) =>{


      
        
       await this.callbacks.togglePlaySong(this.opera.prodotto.id,this.opera.canzoni[i].id)

        const numberSongElement = canzone.querySelector('.number-song-small');
        
        const appIsPlaying = this.opera.canzoni.map(canzone => canzone.isPlaying);
    


        if( this.isClickedSong != i ){
            this.isToggleClickedSong  = false;

            Array.from(canzoniSmall).forEach((canzoneSmall, j) => {
                if(j != i ){
                    canzoneSmall.querySelector('.number-song-small').innerHTML = j + 1;

          
                }
               
            })

            
            this.isClickedSong = i;
            if (appIsPlaying[i] == true) {
            
                Animations.fade(numberSongElement, () => {
                    numberSongElement.innerHTML = `${i + 1}`;
                })
                appIsPlaying[i] = false
    
    
            }else{
    
                for(let j = 0; j < appIsPlaying.length; j ++){
    
                  
                    if(appIsPlaying[j] == true){
                        appIsPlaying[j] = false;
                        const previousElement = canzoniSmall[j];
                        const previousNumberSongElement = previousElement.querySelector('.number-song-small');
                        Animations.fade(previousNumberSongElement, () => {
                                previousNumberSongElement.innerHTML = `${j + 1}`;
                        })
                    }
                }
                Animations.fade(numberSongElement, () => {
                   
                    numberSongElement.innerHTML = Constants.MUSIC;
                })
            }
        }else{

            if (this.isToggleClickedSong  == true){
                Animations.fade(numberSongElement, () => {
                    numberSongElement.innerHTML = Constants.MUSIC;
                })
                this.isToggleClickedSong  = false;
            }else{
                this.isToggleClickedSong  = true;
                Animations.fade(numberSongElement, () => {
                    numberSongElement.innerHTML = Constants.POINT;
                })
            }
            

            
        }


        if (i % 2 === 0) {
            canzone.classList.remove('bg-active');
        }
        canzone.classList.add('song-hover');
        canzone.style.transition = 'opacity 0.5s, transform 0.3s';
        canzone.style.transform = 'scale(1.05)';
        canzone.style.opacity = '0.5';

        setTimeout(() => {
            canzone.style.transition = 'opacity 0.3s, transform 0.3s';
            canzone.style.transform = 'scale(1)';
            canzone.style.opacity = '1';

            setTimeout(() => {
                if (i % 2 === 0) {
                    canzone.classList.add('bg-active');
                }
                canzone.classList.remove('song-hover');
            }, 300); 
        }, 300); 
        
    
    }


    setListeners = async() =>{
        const onMouseOverSong = async (canzone,i,numberSongElement) =>{
            if (this.opera.canzoni[i].isHover) return;
            this.opera.canzoni[i].isHover = true
            if (i % 2 === 0) {
                canzone.classList.remove('bg-active');
            }
            canzone.classList.add('song-hover');
            if (this.opera.canzoni[i].isPlaying == true) {
                Animations.fadeCustomTimer(150, numberSongElement, () => {
                    numberSongElement.innerHTML = Constants.PAUSE;
                });
            } else {
                Animations.fadeCustomTimer(150, numberSongElement, () => {
                    numberSongElement.innerHTML = Constants.PLAY;
                });
            }
        }
        const onMouseLeaveSong =  (canzone,i,numberSongElement) =>{
            this.opera.canzoni[i].isHover = false
            if (i % 2 === 0) {
                canzone.classList.add('bg-active');
            }   
            canzone.classList.remove('song-hover');


            if(this.isClickedSong == i && this.opera.canzoni[i].isPlaying == false){
                Animations.fadeCustomTimer(150, numberSongElement, () => {
                    numberSongElement.innerHTML = Constants.POINT;
                });
            }else{
                if (this.opera.canzoni[i].isPlaying == true) {
                    Animations.fadeCustomTimer(150, numberSongElement, () => {
                        numberSongElement.innerHTML = Constants.MUSIC;
                    });
                } else {
                    Animations.fadeCustomTimer(150, numberSongElement, () => {
                        numberSongElement.innerHTML = `${i + 1}`;
                    });
                }
            }
     
        }
        
        const containerCanzoni = document.getElementById('container-canzoni');
        const canzoniElements = containerCanzoni.getElementsByClassName('container-canzone');
        const containerCanzoniSmall = document.getElementById('container-canzoni-small');
        const canzoniSmall = containerCanzoniSmall.querySelectorAll('.container-canzone-small');
        Array.from(canzoniElements).forEach((canzone, i) => {
            const numberSongElement = canzone.querySelector('.number-song');
            canzone.addEventListener('mouseover', () => onMouseOverSong(canzone, i,numberSongElement));
            canzone.addEventListener('mouseleave', () => onMouseLeaveSong(canzone, i,numberSongElement));
            numberSongElement.addEventListener('click',async ()=> {
                if(this.isAllDownloaded == true){
                    if(this.callbacks.checkAvailableSong() == true){
                        const canzoneSmall = canzoniSmall[i];
                        await this.onClickSongSmall(canzoniSmall,canzoneSmall,i);

                        this.onClickSong(numberSongElement,canzoniElements, i,false)
                    }
                }
            });
        })
    }



    initializeSmallContainerListener() {
        const containerCanzoniSmall = document.getElementById('container-canzoni-small');
        const canzoniSmall = containerCanzoniSmall.querySelectorAll('.container-canzone-small');
        const containerCanzoni = document.getElementById('container-canzoni');
        const canzoniElements = containerCanzoni.getElementsByClassName('container-canzone');

        canzoniSmall.forEach((canzoneSmall, i) => {
            canzoneSmall.addEventListener('click', async() => {
                if(this.callbacks.checkAvailableSong() == true){
                    if(this.isAllDownloaded == true){
                        const canzone = canzoniElements[i];
                        const numberSongElement = canzone.querySelector('.number-song');
                        await this.onClickSongSmall(canzoniSmall,canzoneSmall,i);
                        this.onClickSong(numberSongElement,canzoniElements, i,true)
                    }
                }
            });
        });
    }

    

    initializer = () => {
        document.getElementById(this.id).innerHTML = this.innerHTML();
    
        this.totalTimeSpan = document.getElementById('total-time-span');
    
        // Funzione per inizializzare i container
        const initializeContainer = (containerId, rightInfoClass, animatedCircleClass) => {
            const container = document.getElementById(containerId);
            const rightInfoSongs = container.querySelectorAll(`.${rightInfoClass}`);
    
            rightInfoSongs.forEach((element, index) => {
                const circle = document.querySelector(`.${animatedCircleClass}-${index} circle`);
                if (circle) circle.style.opacity = 1;
                element.classList.add('active-song-charged');
            });
    
            Animations.fade(this.totalTimeSpan, () => {
                this.totalTimeSpan.innerHTML = Constants.LOADING_THIRD('animated-circle-total-time', 15, 0, 0, 0, 10, 0, 10);
                const circle = document.querySelector('.animated-circle-total-time circle');
                if (circle) circle.style.opacity = 1;
            });
    
            return rightInfoSongs;
        };
    
        const rightInfoSongsLarge = initializeContainer('container-canzoni', 'right-info-song', 'animated-circle-element');
        const rightInfoSongsSmall = initializeContainer('container-canzoni-small', 'right-info-song-small', 'animated-circle-element-small');
    
        const audioUrls = this.opera.canzoni.map((canzone) => canzone.url);
    
        // Limita il numero di fetch paralleli
        const maxParallelFetches = 5;
        let currentFetches = 0;
        let index = 0;
    
        const fetchNext = () => {
            if (index >= audioUrls.length || this.terminated) return;
    
            const url = audioUrls[index];
            const currentIndex = index;
            index++;
            currentFetches++;
    
            this.fetchAudioWorker(url, currentIndex, this.callbackFetchAudioWorker)
                .then(result => {
                    currentFetches--;
                    if (this.terminated) return;
    
                    const elementLarge = rightInfoSongsLarge[result.index];
                    const elementSmall = rightInfoSongsSmall[result.index];
                    const minutes = Math.floor(result.duration / 60);
                    const seconds = Math.floor(result.duration % 60);
                    const durationText = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    
                    Animations.fade(elementLarge, () => {
                        elementLarge.innerHTML = durationText;
                    });
    
                    Animations.fade(elementSmall, () => {
                        elementSmall.innerHTML = durationText;
                    });
    
                    fetchNext();
                })
                .catch(error => {
                    currentFetches--;
                    console.error('Error during audio processing:', error);
                    fetchNext();
                });
        };
    
        // Avvia i fetch limitati al numero massimo di fetch paralleli
        for (let i = 0; i < maxParallelFetches; i++) {
            fetchNext();
        }
    
        this.setAnimations();
        this.setListeners();
        this.initializeSmallContainerListener(); 
    };
    
  































    // Restituisce i minuti della canzone all'indice `inx`
    getMinutiSessantesimi = (value) => {
        return Math.trunc(value / 60);
    }

    // Restituisce i secondi della canzone all'indice `inx`
    getSecondiSessantesimi = (value) => {
        return Math.trunc(value % 60);
    }

    // Restituisce il totale dei minuti di tutte le canzoni
    getMinutes = (totalSeconds) => {
        return Math.trunc(totalSeconds / 60);
    } 





    


    setAnimations = () =>{

                 
        const tooltipBottom = document.createElement('div');
        tooltipBottom.className = 'tooltip-bottom';
        tooltipBottom.innerText = 'Link copiato';
        document.getElementsByClassName('button-play-opera-share')[0].appendChild(tooltipBottom);

        const tooltipRight = document.createElement('div');
        tooltipRight.className = 'tooltip-right-second';
        tooltipRight.innerText = 'Link copiato';
        document.getElementsByClassName('btn-footer-info-preview-second')[0].appendChild(tooltipRight);











        
        const authorOpera = document.getElementById('author-opera');
        authorOpera.addEventListener('click',() =>{
            Animations.fade(authorOpera, ()=>{
           
                this.callbacks.goToArtist(this.opera.prodotto.artistId)
            })
        });

        const authorOperaSmall = document.getElementById('author-opera-small');
        authorOperaSmall.addEventListener('click',() =>{
            Animations.fade(authorOperaSmall, ()=>{

                this.callbacks.goToArtist(this.opera.prodotto.artistId)
            })
        });












        const btnShareMusic =  document.getElementById('btn-share-music');
        btnShareMusic.addEventListener('click',() =>{

            new ClipboardJS(`#btn-share-music`);
            Animations.fade(btnShareMusic, ()=>{})
            Animations.fadeOut(3000,tooltipRight,()=>{})
            
        });

        const btnShuffleMusic =  document.getElementById('btn-shuffle-music');
        btnShuffleMusic.addEventListener('click', async () =>{
            if(this.isAllDownloaded == true){
                this.callbacks.shuffle(this.elementId,btnShuffleMusic)

            }
            
        });

        const btnPlayMusic =  document.getElementById('btn-play-music');
        btnPlayMusic.addEventListener('click',async () =>{
            if(this.isAllDownloaded == true){
                await this.callbacks.togglePlay(this.elementId,btnPlayMusic)
                this.updateMusic(0)
            }
            
        });


    

        
        const btnShareMusicSmall =  document.getElementById('btn-share-music-small');
        btnShareMusicSmall.addEventListener('click',() =>{

            new ClipboardJS(`#btn-share-music-small`);
            Animations.fade(btnShareMusicSmall, ()=>{})
            Animations.fadeOut(3000,tooltipBottom,()=>{})

            
        });

        const btnShuffleMusicSmall =  document.getElementById('btn-shuffle-music-small');
        btnShuffleMusicSmall.addEventListener('click',async () =>{
            if(this.isAllDownloaded == true){
                await this.callbacks.shuffle(this.elementId,btnShuffleMusicSmall)
            }
            
        });

        const btnPlayMusicSmall =  document.getElementById('btn-play-music-small');
        btnPlayMusicSmall.addEventListener('click',async () =>{
            if(this.isAllDownloaded == true){
                await this.callbacks.togglePlay(this.elementId,btnPlayMusicSmall)
            }
            
        });
    }

    setOpera = (obj) =>{
        console.log("set opwra")
        console.log(obj)
        const musics = [];
        obj.canzoni.forEach(item => {
            musics.push({
                name: item.Titolo,
                collabs:item.Featurings, 
                time: 0,
                isExplicit: item.IsExplicit == 0 ? false : true,
                isHover: false,
                isPlaying: false,
                url: item.Audio,
                id: parseInt(item.IdCanzone)
            })
        })
        return {
            prodotto:
            {
                name: obj.pubblicazione.Titolo,
                author: obj.pubblicazione.ArtistName,
                genereMusicale: obj.pubblicazione.GenereMusicale,
                description: "Descrizione",  // Placeholder description
                image: `url('${obj.pubblicazione.Immagine}')`,
                dataProduzione: obj.pubblicazione.DataPubblicazione,
                casaDiscografica: obj.pubblicazione.CasaDiscografica,
                annoDiProduzione: new Date(obj.pubblicazione.DataPubblicazione).getFullYear().toString(),
                copyright: "℗ 2022 NoCopyrightSounds",  // Placeholder copyright info
                isExplicit: obj.pubblicazione.IsExplicit == 1,
                id: parseInt(obj.pubblicazione.IdPubblicazione),
                artistId: parseInt(obj.pubblicazione.IdArtista)
            },
            canzoni: musics
        }
    }



innerHTML = () => `

            <div class="main-container">
                <div class="main-content">
                    <div class="container-preview">
                        <div class="container-image-preview" style="background-image:${this.opera.prodotto.image};">
                        </div>
                        <div class="info-preview">
                            <div class="main-info-preview">
                                <div class="inner-main-info-preview">
                                    <p class="text-desc-opera-titolo">${this.opera.prodotto.name}  </p>
                                    <p class="text-desc-opera-autore" ><span id="author-opera">${this.opera.prodotto.author} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-up-right icon-change-page" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg></span></p>
                                    <p class="text-desc-opera-genere" >
                                        ${this.opera.prodotto.isExplicit ? `${Constants.EXPLICIT('span',16,0,3)}<span class="dot-spacer"></span> ` : ""}
                                        ${this.opera.prodotto.genereMusicale != "" ? `${this.opera.prodotto.genereMusicale}<span class="dot-spacer"></span>` : ""}
                                        ${this.opera.prodotto.annoDiProduzione != "" ? `${this.opera.prodotto.annoDiProduzione}<span class="dot-spacer"></span>` : ""}
                                        ${this.opera.prodotto.casaDiscografica != "" ? `${this.opera.prodotto.casaDiscografica}` : ""}
                                    </p>
                                </div> 
                            </div>
                        <div class="footer-info-preview">
                            <div class="inner-footer-info-preview">
                                <div class="container-btn-footer-info-preview">
                                    <div id="btn-play-music" class="btn-footer-info-preview-play">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="var(--primary-color)" class="bi bi-play-fill " viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                        </svg>
                                        Play         
                                    </div>
                                <div id="btn-shuffle-music" class="btn-footer-info-preview-shuffle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="var(--primary-color)" class="bi bi-shuffle svg-music" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                                    </svg>
                                    Suffle
                                </div>
                            </div>
                            <div class="container-btn-footer-info-preview-second">
                                <div id="btn-share-music" class="btn-footer-info-preview-second" data-clipboard-text="${Constants.URL('music',`&idMusic=${this.elementId}`)}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info-preview-small">
                    <p class="text-desc-opera-titolo-small">${this.opera.prodotto.name}  </p>
                    <p class="text-desc-opera-autore-small" ><span id="author-opera-small">${this.opera.prodotto.author}<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-box-arrow-up-right icon-change-page-small" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg></span></p>
                    <p class="text-desc-opera-genere-small" >
                        ${this.opera.prodotto.isExplicit ? `${Constants.EXPLICIT('span',16,0,3)}<span class="dot-spacer"></span> ` : ""}
                        ${this.opera.prodotto.genereMusicale != "" ? `${this.opera.prodotto.genereMusicale}<span class="dot-spacer"></span>` : ""}
                        ${this.opera.prodotto.annoDiProduzione != "" ? `${this.opera.prodotto.annoDiProduzione}<span class="dot-spacer"></span>` : ""}
                        ${this.opera.prodotto.casaDiscografica != "" ? `${this.opera.prodotto.casaDiscografica}` : ""}
                    </p>
                <div class="container-buttons-play-opera">
                    <div id="btn-play-music-small" class="button-play-opera">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="var(--primary-color)" class="bi bi-play-fill " viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                        Play     
                    </div>
                    <div id="btn-shuffle-music-small" class="button-play-opera">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="var(--primary-color)" class="bi bi-shuffle svg-music" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                        </svg>
                        Suffle
                    </div>
                    <div id="btn-share-music-small" class="button-play-opera-share"  data-clipboard-text="${Constants.URL('music',`&idMusic=${this.elementId}`)}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="songs-container">
            <div class="inner-songs-container" id="container-canzoni">
                ${
                this.opera.canzoni.map((canzone, i) => `
                    <div class="container-canzone container-song ${i % 2 === 0 ? 'bg-active' : ''}">
                            <div class="left-info-song">
                                <span class="number-song">
                                ${i + 1}
                                </span>
                                <span class="name-song">
                                ${canzone.name}                                          
                                </span>
                                ${canzone.isExplicit ? Constants.EXPLICIT('span',14,0,3) : ""}
                            </div>
                            <div class="right-info-song">
                               ${Constants.LOADING_THIRD(`animated-circle-element-${i}`, 20, 0, 0, 0, 10, 0, 7)}
                            </div>
                        </div>
                    `).join('') 
                }
            </div>
        </div>


        <div class="songs-container-small">
            <div class="inner-songs-container-small" id="container-canzoni-small">
                ${
                this.opera.canzoni.map((canzone, i) => `
                    <div class="container-canzone-small container-song-small ${i % 2 === 0 ? 'bg-active' : ''}">
                            <div class="left-info-song-small">
                                <span class="number-song-small">
                                ${i + 1}
                                </span>
                                <span class="name-song-small">
                                ${canzone.name}                                          
                                </span>
                                ${canzone.isExplicit ? Constants.EXPLICIT('span',14,0,3) : ""}
                            </div>
                            <div class="right-info-song-small">
                            ${Constants.LOADING_THIRD(`animated-circle-element-small-${i}`, 20, 0, 0, 0, 10, 0, 7)}
                            </div>
                        </div>
                    `).join('') 
                }
            </div>
        </div>




                    <div class="container-footer-music">

                        <div class="footer-music">


                            <div class="footer-music-elem">${
                                (() => {
                                    // Array dei nomi dei mesi
                                    const mesi = [
                                        'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
                                        'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
                                    ];
                                    
                                    // Creazione dell'oggetto Date
                                    const date = new Date(this.opera.prodotto.dataProduzione);
                                    
                                    // Estrazione del giorno, mese e anno
                                    const giorno = date.getDate();
                                    const mese = date.getMonth(); // Mese 0-based
                                    const anno = date.getFullYear();
                                    
                                    // Formattazione della data
                                    return `${giorno} ${mesi[mese]} ${anno}`;
                                })()
                            }</div>
                            <div class="footer-music-elem" >
                            <span>${this.opera.canzoni.length} bran${this.opera.canzoni.length == 1 ? "o" : "i" }&nbsp</span>
                            <span id="total-time-span"></span> 
                            
                            </div>
                            <div class="footer-music-elem">${this.opera.prodotto.copyright}</div>




                        </div>

                        

                    </div>


                </div>
            </div>

        `











}