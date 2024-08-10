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

import MySwiper from '../design/MySwiper.js';
import Animations from '../utilities/Animations.js';
import Constants from '../utilities/Constants.js';
import WorkerManager from '../utilities/WorkerManager.js';


export default class Artist  extends WorkerManager{
    constructor(id, callbacks) {
        super();
        this.artist = [];
        this.albums = [];
        this.singoli = [];
        this.id = id;
        this.callbacks = callbacks;
        this.albumSwiper = null;
        this.singoliSwiper = null;
        this.MAX_LENGTH_INFO_ARTIST = 170;
        this.isLoaded = false;

    }





    

 








    init = async (elementId,isLoaded) =>{


        
        this.resetWorkers();

        this.isLoaded = isLoaded;
        this.elementId = elementId;

        console.log(this.elementId)
        await this.fetchWorker('getAllArtistData',{elementId:this.elementId},this.updateArtistData)


        console.log(this.albums)
        console.log(this.singoli)
 
           

    }



    updateArtistData =(data) =>{
       
        this.artist = this.setArtist(data.artista);
        this.albums = this.setData(data.album);
        this.singoli = this.setData(data.single);
        this.initializer()
    }


    updateAlbums = (data) =>{
        this.albums = this.setDataSecond(data);
    }

    updateSingles = (data) =>{
        this.singoli = this.setDataSecond(data);
    }




    mapIds = (objects) => {
        return objects
            .map(obj => obj.id);
    }
    
    
    
    
    
    playRandomMusic = () =>{


        const checkAlbumsLenght = this.albums.length != 0;
        const checkSingoliLenght = this.singoli.length != 0;
        
        if (checkAlbumsLenght && checkSingoliLenght) {

            if(Math.round(Math.random()) == 0){
                const index = Math.floor(Math.random() * this.albums.length);
                this.callbacks.onlyShuffle(this.albums[index].id)
            }else{
                const index = Math.floor(Math.random() * this.singoli.length);
                this.callbacks.onlyPlay(this.singoli[index].id)
               
            }

  
        } else if (checkAlbumsLenght) {


            const index = Math.floor(Math.random() * this.albums.length);
            this.callbacks.onlyShuffle(this.albums[index].id)

        } else if (checkSingoliLenght) {
            const index = Math.floor(Math.random() * this.singoli.length);
            this.callbacks.onlyPlay(this.singoli[index].id)
        } 
        

     
        


    }
    
     initializer  = () =>{
    
        document.getElementById(this.id).innerHTML = this.innerHTML();
    
        this.albumSwiper = new MySwiper('container-album-artist-slider','album-artist-slider',this.albums,false,this.callbacksManager().swiperAlbum,'album',true)
        this.singoliSwiper = new MySwiper('container-singoli-artist-slider','singoli-artist-slider',this.singoli,false,this.callbacksManager().swiperSingolo,'single',true)
           
        
        
        
        const playArtistLeft =  document.getElementById('svg-play-clickable-left');
        playArtistLeft.addEventListener('click',() =>{
                Animations.fade(playArtistLeft, ()=>{
                    this.playRandomMusic();

                })
            
            });
       
            const playArtistRight =  document.getElementById('svg-play-clickable-right');
                playArtistRight.addEventListener('click',() =>{
                    Animations.fade(playArtistRight,()=>{
                        this.playRandomMusic();
                    })
    
            });
    
    
    
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-right';
            tooltip.innerText = 'Link copiato';
            document.getElementsByClassName('share-artist-btn-container')[0].appendChild(tooltip);
    
    
            const shareArtistBtn =  document.getElementById('share-artist-btn');
            shareArtistBtn.addEventListener('click',() =>{
                new ClipboardJS(`#share-artist-btn`);
    
                 Animations.fade(shareArtistBtn,()=>{})
                
                 Animations.fadeOut(3000,tooltip,()=>{})
                
                });

        
                if (this.artist.description.length > this.MAX_LENGTH_INFO_ARTIST){
          
                    const toggleRead =  document.getElementById('toggle-read-artist-description');
    
                    toggleRead.addEventListener('click', () => {
                        Animations.fade(toggleRead, () => this.toggleTextDescription(toggleRead));
                    });
                }
    
     }
    
