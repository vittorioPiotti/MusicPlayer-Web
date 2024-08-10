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

export default class Constants{



    static URL = (page,params) => `http://musicplayer.local:8888/client/index.php?page=${page}${params}`;



    static CHEVRON_LEFT = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
    </svg>
    
    `;


    static LOADING = (dim,mb,mt,sw) =>`
    <svg width="${dim}" height="${dim}" style="margin:auto;margin-bottom:${mb}px;margin-top:${mt}px;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Cerchio animato -->
  <circle cx="50" cy="50" r="45" stroke="#3498db" stroke-width="${sw}" fill="none" stroke-linecap="round"
          stroke-dasharray="70,213" style="transform-origin: center; opacity: 0;">
    <!-- Animazione della trasformazione per la scala -->
    <animateTransform
      attributeName="transform"
      type="scale"
      from="0 0"
      to="1 1"
      begin="0s"
      dur="0.5s"
      fill="freeze"
    />
    <!-- Animazione dell'opacità per il fade-in -->
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      begin="0s"
      dur="0.3s"
      fill="freeze"
    />
    <!-- Animazione dello spostamento del tratteggio per dare effetto di rotazione -->
    <animate
      attributeName="stroke-dashoffset"
      values="0; -283"
      keyTimes="0; 1"
      dur="1s"
      repeatCount="indefinite"
      keySplines="0.42 0 0.58 1"
      calcMode="linear"
    />
    <!-- Animazione del colore per dare un effetto dinamico -->
    <animate
      attributeName="stroke"
      values="rgb(229, 92, 156); rgb(229, 67, 78); rgb(229, 92, 156); rgb(229, 67, 78);"
      dur="1s"
      repeatCount="indefinite"
    />
  </circle>
</svg>
`   
static LOADING_SECOND = (classe,dim,mt,mb,sw) =>`
    <div class="animated-circle ${classe}"  style="width:${dim}px; height:${dim}px; margin:auto; margin-bottom:${mb}px; margin-top:${mt}px;">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#3498db" stroke-width="${sw}" fill="none" stroke-linecap="round"></circle>
        </svg>
      </div>`



      static LOADING_THIRD = (classe,dim,m,mt,mb,ms,me,sw) =>`
    <div class="animated-circle ${classe}"  style="width:${dim}px; height:${dim}px; margin:${m}; margin-bottom:${mb}px; margin-top:${mt}px;margin-left:${ms}px; margin-right:${me}px;">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#3498db" stroke-width="${sw}" fill="none" stroke-linecap="round"></circle>
        </svg>
      </div>`

    static EXPLICIT =(elemType,dim, marginLeft,borderRadius) => `
    <${elemType} 
     
        style="
            width:${dim}px;
            height:${dim}px;
            position:relative;
            display:flex;
            align-items: center;
            justify-content: center;
        "    
    >
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="${dim}" 
        height="${dim}" 
        style="
            margin-left:${marginLeft}px;
            border-radius:${borderRadius}px;
            z-index:101;
        " 
        fill="rgb(180,180,180)"  
        viewBox="0 0 16 16">
        <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zm4.326 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826z"/>
   
    </svg>
         <${elemType} style="
            position:absolute;
            top:0px;
            left:0px;
            z-index:100;
            width:${dim}px;
            height:${dim}px;
            background-color:black;
            border-radius:50%;
        "></${elemType}>
    </${elemType}>
    `;

    static scrollTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    static POINT = `<span class="pointer-circle-song"></span>`
    static PLAY = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--primary-color)" class="bi bi-play-fill" viewBox="0 0 16 16">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
    </svg>`;


    static PAUSE = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--primary-color)" class="bi bi-pause-fill" viewBox="0 0 16 16">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
        </svg>`;


    static MUSIC = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="var(--primary-color)" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
            <g>
                <rect x="1" y="6" width="4" height="10" class="bar bar1"/>
                <rect x="6" y="2" width="4" height="14" class="bar bar2"/>
                <rect x="11" y="0" width="4" height="16" class="bar bar3"/>
            </g>
        </svg>`;


}

