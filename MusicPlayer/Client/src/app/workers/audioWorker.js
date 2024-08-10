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

let terminated = false;

self.onmessage = function(e) {
    if (e.data === 'terminate') {
        terminated = true;
        self.close();
        return;
    }
    if (terminated) return;

    const { url, index } = e.data;

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            if (terminated) return;
            self.postMessage({ index, arrayBuffer });
        })
        .catch(e => {
            if (terminated) return;
            self.postMessage({ index, error: e.message });
        });
};