    toggleTextDescription = (toggleRead) =>{
        

        const toggleText = document.getElementById('toggle-text-artist-description');
        if( this.artist.description.length > this.MAX_LENGTH_INFO_ARTIST){
            if(toggleText.textContent.length >=  this.artist.description.length){
                toggleText.textContent  = `${this.artist.description.length > this.MAX_LENGTH_INFO_ARTIST ? `${this.artist.description.substring(0, this.MAX_LENGTH_INFO_ARTIST).trim().substring(0, this.artist.description.substring(0, this.MAX_LENGTH_INFO_ARTIST).lastIndexOf(' '))}...` : this.artist.description}`
                toggleRead.textContent = "ALTRO"

            }else{
                toggleText.textContent = this.artist.description
                toggleRead.textContent = "MENO"

            }
        }
        
    }


    asyncManager = () =>{
        const asyncAlbums =  () => {
            const asyncOperation = async () => {
               
                const result = this.mapIds(this.albums);
                const resultStr = result.join(',');

                await this.fetchWorker('getAlbums',{elementId:this.elementId,resultStr:resultStr}, this.updateAlbums)




                return this.albums; 
            };


            return  {
                        asyncOperation: asyncOperation
                    }
        }


        const asyncSingles = () => {
            const asyncOperation = async () => {

                
                const result = this.mapIds(this.albums);
                const resultStr = result.join(',');
                await this.fetchWorker('getSingles',{elementId:this.elementId,resultStr:resultStr}, this.updateSingles)

          


                
                return this.singoli; 
            };
            return  {
                asyncOperation: asyncOperation
            }
        }

        return {

            asyncAlbums: asyncAlbums(),
            asyncSingles: asyncSingles(),
        }

    }



    callbacksManager = () => {

      
        const callbacksSwiperAlbum = () => {
            const onClick = (elementId,elementType) => {
                this.callbacks.goToPage(elementId , elementType)
            };       

            const touchEnd = async (event) => {
    
                await this.albumSwiper.waitingNewElementsInnerHTML(this.asyncManager().asyncAlbums.asyncOperation,[])

            };       

            const setMusicList = (elementId,elementType) =>{
                this.callbacks.setMusicList(elementId,elementType)
            }
            return {
                onClick: onClick,
                touchEnd:touchEnd,
                setMusicList:setMusicList,
            };
        };



        const callbacksSwiperSingolo = () => {
            const onClick = (elementId,elementType) => {
                this.callbacks.goToPage(elementId , elementType)
            };       
            const touchEnd = async (event) => {
               
                await this.singoliSwiper.waitingNewElementsInnerHTML(this.asyncManager().asyncSingles.asyncOperation,[])    
            };       
            const setMusicList = (elementId,elementType) =>{
                this.callbacks.setMusicList(elementId,elementType)
            }
            return {
                onClick: onClick,
                touchEnd:touchEnd,
                setMusicList:setMusicList,
            };
        };
        return {
            swiperAlbum: callbacksSwiperAlbum(),
            swiperSingolo: callbacksSwiperSingolo(),
        };
    }
   
    setArtist = (obj) =>{
        return {
            name:obj.ArtistName,
            description:obj.ArtistDescription,
            luogoNascita: obj.BirthPlace,
            dataNascita: obj.BirthDate,
            genereMusicale: obj.ArtistGenre,
            image: `url(${obj.ArtistImage})`,
            id: obj.IdArtista,

    

        }
    }


    setData = (obj) => {
        const data = [];
        obj.forEach(item => {
            data.push({
                name: item.PublicationTitle,
                genereMusicale: item.PublicationGenre,
                image: `url(${item.PublicationImage})`,
                isExplicit: item.IsExplicit == 0 ? false : true,
                id: item.IdPubblicazione
            });
        });
        return data;
    }
    



    setDataSecond = (obj) =>{
        const data = [];
        obj.forEach(item => {
            data.push({
                name: item.Titolo,
                genereMusicale: item.GenereMusicale,
                image: `url(${item.Immagine})`,
                isExplicit: item.IsExplicit  == 0 ? false : true,
                id: item.IdPubblicazione
            });
        });
        return data;
    }



