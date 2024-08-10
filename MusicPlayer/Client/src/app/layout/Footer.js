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

import Animations from "../utilities/Animations.js";
import Constants from "../utilities/Constants.js";

export default class Footer {
    constructor(id) {
        this.id = id;
    }

    init = () => {
        document.getElementById(this.id).innerHTML = this.innerHTML();
        this.setAnimations();
        this.setInitialTheme();
        this.changeTheme();
    }

    setAnimations = () => {
        const goToTopSecond = document.getElementById('go-to-top-second');
        goToTopSecond.addEventListener('click', () => {
            Animations.fade(goToTopSecond, Constants.scrollTop);
        });

        const goToTopFirst = document.getElementById('go-to-top-first');
        goToTopFirst.addEventListener('click', () => {
            Animations.fade(goToTopFirst, Constants.scrollTop);
        });
    }

    setInitialTheme = () => {
        const currentTheme = document.body.dataset.theme;
        const themeRadios = document.querySelectorAll('input[name="theme"]');
        themeRadios.forEach(radio => {
            if (radio.value === currentTheme) {
                radio.checked = true;
            }
        });
    }

    changeTheme = () => {
        const themeRadios = document.querySelectorAll('input[name="theme"]');
        themeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    const theme = radio.value;
                    document.body.dataset.theme = theme;

                    const favicon = document.querySelector('link[rel="icon"]');
                    
                    favicon.href = `./assets/images/favicon-${theme}.png`;
                    
                    fetch('config/session.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `theme=${encodeURIComponent(radio.value)}`,
                    })
                    .catch(error => {
                    });
                    
                }
            });
        });
    }


        innerHTML = () => 
            `
                <div class="footer">
                    <div class="inner-footer">
                        <div class="footer-start">
                            © 2024
                        </div>
                        <div class="footer-start-second">
                            <p class="footer-brand" id="go-to-top-second">   Music Player</p>   
                        </div>
                         <span class="footer-copyright-second">© 2024</span>
                        <p class="footer-center"  id="go-to-top-first">
                        Music Player
                        </p>
                        <div class="footer-end">
                            <div class="toggle-container">
                                <input type="radio" id="light" name="theme" value="light" checked>
                                <label for="light">Light</label>
                                <input type="radio" id="dark" name="theme" value="dark">
                                <label for="dark">Dark</label>
                                <div class="switch"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-spacer"></div>
            `
       
    
    



    
      
}