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
self.onmessage = async function(event) {
    if (event.data === 'terminate') {
        terminated = true;
        self.close();
        return;
    }
    if (terminated) return;
    const { action, elementId, resultStr, resultREGEXP } = event.data;
    try {
        let url;
        switch(action) {
            case 'getMusic':
                url = `http://musicplayer.local:8888/server/index.php?type=music&method=getMusic&idMusic=${elementId}`;
                break;
            case 'getMusicMin':
                url = `http://musicplayer.local:8888/server/index.php?type=music&method=getMusicMin&idMusic=${elementId}`;
                break;
            case 'getAllArtistData':
                url = `http://musicplayer.local:8888/server/index.php?type=artist&method=getAllArtistData&idArtist=${elementId}`;
                break;
            case 'getArtist':
                url = `http://musicplayer.local:8888/server/index.php?type=artist&method=getArtist&idArtist=${elementId}`;
                break;
            case 'getAlbums':
                url = `http://musicplayer.local:8888/server/index.php?type=artist&method=getAlbums&idArtist=${elementId}&listIds=${resultStr}`;
                break;
            case 'getSingles':
                url = `http://musicplayer.local:8888/server/index.php?type=artist&method=getSingles&idArtist=${elementId}&listIds=${resultStr}`;
                break;
            case 'getMusics':
                url = `http://musicplayer.local:8888/server/index.php?type=home&method=getMusics&listIds=${encodeURIComponent(resultStr)}`;
                break;
            case 'getArtists':
                url = `http://musicplayer.local:8888/server/index.php?type=home&method=getArtists&listIds=${encodeURIComponent(resultStr)}`;
                break;
            case 'getSearchedArtists':
                url = `http://musicplayer.local:8888/server/index.php?type=home&method=getSearchedArtists&searchText=${encodeURIComponent(resultREGEXP)}&listIds=${encodeURIComponent(resultStr)}`;
                break;
            case 'getSearchedMusics':
                url = `http://musicplayer.local:8888/server/index.php?type=home&method=getSearchedMusics&searchText=${encodeURIComponent(resultREGEXP)}&listIds=${encodeURIComponent(resultStr)}`;
                break;
            case 'getAllHomeData':
                url = `http://musicplayer.local:8888/server/index.php?type=home&method=getAllHomeData`;
                break;
            default:
                throw new Error('Invalid action');
        }
        const response = await fetch(url);
        if (terminated) return;
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        if (terminated) return;
        self.postMessage({ success: true, action, data });
    } catch (error) {
        if (terminated) return;
        console.error('Worker fetch error:', error);
        self.postMessage({ success: false, action, error: error.message });
    }
};