   innerHTML = () => `
   




            
            <div class="main-container">
                            <div class="artist-header">

                <div class="artist-inner-header">
                    <div class="artist-image" id="artist-image-preview" style="background-image:${this.artist.image};">
                        <div class="overlay-artist-image"></div>
                    </div>

                </div>

                <div class="share-svg-container">
                <div class="outer-share-svg-container">
                    <div class="inner-share-svg-container-artist">
                    <div class="share-artist-btn-container"  id="share-artist-btn" data-clipboard-text="${Constants.URL('artist',`&idArtist=${this.elementId}`)}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentcolor" class="bi bi-share-fill share-icon-artist" viewBox="0 0 16 16">
  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
</svg>
  </div>
                    </div>
                    </div>
                </div>
                <div class="artist-name-container">
                 
                <div class="outer-artist-name-container">
                    <div class="inner-artist-name-container">
                        <div class="artist-icon-title">
                            <svg xmlns="http://www.w3.org/2000/svg" id="svg-play-clickable-left" width="32" height="32" fill="var(--primary-color)" class=" bi bi-play-circle-fill play-icon-artist" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                            </svg>
                        </div>
                            <p class="artist-name-title" id="artist-name-preview">${this.artist.name}</p>   


                    </div>
                    <div>

                    <div class="artist-icon-title-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32"  height="32" id="svg-play-clickable-right"  fill="var(--primary-color)" class=" bi bi-play-circle-fill play-icon-artist" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                        </svg>
                    </div>
                    
                    </div>
                </div>
                <div>



                </div>


                </div>
            </div>


            <div class="main-content">
        

    
            ${

               
                this.albums.length != 0 
                    ?
                        `   
                            <div class="songs">Album</div>
                            <div class="slides-container" id="container-album-artist-slider"></div>
                        `
                    : ``
            }
              
        
           ${
                this.singoli.length != 0 
                ?
                    `
                        <div class="songs">Singoli</div>
                        <div class="slides-container" id="container-singoli-artist-slider"></div>
                    `
                : ``
        
           }

            </div>
            <div class=" ${ this.singoli.length == 0 && this.albums.length == 0 ? `outer-container-info-artist-second` : `outer-container-info-artist`  }">
               <div class="app-container-info" id="block-info-artist">
                    <div class="inner-container-info-artist">
   <div class="primary-container-info-artist">
      <p class="title-info-artist" id="artist-title-info-preview">Informazioni su ${this.artist.name}</p>
      <div class="container-info-artist">
         <div class="left-column-info-artist">
            ${this.artist.description}
         </div>
         <div class="left-column-info-artist-small" >
            <span id="toggle-text-artist-description">
            ${this.artist.description.length > this.MAX_LENGTH_INFO_ARTIST ? `${this.artist.description.substring(0, this.MAX_LENGTH_INFO_ARTIST).trim().substring(0, this.artist.description.substring(0, this.MAX_LENGTH_INFO_ARTIST).lastIndexOf(' '))}...` : this.artist.description}
            </span>  
            ${(this.artist.description.length > this.MAX_LENGTH_INFO_ARTIST) ? `
            <p class="leggi-ancora" id="toggle-read-artist-description">ALTRO</p>
            ` : ""}
         </div>
         <div class="right-column-info-artist">
            <div class="info-row-info-artist">
               <div class="title-generic-info-artist">LUOGO DI NASCITA:</div>
               <div>${this.artist.luogoNascita}</div>
            </div>
            <div class="info-row-info-artist">
               <div class="title-generic-info-artist">DATA DI NASCITA:</div>
        <div>${

            (() => {
                // Array dei nomi dei mesi
                const mesi = [
                    'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
                    'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
                ];
                
                // Creazione dell'oggetto Date
                const date = new Date(this.artist.dataNascita);
                
                // Estrazione del giorno, mese e anno
                const giorno = date.getDate();
                const mese = date.getMonth(); // Mese 0-based
                const anno = date.getFullYear();
                
                // Formattazione della data
                return `${giorno} ${mesi[mese]} ${anno}`;
            })()

        }</div>


            </div>
            <div class="info-row-info-artist">
               <div class="title-generic-info-artist">GENERE:</div>
               <div>${this.artist.genereMusicale}</div>
            </div>
         </div>
      </div>
   </div>
</div>
 </div>
</div>
        </div>




        `






}
