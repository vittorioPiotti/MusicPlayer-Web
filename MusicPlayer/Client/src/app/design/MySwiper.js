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
export default class MySwiper {
    constructor(id, swiperId, obj, isRounded, callbacks, elementType,isAll) {
        this.id = id;
        this.isAll = isAll;
        this.swiperId = swiperId;
        this.obj = obj;
        this.isRounded = isRounded;
        this.callbacks = callbacks;
        this.beyondLastSlide = false;
        this.elementType = elementType;
        this.init();
    }
    async waitingNewElementsInnerHTML(callback, callbackSecond,lastResult) {
        const swiperElement = document.getElementById(this.id)?.querySelector('.swiper-wrapper');
        if (!swiperElement) {
            console.warn('Element with ID not found or .swiper-wrapper is missing.');
            return;
        }
        this.resetSwiperElementsInnerHTML(`${Constants.LOADING_SECOND('.animated-circle', 120, 70, 50, 5)}`);
        const circle = document.querySelector('.animated-circle circle');
        if (circle) {
            circle.style.opacity = 1;
        } else {
            console.warn('Element .animated-circle circle not found.');
        }
        await new Promise(resolve => setTimeout(resolve, 600));
        const inputSearch = document.getElementById("input-search");
        let text = "";
        if (inputSearch) {
            text = inputSearch.value;
        }
        switch (text) {
            case "":
                try {
                    let result = await callback();
                    Animations.fade(this.getSwiper(), () => {
                        this.createSwiperElementsInnerHTML(result);
                        this.setEventHandlersOverlay();
                    });
                } catch (error) {
                    console.error('Error during fetch operation:', error);
                }
                break;
            default:
                try {
                    let result = await callbackSecond();
                    switch(result.length){
                        case 0:
                            Animations.fade(this.getSwiper(), () => {
                                this.resetSwiperElementsInnerHTML(`
                                    <div class="icon-warning-response">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="#ffc107" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                        </svg>
                                    </div>`
                                );
                            });   
                            await new Promise(resolve => setTimeout(resolve, 800));
                            result = lastResult
                            //no break
                        default:
                            Animations.fade(this.getSwiper(), () => {
                                this.createSwiperElementsInnerHTML(result);
                                this.setEventHandlersOverlay();
                            });
                            break;
                    }
                } catch (error) {
                    console.error('Error during fetch operation:', error);
                }
                break;
        }
    }
    resetSwiperElementsInnerHTML(innerHTML) {
        const swiperWrapper = document.getElementById(this.id)?.querySelector('.swiper-wrapper');
        if (swiperWrapper) {
            swiperWrapper.innerHTML = innerHTML;
        } else {
            console.warn('Element with ID not found or .swiper-wrapper is missing.');
        }
    }
    getSwiper() {
        return document.getElementById(this.id);
    }
    swiperElementInnerHTML(obj) {
        return obj.map(_obg => `
            <div class="swiper-slide" elementId="${_obg.id}" elementType="${this.elementType}">
                <div class="container-slide"> 
                    <div class="${this.isRounded ? 'artist-img' : 'album-img'}" style="background-image:${_obg.image}">
                        <div class="explicit-container">
                            ${_obg.isExplicit ? Constants.EXPLICIT('div', 18, 0, 3) : ""}
                        </div>
                        ${this.isRounded ? `` : `
                            <div class="overlay-container-img">    
                            </div>
                            <div class="overlay-container-img-second">
                                <div class="btn-clickable-play">
                                    <div class="btn-overlay-img-left"></div>
                                    <div class="btn-overlay-img-left-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="btn-clickable-share" data-clipboard-text="${Constants.URL('music', `&idMusic=${_obg.id}`)}">
                                    <div class="btn-overlay-img-right"></div>
                                    <div class="btn-overlay-img-right-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" class="bi bi-share-fill" viewBox="0 0 16 16">
                                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        `}
                    </div>
                    <div class="container-info">
                        <div class="nome-album">${_obg.name}</div>    
                        <div class="info-album">${_obg.genereMusicale}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    createSwiperElementsInnerHTML(obj) {
        const swiperWrapper = document.getElementById(this.id)?.querySelector('.swiper-wrapper');
        if (swiperWrapper) {
            swiperWrapper.innerHTML = this.swiperElementInnerHTML(obj);
        } else {
            console.warn('Element with ID not found or .swiper-wrapper is missing.');
        }
    }

    init() {
        const container = document.getElementById(this.id);
        if (container) {
            container.innerHTML = this.innerHTML();
            this.setupSwiper();
            this.setupBeyondLastSlideDetection();
            this.setupClickHandler();
            this.setEventHandlersOverlay();
        } else {
            console.warn('Element with ID not found.');
        }
    }

    setupSwiper() {
        this.swiper = new Swiper(`#${this.swiperId}`, {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 25,
            pagination: false,
            breakpoints: {
                "@0.00": {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 10,
                },
                "@0.75": {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 15,
                },
                "@1.00": {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 20,
                },
                "@1.25": {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 25,
                },
            },
        });
    }

    setupBeyondLastSlideDetection() {
        this.swiper.on('setTranslate', (translate, byController) => {
            const { progress, isEnd } = this.swiper;

            if (isEnd && progress > 1 && this.isAll == false) {
            
                if (!this.beyondLastSlide) {
                    this.beyondLastSlide = true;
                    Animations.fade(document.getElementById(this.id), async () => {
                        const inputSearch = document.getElementById("input-search");
                        if (inputSearch) {
                            inputSearch.disabled = true;
                        }

                        await this.callbacks.touchEnd();

                        setTimeout(() => {
                            if (inputSearch) {
                                inputSearch.disabled = false;
                            }
                        }, 1000);
                    });
                }
                    
            } else {
                this.beyondLastSlide = false;
            }
        });
    }

    setupClickHandler() {
        const swiperContainer = document.querySelector(`#${this.id}`);
        if (swiperContainer) {
            swiperContainer.addEventListener('click', (event) => {
                const clickedSlide = event.target.closest('.swiper-slide');
                if (clickedSlide) {
                    const elementId = clickedSlide.getAttribute('elementId');
                    const elementType = clickedSlide.getAttribute('elementType');
                

                    Animations.fade(clickedSlide, () => {
                        this.callbacks.onClick(elementId, elementType);
                    });
                }
            });
        }
    }

    setEventHandlersOverlay() {
        const swiperContainer = document.getElementById(this.swiperId);
        if (swiperContainer) {
            // Seleziona i pulsanti di play
            const playButtons = swiperContainer.querySelectorAll('.btn-clickable-play');
            playButtons.forEach(button => {
                const leftOverlay = button.querySelector('.btn-overlay-img-left');
                const leftSvgOverlay = button.querySelector('.btn-overlay-img-left-svg');

                button.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const swiperSlide = button.closest('.swiper-slide');
                    if (swiperSlide) {

                        const elementId = swiperSlide.getAttribute('elementId');
                        const elementType = swiperSlide.getAttribute('elementType');
                        this.callbacks.setMusicList(elementId, elementType);
                    }

                    Animations.fadeDouble(leftSvgOverlay, leftOverlay, () => {});
                });
            });

            const shareButtons = document.querySelectorAll('.btn-clickable-share');
            shareButtons.forEach(button => {
                const rightOverlay = button.querySelector('.btn-overlay-img-right');
                const rightSvgOverlay = button.querySelector('.btn-overlay-img-right-svg');

                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.innerText = 'Link copiato';
                button.appendChild(tooltip);

                const clipboard = new ClipboardJS(button, {
                    text: function () {
                        return button.getAttribute('data-clipboard-text');
                    }
                });

                clipboard.on('success', function (e) {
                    tooltip.style.opacity = 1;
                    setTimeout(() => {
                        tooltip.style.opacity = 0;
                    }, 3000);
                });

                button.addEventListener('click', (event) => {
                    event.stopPropagation();

                    Animations.fadeDouble(rightOverlay, rightSvgOverlay, () => {
                        Animations.fadeOut(3000, tooltip, () => {});
                    });
                });
            });
        }
    }

    innerHTML() {
        return `
            <div class="slideshow-container">
                <div class="container-swiper">
                    <div class="swiper-container" id="${this.swiperId}">
                        <div class="swiper-wrapper">
                            ${this.swiperElementInnerHTML(this.obj)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}
