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
import SearchBar from '../design/SearchBar.js';
import Animations from '../utilities/Animations.js';
import WorkerManager from '../utilities/WorkerManager.js';

export default class Home extends WorkerManager{
    

  
    constructor(id, callbacks) {
        super(); 
        this.albums = [];
        this.artists = [];
        this.lastAlbums = [];
        this.lastArtists = [];
        this.id = id;
        this.callbacks = callbacks;
        this.searchBar;
        this.albumSwiper;
        this.artistSwiper;
        this.lastText = "";
    }





    init = async (lastPage) => {


        this.resetWorkers();

        if(this.lastAlbums.length == 0 && this.lastArtists.length == 0){
            await this.fetchWorker('getAllHomeData',{},this.updateHomeData)
        }else{
            this.initializer();
            

        }


 
      
    }



    updateAlbums = (data) =>{
       
        if(data.length != 0){
            this.lastAlbums = this.albums;
            this.albums = this.setterAlbums(data);
        }

    }

    updateArtists = (data) =>{
       
        if(data.length != 0){
            this.lastArtists = this.artists;
            this.artists = this.setterArtists(data);
        }
    }

    updateHomeData = (data) =>{
        this.albums = this.setterAlbums(data.musics);
        this.artists = this.setterArtists(data.artists);
        this.lastAlbums = this.albums;
        this.lastArtists = this.artists;
 
        this.initializer();
    }


    initializer = () =>{
        document.getElementById(this.id).innerHTML = this.innerHTML();
        this.albumSwiper = new MySwiper('container-album-slider','album-slider',this.albums,false,this.callbacksManager().swiperAlbum,'album',false)
        this.artistSwiper = new MySwiper('container-artist-slider','artist-slider',this.artists,true,this.callbacksManager().swiperArtist,'artist',false)
        this.searchBar = new SearchBar('.input-search', this.callbacksManager().searchbar);
        this.searchBar.setInput(this.lastText)
        this.searchBar.init()
        this.setScripts();
    }

    setScripts = () => {
        const imgPersonClickable = document.getElementById('img-person-clickable');
        imgPersonClickable.addEventListener('click', () => {
            Animations.fade(imgPersonClickable, () => {
                
            });
        });  
    };

    






  




    asyncManager = () =>{
        const recursiveCall = (callback) =>{
            const checkInterval = 100; 
            const stableTime = 1000; 
            let lastSearchText = this.searchBar.searchText;
            let stableFor = 0;
            const checkSearchText = async () => {
                if (this.searchBar.searchText === lastSearchText) {
                    stableFor += checkInterval;
                    if (stableFor >= stableTime) {
                        const inputSearch = document.getElementById("input-search");
                        if(inputSearch && inputSearch.disabled == false){
                            inputSearch.disabled = true;
                         
                        }
                        this.lastText = this.searchBar.searchText;
                        return await callback.asyncOperation(this.searchBar.searchText)
                    }
                } else {
                    lastSearchText = this.searchBar.searchText;
                    stableFor = 0;
                }
                await new Promise(resolve => setTimeout(resolve, checkInterval));
                return checkSearchText();
            };
            return checkSearchText();
        }


        const containsAllChars = (name, text) =>{
            // Normalizza tutto in minuscolo e rimuove gli spazi
            const normalizedName = name.toLowerCase().replace(/\s+/g, '');
            const normalizedText = text.toLowerCase().replace(/\s+/g, '');
        
            // Conta le occorrenze di ogni lettera in name
            const nameCharCount = {};
            for (let char of normalizedName) {
                nameCharCount[char] = (nameCharCount[char] || 0) + 1;
            }
        
            // Verifica se name contiene tutte le lettere di text
            for (let char of normalizedText) {
                if (!nameCharCount[char] || nameCharCount[char] <= 0) {
                    return false;
                }
                nameCharCount[char]--;
            }
        
            return true;
        }
  
        // Funzione principale che cerca gli ID degli oggetti che soddisfano la condizione

        const mapIds = (objects) => {
            return objects
                .map(obj => obj.id);
        }
        const searchObjectIdsByChars = (objects, text) => {
            return objects
                .filter(obj => containsAllChars(obj.name, text))
                .map(obj => obj.id);
        }

        function formatForRegexp(str) {
            // Escapa i caratteri speciali per la regex
            const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Escapa i caratteri speciali
            const escapedStr = escapeRegExp(str);
            
            // Crea l'espressione regolare
            const regexpStr = escapedStr.split('').map(char => `.*${char}`).join('');
            
            return regexpStr;
        }
        

        const asyncAlbums =  () => {

            const asyncOperation = async () => {
                const result = mapIds(this.albums);
                const resultStr = result.join(',');
                await this.fetchWorker('getMusics',{resultStr},this.updateAlbums)
                return this.albums;
            };


            return  {
                asyncOperation: asyncOperation
            }
        }


        const asyncArtists = () => {
            const asyncOperation = async () => {
                const result = mapIds(this.artists);
                const resultStr = result.join(',');
                await this.fetchWorker('getArtists',{resultStr},this.updateArtists)
                return this.artists;
            };
            return  {
                asyncOperation: asyncOperation
            }
        }

        const asyncSearchArtists = () => {
           
            const asyncOperation = async (_text) => {
                const text =  _text.replace(/\s/g, '');
                
                const resultREGEXP = text == "" ? ".*" : formatForRegexp(text);
                
                const result = searchObjectIdsByChars(this.artists, text);
                const resultStr = result.join(',');
  
                const response = await this.fetchWorker('getSearchedArtists',{resultREGEXP,resultStr},this.updateArtists)
                return this.setterArtists(response)
            };
            return  {
                asyncOperation: asyncOperation
            }
        }

        const asyncSearchAlbums =  () => {
            const asyncOperation = async (_text) => {
                const text = _text.replace(/\s/g, '');
                const resultREGEXP = text == "" ? ".*" : formatForRegexp(text);
                const result = searchObjectIdsByChars(this.artists, text);
                const resultStr = result.join(',');
                const response = await this.fetchWorker('getSearchedMusics',{resultREGEXP,resultStr},this.updateAlbums)
                return this.setterAlbums(response)
            };
            return  {
                asyncOperation: asyncOperation
            }
        }



        const asyncSearchBarAlbums = () => {
            const asyncOperation = async () => {
                return recursiveCall(this.asyncManager().asyncSearchAlbums)
            };
            
    
            return {
                asyncOperation: asyncOperation
            };
    
        }


        const asyncSearchBarArtists = () => {
            const asyncOperation = async () => {
                return recursiveCall(this.asyncManager().asyncSearchArtists)
            };
            
    
            return {
                asyncOperation: asyncOperation
            };
    
        }
  

      


        return {

            asyncAlbums: asyncAlbums(),
            asyncArtists: asyncArtists(),
            asyncSearchAlbums:asyncSearchAlbums(),
            asyncSearchArtists:asyncSearchArtists(),
            asyncSearchBarAlbums:asyncSearchBarAlbums(),
            asyncSearchBarArtists:asyncSearchBarArtists()

        }

    }




    







   






