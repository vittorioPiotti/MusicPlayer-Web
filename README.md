
# Music-Player-Web


Sito di riproduzione musicale per ascoltare le canzoni caricate sulla piattaforma. 

Link al Server di Music Player: [(link)](https://github.com/vittorioPiotti/Music-Player-Server)


## Indice :

 - [Ispirazione](#api)
 - [Sito Web](#albero-di-path)
 - [BETA](#licenze)
 - [Pagine Dinamiche](#pagine-dinamiche)
 - [Exaples of Usage](examples-of-usage)
 - [Ascolto in Background](#ascolto-in-background)
 - [Comptaibilità Browsers](#compatibilità-browsers)
 - [API](#api)
 - [Albero di Path](#albero-di-path)
 - [Coming Soon](#coming-soon)
 - [Licenze](#licenze)

   
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


## Pagine Dinamiche

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

### Indice API:

- [API Home](#api-home)
- [API Music](#api-music)
- [API Artist](#api-artist)

### Lista API:

<div id="api-home"></div>

| API HOME |
|----------|
| **Name**: getSearchedArtists<br>**Endpoint**: [`type=home&method=getSearchedArtists&searchText=${encodeURIComponent(resultREGEXP)}&listIds=${encodeURIComponent(resultStr)}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getSearchedArtists&searchText=mirage&listIds=)<br>**Type**: `GET`<br>**Parametri**: `searchText=${encodeURIComponent(resultREGEXP)}`, `listIds=${encodeURIComponent(resultStr)}`<br>**Descrizione**: Cerca artisti in base al testo specificato. |
| **Name**: getSearchedMusics<br>**Endpoint**: [`type=home&method=getSearchedMusics&searchText=${encodeURIComponent(resultREGEXP)}&listIds=${encodeURIComponent(resultStr)}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getSearchedMusics&searchText=electric&listIds=)<br>**Type**: `GET`<br>**Parametri**: `searchText=${encodeURIComponent(resultREGEXP)}`, `listIds=${encodeURIComponent(resultStr)}`<br>**Descrizione**: Cerca canzoni in base al testo specificato. |
| **Name**: getAllHomeData<br>**Endpoint**: [`type=home&method=getAllHomeData`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getAllHomeData)<br>**Type**: `GET`<br>**Parametri**: Nessuno<br>**Descrizione**: Ottiene tutti i dati necessari per la schermata iniziale. |
| **Name**: getMusics<br>**Endpoint**: [`type=home&method=getMusics&listIds=${encodeURIComponent(resultStr)}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getMusics&listIds=)<br>**Type**: `GET`<br>**Parametri**: `listIds=${encodeURIComponent(resultStr)}`<br>**Descrizione**: Ottiene la lista delle canzoni specificate. |
| **Name**: getArtists<br>**Endpoint**: [`type=home&method=getArtists&listIds=${encodeURIComponent(resultStr)}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getArtists&listIds)<br>**Type**: `GET`<br>**Parametri**: `listIds=${encodeURIComponent(resultStr)}`<br>**Descrizione**: Ottiene la lista degli artisti specificati. |



<div id="api-music"></div>

| API MUSIC | 
|-----------| 
| **Name**: getMusic<br>**Endpoint**: [`type=music&method=getMusic&idMusic=${elementId}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=music&method=getMusic&idMusic=3)<br>**Type**: `GET`<br>**Parametri**: `idMusic=${elementId}`<br>**Descrizione**: Ottiene i dati di una specifica canzone. |
| **Name**: getMusicMin<br>**Endpoint**: [`type=music&method=getMusicMin&idMusic=${elementId}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=music&method=getMusicMin&idMusic=2)<br>**Type**: `GET`<br>**Parametri**: `idMusic=${elementId}`<br>**Descrizione**: Ottiene dati ridotti di una specifica canzone. |


<div id="api-artist"></div>

| API ARTIST | 
|------------| 
| **Name**: getAllArtistData<br>**Endpoint**: [`type=artist&method=getAllArtistData&idArtist=${elementId}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getAllArtistData&idArtist=12)<br>**Type**: `GET`<br>**Parametri**: `idArtist=${elementId}`<br>**Descrizione**: Ottiene tutti i dati di un artista specifico. |
| **Name**: getArtist<br>**Endpoint**: [`type=artist&method=getArtist&idArtist=${elementId}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getArtist&idArtist=1)<br>**Type**: `GET`<br>**Parametri**: `idArtist=${elementId}`<br>**Descrizione**: Ottiene i dati di un artista specifico. |
| **Name**: getAlbums<br>**Endpoint**: [`type=artist&method=getAlbums&idArtist=${elementId}&listIds=${resultStr}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getAlbums&idArtist=12&listIds=)<br>**Type**: `GET`<br>**Parametri**: `idArtist=${elementId}`, `listIds=${resultStr}`<br>**Descrizione**: Ottiene la lista degli album di un artista. |
| **Name**: getSingles<br>**Endpoint**: [`type=artist&method=getSingles&idArtist=${elementId}&listIds=${resultStr}`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getSingles&idArtist=6&listIds=)<br>**Type**: `GET`<br>**Parametri**: `idArtist=${elementId}`, `listIds=${resultStr}`<br>**Descrizione**: Ottiene la lista dei singoli di un artista. |






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
## Coming soon

 - Sistema di autenticazione
 - Cloud delle canzoni da link risorsa
 - Pubblicazioni musicali pubbliche o private
 - Profilo pubblico o privato
 - Interazione con likes e views

   

## Licenze
| Componente         | Versione  | Copyright                         | Licenza                                                       |
|--------------------|-----------|-----------------------------------|---------------------------------------------------------------|
| Music Player | v1.0.0    | 2024 Vittorio Piotti              | [GPL-3.0 License](https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md) |
| Bootstrap          | v4.0.0    | 2011-2018 The Bootstrap Authors   | [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE) |
| clipboard.js             | v2.0.11    | Zeno Rocha | [MIT License](https://clipboardjs.com/) |
| Swiper             | v11.1.4    | 2014-2024 Vladimir Kharlampidi | [MIT License](https://swiperjs.com) |

Canzoni generate usando Suno AI [(Termini di utilizo)](https://suno.com/terms)

Immagini generate usando OpenArt [(Termini di utilizzo)](https://openart.ai/terms)

