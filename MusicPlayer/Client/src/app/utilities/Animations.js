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

export default class Animations {

    static fade(element, callback) {
        if (element) {
            if (!element.classList.contains('fadeOut')) {
                element.classList.add('fadeOut');
            }
            if (element.classList.contains('fadeIn')) {
                element.classList.remove('fadeIn');
            }
            setTimeout(function() {
                callback();
                if (element.classList.contains('fadeOut')) {
                    element.classList.remove('fadeOut');
                }
                if (!element.classList.contains('fadeIn')) {
                    element.classList.add('fadeIn');
                }
            }, 300);
        }
    }

    static fadeOut(timer,element,callback){
        element.classList.add('tooltip-visible');
        if (!element.classList.contains('fadeIn')) {
            element.classList.add('fadeIn');
        }
        if (element.classList.contains('fadeOut')) {
            element.classList.remove('fadeOut');
        }
        setTimeout(() => {
            if (!element.classList.contains('fadeOut')) {
                element.classList.add('fadeOut');
            }
            if (element.classList.contains('fadeIn')) {
                element.classList.remove('fadeIn');
            }
        }, timer); 
    }

    static fadeDouble(elementFirst, elementSecond, callback) {
        const elements = [elementFirst, elementSecond];
        elements.forEach(element => {
            if (element) {
                if (!element.classList.contains('fadeOut')) {
                    element.classList.add('fadeOut');
                }
                if (element.classList.contains('fadeIn')) {
                    element.classList.remove('fadeIn');
                }
            }
        });
        setTimeout(function() {
            callback(); 
            elements.forEach(element => {
                if (element.classList.contains('fadeOut')) {
                    element.classList.remove('fadeOut');
                }
                if (!element.classList.contains('fadeIn')) {
                    element.classList.add('fadeIn');
                }
            });
        }, 300);
    }
    

    static fadeCustomTimer(timer, element, callback) {
        if (element) {
            if (!element.classList.contains('fadeOut')) {
                element.classList.add('fadeOut');
            }
            if (element.classList.contains('fadeIn')) {
                element.classList.remove('fadeIn');
            }
            setTimeout(function() {
                callback();
                if (element.classList.contains('fadeOut')) {
                    element.classList.remove('fadeOut');
                }
                if (!element.classList.contains('fadeIn')) {
                    element.classList.add('fadeIn');
                }
            }, timer);
        }
    }

}