    callbacksManager = () => {
            const callbacksSearchBar = () => {
                const onChange = async () => {

                    const appLastArtists = this.lastArtists;
                    const appLastAlbums = this.lastAlbums;

                    await Promise.all([
                        this.albumSwiper.waitingNewElementsInnerHTML(this.asyncManager().asyncAlbums.asyncOperation,this.asyncManager().asyncSearchBarAlbums.asyncOperation,appLastAlbums),
                        this.artistSwiper.waitingNewElementsInnerHTML(this.asyncManager().asyncArtists.asyncOperation,this.asyncManager().asyncSearchBarArtists.asyncOperation,appLastArtists)
                    ]);
                    setTimeout(function() {
                        const inputSearch = document.getElementById("input-search");
                        if(inputSearch && inputSearch.disabled == true){
                            inputSearch.disabled = false;
                        
                        }
                    },1000)
                };
    
                return {
                    onChange: onChange,
                };
            };
    
 
    


        const callbacksSwiperAlbum = () => {
            const onClick = (elementId,elementType) => {
                this.callbacks.goToPage(elementId,elementType)
            };       

            const touchEnd = async (event) => {
    


                const appLastAlbums = this.lastAlbums
                await this.albumSwiper.waitingNewElementsInnerHTML(this.asyncManager().asyncAlbums.asyncOperation,this.asyncManager().asyncSearchBarAlbums.asyncOperation,appLastAlbums)

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



       
        const callbacksSwiperArtist = () => {
            
            const onClick = (elementId,elementType) => {

                this.callbacks.goToPage(elementId,elementType)
            };       
            const touchEnd = async (event) => {

            
                const appLastArtists = this.lastArtists;
                await this.artistSwiper.waitingNewElementsInnerHTML(this.asyncManager().asyncArtists.asyncOperation,this.asyncManager().asyncSearchBarArtists.asyncOperation,appLastArtists)


                
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
            searchbar: callbacksSearchBar(),
            swiperAlbum: callbacksSwiperAlbum(),
            swiperArtist: callbacksSwiperArtist(),
   
        };

    }
   



  



   
   


    






    setterAlbums = (data) => {
        const albums = [];
        for (let i = 0; i < data.length; i++) {
            albums.push({
                name: data[i].Titolo,
                genereMusicale: data[i].GenereMusicale,
                image: `url(${data[i].Immagine})`,
                isExplicit: data[i].IsExplicit == 0 ? false : true,
                id: data[i].IdPubblicazione,
            });
        }
        return albums;
    }

    setterArtists = (data) => {
        const artists = [];
        for (let i = 0; i < data.length; i++) {
            artists.push({
                name: data[i].Nome,
                genereMusicale: data[i].GenereMusicale,
                image: `url(${data[i].Immagine})`,
                isExplicit:false,
                id: data[i].IdArtista,
            });
        }
        return artists;
    }









    innerHTML = () =>
    
                
                `
                    <div class="main-container">
                        <div class="main-content">
                            <div class="header-home">
                                <div class="page">Home</div>
                                <div class="profile">
                                    <svg id="img-person-clickable" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(128,128,128,1)" class="bi bi-person-circle icon-person" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>

                                </div>
                            </div>
                            <div class="search-bar">
                                <div class="inner-search-bar">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(128,128,128,1)" class="bi bi-search icon-src" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>

                                    <input id="input-search" class="input-search" placeholder="Ricerca brani o artisti" type="text"/>
                                </div>
                            </div>
                            <div class="songs">Album e Singoli</div>
                            <div class="slides-container" id="container-album-slider"></div>
                            <div class="songs">Artisti</div>
                            <div class="slides-container" id="container-artist-slider"></div>
                        </div>
                    </div>
    
                
                `
    
            

    
}