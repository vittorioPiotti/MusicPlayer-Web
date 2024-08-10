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

export default class SearchBar {

    


    constructor(selector,callbacks) {
        this.input = document.querySelector(selector);
        this.callbacks = callbacks; 
        this.isSearched = false;
        this.checkSearched = false;
        this.searchText = "";
       
    }

    
    setInput =(value) =>{
        this.input.value = value
        this.searchText = `${value}`
    } 

    init() {

   
  

    
        const setListeners = () =>{
            const checkInput = () => {
                
                if ( this.input.value == "" || this.input.value.trim() === '') {
                    this.input.classList.add('blinking-border');
                    this.input.style.borderLeft = '2px solid rgb(128,128,128,1)';
                } else {
                    this.input.classList.remove('blinking-border');
                    this.input.style.borderLeft = 'none';
                }
                
            }


            const handleInputChange = () => {
                const callBackInputChange = async (callback) =>{
                    if(!this.isSearched){
                        this.isSearched = true;
                        this.checkSearched = false;
                        try {
                            await callback()
                        } catch (error) {
                        } finally {
                           
                            this.isSearched = false;
                            this.checkSearched = true;
                        }
                    }
                }
                this.searchText = this.input.value;
                callBackInputChange(this.callbacks.onChange);
            }
            checkInput();
            this.input.addEventListener('input', checkInput.bind(this));
            this.input.addEventListener('change', checkInput.bind(this));
            this.input.addEventListener('input', handleInputChange.bind(this));
        }


        setListeners();


    }



   


   

  
    




 
}

