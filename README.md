# Music-Player




## Comptaibilità Browsers

| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/edge.png" alt="Icona" width="50"/> | <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/firefox.png" alt="Icona" width="50"/> | <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/opera.png" alt="Icona" width="50"/>|   <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/chrome.png"  width="50"/>| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/safari.png"  width="50"/>|
| ------------ | ------------ | ------------ | ------------ | ------------ |


## Albero di Path Client

```bash
$ tree
.
└── Client/
    ├── assets/
    │   ├── audios/
    │   ├── images/
    │   └── styles/
    ├── config/
    │   ├── data.php
    │   ├── json.php
    │   └── session.php
    ├── dist/
    │   ├── scripts
    │   └── styles
    ├── src/
    │   ├── app/
    │   │   ├── design/
    │   │   │   ├── MySwiper.js
    │   │   │   ├── SearchBar.js
    │   │   │   └── TimingBar.js
    │   │   ├── layout/
    │   │   │   ├── Footer.js
    │   │   │   ├── Header.js
    │   │   │   ├── Main.js
    │   │   │   └── Navbar.js
    │   │   ├── pages/
    │   │   │   ├── Artist.js
    │   │   │   ├── Home.js
    │   │   │   └── Music.js
    │   │   ├── utilities/
    │   │   │   ├── Animations.js
    │   │   │   ├── Constants.js
    │   │   │   └── WorkerManager.js
    │   │   ├── workers/
    │   │   │   ├── audioWorker.js
    │   │   │   └── fetchWorker.js
    │   │   └── App.js
    │   └── entry.js
    └── index.php

```



## Albero di Path Server

```bash
$ tree
.
└── Server/
    ├── src/
    │   ├── controllers/
    │   │   ├── CArtist.php
    │   │   ├── CHome.php
    │   │   └── CMusic.php
    │   ├── foundations/
    │   │   ├── FAPI.php
    │   │   └── FDB.php
    │   ├── models/
    │   │   ├── MArtist.php
    │   │   ├── MHome.php
    │   │   └── MMusic.php
    │   └── autoloader.php
    └── index.php

```

## Implementazioni Future

 - Sistema di autenticazione
 - Cloud delle canzoni
 - Interazione con likes e views


## Licenze
| Componente         | Versione  | Copyright                         | Licenza                                                       |
|--------------------|-----------|-----------------------------------|---------------------------------------------------------------|
| Music Player | v1.0.0    | 2024 Vittorio Piotti              | [GPL-3.0 License](https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md) |
| Bootstrap          | v4.0.0    | 2011-2018 The Bootstrap Authors   | [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE) |
| clipboard.js             | v2.0.11    | Zeno Rocha | [MIT License](https://clipboardjs.com/) |
| Swiper             | v11.1.4    | 2014-2024 Vladimir Kharlampidi | [MIT License](https://swiperjs.com) |
