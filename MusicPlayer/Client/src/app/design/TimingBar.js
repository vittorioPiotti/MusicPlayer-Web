
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

export default class TimingBar {
    constructor(id, callbacks) {
        this.id = id;
        this.progressBar = document.getElementById(this.id);
        this.width = 0;
        this.duration = 100;
        this.interval = null;
        this.isPlaying = false;
        this.callbacks = callbacks || {};
        this.init();
    }

    setDuration(duration) {
        this.duration = duration;
        this.progressBar.max = this.duration;
    }

    setDisabled(state) {
        this.progressBar.disabled = state;
        this.progressBar.style.display = state ? 'none' : 'block';
    }

    init() {
        this.progressBar.addEventListener('input', () => {
           
            this.width = parseInt(this.progressBar.value);
            this.updateProgressBarStyle();
            if (this.callbacks.onChange) {
                this.callbacks.onChange(this.id, this.progressBar.value);
            }

            // Handle timer continuation or restart
            if (this.isPlaying) {
                this.stopInterval();
                this.startInterval();
            }
        });

        this.progressBar.max = this.duration;
        this.updateProgressBarStyle();
    }

    setValue(value) {
        this.progressBar.value = value;
        this.width = parseInt(this.progressBar.value);
        this.updateProgressBarStyle();
    }

    startInterval() {
        if (this.isPlaying && this.interval === null) {
            this.interval = setInterval(() => {
                if (this.width >= this.duration) {
                    this.stopInterval();
                } else {
                    this.width++;
                    this.progressBar.value = this.width;
                    this.updateProgressBarStyle();
                }
            }, 1000);
        }
    }

    stopInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.startInterval();
        }
    }

    pause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.stopInterval();
        }
    }

    updateProgressBarStyle() {
        let value = parseInt(this.progressBar.value);
        let max = parseInt(this.progressBar.max);
        let percent = (value / max) * 100;
        this.progressBar.style.setProperty('--range-progress', percent + '%');
    }
}



