
# Music-Player-Web


Sito di riproduzione musicale per ascoltare le canzoni caricate sulla piattaforma. 

Link al Server di Music Player: [(link)](https://github.com/vittorioPiotti/Music-Player-Server)


## Ispirazione

La grafica del sito web è stata sviluppata ispirandosi all'interfaccia di  [iTunes](https://www.apple.com/itunes/), con l'obiettivo di creare un'esperienza utente simile. L'itento è stato quello di catturare un aspetto e una funzionalità simili senza replicare direttamente il design di iTunes.



## Sito Web

Sito Web Music Player: [Link al Sito](https://vittoriopiotti.altervista.org/MusicPlayer/Client/index.php)

---

<img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/socialpreview-second.png" alt="Icona" width="100%"/>



## BETA

**Features:**

- Riproduzione musicale
- Ascolto in background
- Interfaccia e routing system

**Unsolved BUGs:**

- delay al primo caricamento
- errori nella gestione dell'audio dal menu di riproduzione in background
- errori nel caricamento deglia audio
- errori per delay in cambio schermate


## Casi d'uso

 - Page Home · visualizza barra di ricerca e swiper slides di brani e artisti
 - Page Artist · visualizza dati artista e swiper slides di album e singoli
 - Page Music · visualizza dati di album e singoli con tracklist e controllo audio
 - Page Navbar · visualizza menu interrattivo per gestire la riproduzione musicale


## Exaples of Usage

|<img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif8.gif" alt="Icona" width="250"/>| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif9.gif" alt="Icona" width="700"/>|
|-------------|-------------|

## Ascolto in Background

|<img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif4.gif" alt="Icona" width="250"/>| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif5.gif" alt="Icona" width="700"/>|
|-------------|-------------|






## Comptaibilità Browsers

| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/edge.png" alt="Icona" width="50"/> | <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/firefox.png" alt="Icona" width="50"/> | <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/opera.png" alt="Icona" width="50"/>|   <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/chrome.png"  width="50"/>| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/safari.png"  width="50"/>|
| ------------ | ------------ | ------------ | ------------ | ------------ |



## API 

| Nome API                   | URL                                                                           | Parametri                                                | Descrizione                                                                                                      |
|----------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **getMusic**               | `type=music&method=getMusic&idMusic=${elementId}`           | `idMusic=${elementId}`                                    | Ottiene i dati di una specifica canzone.                                                                          |
| **getMusicMin**            | `type=music&method=getMusicMin&idMusic=${elementId}`        | `idMusic=${elementId}`                                    | Ottiene dati ridotti di una specifica canzone.                                                                    |
| **getAllArtistData**       | `type=artist&method=getAllArtistData&idArtist=${elementId}` | `idArtist=${elementId}`                                   | Ottiene tutti i dati di un artista specifico.                                                                     |
| **getArtist**              | `type=artist&method=getArtist&idArtist=${elementId}`        | `idArtist=${elementId}`                                   | Ottiene i dati di un artista specifico.                                                                           |
| **getAlbums**              | `type=artist&method=getAlbums&idArtist=${elementId}&listIds=${resultStr}` | `idArtist=${elementId}`, `listIds=${resultStr}`          | Ottiene la lista degli album di un artista.                                                                       |
| **getSingles**             | `type=artist&method=getSingles&idArtist=${elementId}&listIds=${resultStr}` | `idArtist=${elementId}`, `listIds=${resultStr}`          | Ottiene la lista dei singoli di un artista.                                                                       |
| **getMusics**              | `type=home&method=getMusics&listIds=${encodeURIComponent(resultStr)}` | `listIds=${encodeURIComponent(resultStr)}`               | Ottiene la lista delle canzoni specificate.                                                                       |
| **getArtists**             | `type=home&method=getArtists&listIds=${encodeURIComponent(resultStr)}` | `listIds=${encodeURIComponent(resultStr)}`               | Ottiene la lista degli artisti specificati.                                                                       |
| **getSearchedArtists**     | `type=home&method=getSearchedArtists&searchText=${encodeURIComponent(resultREGEXP)}&listIds=${encodeURIComponent(resultStr)}` | `searchText=${encodeURIComponent(resultREGEXP)}`, `listIds=${encodeURIComponent(resultStr)}` | Cerca artisti in base al testo specificato.                                                                        |
| **getSearchedMusics**      | `type=home&method=getSearchedMusics&searchText=${encodeURIComponent(resultREGEXP)}&listIds=${encodeURIComponent(resultStr)}` | `searchText=${encodeURIComponent(resultREGEXP)}`, `listIds=${encodeURIComponent(resultStr)}` | Cerca canzoni in base al testo specificato.                                                                        |
| **getAllHomeData**         | `type=home&method=getAllHomeData`                           | Nessun parametro                                          | Ottiene tutti i dati necessari per la schermata iniziale.                                                         |



## Coming soon

 - Sistema di autenticazione
 - Cloud delle canzoni da link risorsa
 - Pubblicazioni musicali pubbliche o private
 - Profilo pubblico o privato
 - Interazione con likes e views

   

### Albero di Path

```bash
$ tree
.
└── Client
    ├── assets
    │   ├── audios
    │   ├── images
    │   └── styles
    │       ├── animations.css
    │       ├── artist.css
    │       ├── colors.css
    │       ├── footer.css
    │       ├── global.css
    │       ├── header.css
    │       ├── home.css
    │       ├── music.css
    │       ├── mySwiper.css
    │       └── navbar.css
    ├── config
    │   ├── data.php
    │   ├── json.php
    │   └── session.php
    ├── dist
    │   ├── scripts
    │   │   ├── clipboard.min.js
    │   │   ├── musicPlayer-bundle.min.js
    │   │   ├── swiper-bundle.min.js
    │   │   └── swiper-bundle.min.js.map
    │   └── styles
    │       ├── musicPlayer-bundle.min.css
    │       └── swiper-bundle.min.css
    ├── src
    │   ├── app
    │   │   ├── design
    │   │   │   ├── MySwiper.js
    │   │   │   ├── SearchBar.js
    │   │   │   └── TimingBar.js
    │   │   ├── layout
    │   │   │   ├── Footer.js
    │   │   │   ├── Header.js
    │   │   │   ├── Main.js
    │   │   │   └── Navbar.js
    │   │   ├── pages
    │   │   │   ├── Artist.js
    │   │   │   ├── Home.js
    │   │   │   └── Music.js
    │   │   ├── utilities
    │   │   │   ├── Animations.js
    │   │   │   ├── Constants.js
    │   │   │   │   └── WorkerManager.js
    │   │   └── workers
    │   │       ├── audioWorker.js
    │   │       └── fetchWorker.js
    │   ├── App.js
    │   └── entry.js
    └── index.php



```


## Licenze
| Componente         | Versione  | Copyright                         | Licenza                                                       |
|--------------------|-----------|-----------------------------------|---------------------------------------------------------------|
| Music Player | v1.0.0    | 2024 Vittorio Piotti              | [GPL-3.0 License](https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md) |
| Bootstrap          | v4.0.0    | 2011-2018 The Bootstrap Authors   | [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE) |
| clipboard.js             | v2.0.11    | Zeno Rocha | [MIT License](https://clipboardjs.com/) |
| Swiper             | v11.1.4    | 2014-2024 Vladimir Kharlampidi | [MIT License](https://swiperjs.com) |
