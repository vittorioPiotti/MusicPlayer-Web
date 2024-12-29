
# Music-Player-Web


Sito di riproduzione musicale per ascoltare le canzoni caricate sulla piattaforma. 

Link al Server di Music Player: [(link)](https://github.com/vittorioPiotti/Music-Player-Server)

---

## Indice :

 - [Ispirazione](#api)
 - [Sito Web](#sito-web)
 - [BETA](#beta)
 - [Pagine](#pagine)
 - [Examples of Usage](#examples-of-usage)
 - [Ascolto in Background](#ascolto-in-background)
 - [Browsers compatibili](#browsers-compatibili)
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
- Switch schermate one-page


**Unsolved BUGs:**

> [!CAUTION]
> - errori nella gestione dell'audio dal menu di riproduzione in background 
> - errori nel caricamento deglia audio 
> - errori per delay in cambio schermate


## Pagine 

|<img src="https://github.com/vittorioPiotti/Music-Player-Web/blob/main/media/home-cutted.png" alt="Icona" />| <img src="https://github.com/vittorioPiotti/Music-Player-Web/blob/main/media/artist-cutted.png" alt="Icona" />| <img src="https://github.com/vittorioPiotti/Music-Player-Web/blob/main/media/music-cutted.png" alt="Icona" />|
|-------------|-------------|-------------|
|1|2|3|


1. L'utente sceglie l'artista o la produzione 
2. L'utente visualizza artista e sceglie una tra le relative produzioni
3. l'utente visualizza i brani della produzione e sceglie quale ascoltare


## Examples of Usage

|<img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif8.gif" alt="Icona" width="250"/>| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif9.gif" alt="Icona" width="700"/>|
|-------------|-------------|

## Ascolto in Background

|<img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif4.gif" alt="Icona" width="250"/>| <img src="https://github.com/vittorioPiotti/Music-Player/blob/main/media/gif5.gif" alt="Icona" width="700"/>|
|-------------|-------------|





## Browsers compatibili

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
| **Name**: getSearchedArtists<br>**Endpoint**: [`type=home&method=getSearchedArtists`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getSearchedArtists&searchText=mirage&listIds=)<br>**Type**: `GET`<br>**Parametri**: `searchText=testoDaCercare`, `listIds=1,2,3`<br>**Descrizione**: Cerca artisti in base al testo specificato. |
| **Name**: getSearchedMusics<br>**Endpoint**: [`type=home&method=getSearchedMusics`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getSearchedMusics&searchText=electric&listIds=)<br>**Type**: `GET`<br>**Parametri**: `searchText=testoDaCercare`, `listIds=1,2,3`<br>**Descrizione**: Cerca canzoni in base al testo specificato. |
| **Name**: getAllHomeData<br>**Endpoint**: [`type=home&method=getAllHomeData`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getAllHomeData)<br>**Type**: `GET`<br>**Parametri**: Nessuno<br>**Descrizione**: Ottiene tutti i dati necessari per la schermata iniziale. |
| **Name**: getMusics<br>**Endpoint**: [`type=home&method=getMusics`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getMusics&listIds=)<br>**Type**: `GET`<br>**Parametri**: `listIds=1,2,3`<br>**Descrizione**: Ottiene la lista delle canzoni specificate. |
| **Name**: getArtists<br>**Endpoint**: [`type=home&method=getArtists`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=home&method=getArtists&listIds)<br>**Type**: `GET`<br>**Parametri**: `listIds=1,2,3`<br>**Descrizione**: Ottiene la lista degli artisti specificati. |




<div id="api-music"></div>


| API MUSIC | 
|-----------| 
| **Name**: getMusic<br>**Endpoint**: [`type=music&method=getMusic`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=music&method=getMusic&idMusic=3)<br>**Type**: `GET`<br>**Parametri**: `idMusic=12`<br>**Descrizione**: Ottiene i dati di una specifica canzone. |
| **Name**: getMusicMin<br>**Endpoint**: [`type=music&method=getMusicMin`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=music&method=getMusicMin&idMusic=2)<br>**Type**: `GET`<br>**Parametri**: `idMusic=12`<br>**Descrizione**: Ottiene dati ridotti di una specifica canzone. |

<div id="api-artist"></div>


| API ARTIST | 
|------------| 
| **Name**: getAllArtistData<br>**Endpoint**: [`type=artist&method=getAllArtistData`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getAllArtistData&idArtist=12)<br>**Type**: `GET`<br>**Parametri**: `idArtist=12`<br>**Descrizione**: Ottiene tutti i dati di un artista specifico. |
| **Name**: getArtist<br>**Endpoint**: [`type=artist&method=getArtist`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getArtist&idArtist=1)<br>**Type**: `GET`<br>**Parametri**: `idArtist=12`<br>**Descrizione**: Ottiene i dati di un artista specifico. |
| **Name**: getAlbums<br>**Endpoint**: [`type=artist&method=getAlbums`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getAlbums&idArtist=12&listIds=)<br>**Type**: `GET`<br>**Parametri**: `idArtist=12`, `listIds=1,2,3`<br>**Descrizione**: Ottiene la lista degli album di un artista. |
| **Name**: getSingles<br>**Endpoint**: [`type=artist&method=getSingle`](https://vittoriopiotti.altervista.org/MusicPlayer/Server/index.php?type=artist&method=getSingles&idArtist=6&listIds=)<br>**Type**: `GET`<br>**Parametri**: `idArtist=12`, `listIds=1,2,3`<br>**Descrizione**: Ottiene la lista dei singoli di un artista. |






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

> [!WARNING]
> Questo software è rilasciato sotto la licenza **GPL v3** quindi l'uso, la modifica e la distribuzione del codice sorgente ne deve rispettare i termini.
> 
> I contenuti multimediali possono essere soggetti a una **licenza non commerciale** richiedendo l'acquisto di una licenza separata.
>
> Gli audio generati da **Suno AI** [(Termini di utilizo)](https://suno.com/terms) necessitano dell'acquisto di una licenza separata per l'uso commerciale.


> [!NOTE]
> Canzoni generate usando **Suno AI** [(Termini di utilizo)](https://suno.com/terms)
> 
> Immagini generate usando **OpenArt** [(Termini di utilizzo)](https://openart.ai/terms)

> [!NOTE]
> Di **Bootstrap** sono state utilizzate solo le icone


### Music Player Server


**Copyright** 2024 Vittorio Piotti [(GitHub page)](https://github.com/vittorioPiotti) [(Personal page)](https://vittoriopiotti.altervista.org/) 

**Version** [v1.0.0](https://github.com/vittorioPiotti/MusicPlayer-Web/releases/tag/v1.0.0)

**License** [GPL-3.0](https://github.com/vittorioPiotti/MusicPlayer-Web/blob/main/LICENSE.md)


---

### Bootstrap Icons

**Copyright** 2011-2018 The Bootstrap Authors 

**Version** [v1.11.0](https://blog.getbootstrap.com/2023/09/12/bootstrap-icons-1-11-0/)

**License** [MIT](https://github.com/twbs/icons/blob/main/LICENSE)



---


### Swiper


**Copyright** 2014-2024 Vladimir Kharlampidi [(GitHub page)](https://github.com/nolimits4web)

**Version** [v11.1.4](https://github.com/nolimits4web/swiper/releases/tag/v11.1.4)

**License** [GPL-3.0](https://github.com/vittorioPiotti/MusicPlayer-Web/blob/main/LICENSE.md)


---


### Clipboard JS


**Copyright** Music Player Web [(GitHub page)](https://github.com/zenorocha)

**Version** [v2.0.11](https://github.com/zenorocha/clipboard.js/releases/tag/v2.0.11)

**License** [MIT](https://clipboardjs.com/)









