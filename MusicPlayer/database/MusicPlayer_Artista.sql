-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 10, 2024 at 12:02 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_vittoriopiotti`
--

-- --------------------------------------------------------

--
-- Table structure for table `MusicPlayer_Artista`
--

CREATE TABLE `MusicPlayer_Artista` (
  `IdArtista` int(11) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Immagine` varchar(255) DEFAULT NULL,
  `Descrizione` text,
  `StatoNascita` varchar(255) DEFAULT NULL,
  `LuogoNascita` varchar(255) DEFAULT NULL,
  `DataNascita` date DEFAULT NULL,
  `GenereMusicale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MusicPlayer_Artista`
--

INSERT INTO `MusicPlayer_Artista` (`IdArtista`, `Email`, `Password`, `Nome`, `Immagine`, `Descrizione`, `StatoNascita`, `LuogoNascita`, `DataNascita`, `GenereMusicale`) VALUES
(1, 'vpersynth@gmail.com', 'password', 'Vyper Synth', 'http://musicplayer.local:8888/multimedia/artists/artist1.jpg', 'Dai primi passi tra le luci fluorescenti e le ombre digitali di Neo-Torino fino alla conquista dei vertici delle classifiche globali, Vyper Synth ha scritto una nuova pagina nella storia del rap cyberpunk. Dopo aver affinato le sue competenze nei sotterranei virtuali e aver scosso i palchi delle gare di freestyle nella rete neurale nel 2024, Vyper Synth, alias Victor Pirelli (nato in una metropoli futuristica nel 1998), debutta sotto l\'etichetta Quantum Echo con una serie di mixtape che svelano il potere di un MC dalla voce sintetica e dalla lirica iper-tecnologica. Con un\'abilità unica nel manipolare ritmi digitali e testi immersivi, Vyper Synth è in grado di trascinare l\'ascoltatore in un viaggio tra realtà aumentata e mondi virtuali, mescolando emozioni cybernetiche e ritmi pulsanti in un\'esperienza sonora senza precedenti.', 'Italia', 'Roma', '1980-01-01', 'Pop'),
(2, 'technotron@gmail.com', 'password', 'Technotron', 'http://musicplayer.local:8888/multimedia/artists/artist2.jpg', 'Dai primi battiti pulsanti nel neon di Neo-London fino alla conquista dei vertici delle classifiche digitali globali, Technotron ha rivoluzionato il panorama del rap cyberpunk. Dopo aver perfezionato la sua arte nei labirinti virtuali e aver dominato le gare di freestyle nel cyberspazio nel 2023, Technotron, alias Adrian Cruz (nato in un ambiente futuristico nel 1995), debutta sotto l\'etichetta HyperSync con una serie di mixtape che rivelano il potere di un MC dalla voce meccanica e dalla lirica avanguardistica. Con la sua abilità nel manipolare ritmi digitali e testi immersivi, Technotron guida l\'ascoltatore in un\'odissea tra realtà aumentata e metaverso, fondendo emozioni futuristiche e beat pulsanti in un\'esperienza musicale senza confini.', 'USA', 'New York', '1990-02-02', 'Rock'),
(3, 'etherpulse@gmail.com', 'password', 'Ether Pulse', 'http://musicplayer.local:8888/multimedia/artists/artist3.jpg', 'Dai primi colpi di scena tra le strade digitali di Neo-Tokyo fino alla conquista delle vette della classifica globale, Ether Pulse ha ridefinito il rap cyberpunk. Dopo aver affinato la sua tecnica nei circuiti virtuali e aver scosso le piattaforme di freestyle immersivo nel 2025, Ether Pulse, alias Leo Tanaka (nato in un ambiente ipertecnologico nel 1992), fa il suo debutto sotto l\'etichetta Vortex Beat con una serie di mixtape che svelano il talento di un MC dalla voce modulata e dalla lirica futuristica. Con un’abilità unica nel creare ritmi elettronici e testi evocativi, Ether Pulse trasporta l’ascoltatore in un viaggio tra dimensioni virtuali e mondi paralleli, mescolando emozioni digitali e sonorità pulsanti in un’esperienza auditiva senza pari', 'UK', 'Londra', '1985-03-03', 'Jazz'),
(4, 'mirage@gmail.com', 'password', 'Mirage', 'http://musicplayer.local:8888/multimedia/artists/artist4.jpg', 'Dai primi passi tra i riflessi cibernetici di Neo-Miami fino alla conquista delle classifiche intergalattiche, Mirage ha tracciato una nuova rotta nel rap cyberpunk. Dopo aver affinato le sue capacità nei labirinti digitali e aver trionfato nei tornei di freestyle virtuale nel 2024, Mirage, alias Jasmine Lee (nata in un futuro immersivo nel 1994), debutta sotto l\'etichetta Neon Drift con una serie di mixtape che rivelano il potenziale di un MC dalla voce eterea e dalla lirica futuristica. Con un talento unico nel creare atmosfere sonore e testi immersivi, Mirage conduce l\'ascoltatore in un viaggio tra ologrammi e realtà alterate, combinando emozioni virtuali e ritmi incalzanti in un\'esperienza musicale all’avanguardia.', 'Francia', 'Parigi', '1975-04-04', 'Goa Psytrance'),
(5, 'cybersoul@gmail.com', 'password', 'Cyber Soul', 'http://musicplayer.local:8888/multimedia/artists/artist5.jpg', 'Dai primi battiti tra le macchine e i circuiti di Neo-San Francisco fino alla conquista delle vette delle classifiche virtuali, Cyber Soul ha cambiato le regole del gioco nel rap cyberpunk. Dopo aver affinato il suo stile nelle oscure reti di cyberspazio e aver brillato nei contest di freestyle immersivi nel 2026, Cyber Soul, alias Ethan Cross (nato in una megalopoli futuristica nel 1991), fa il suo debutto sotto l\'etichetta Quantum Fusion con una serie di mixtape che rivelano la forza di un MC dalla voce cristallina e dalla lirica cybernetica. Con una maestria unica nel manipolare ritmi elettronici e testi evocativi, Cyber Soul trasporta l’ascoltatore in un viaggio tra mondi virtuali e realtà aumentata, mescolando emozioni digitali e sonorità futuristiche in un\'esperienza sonora senza precedenti.', 'Germania', 'Berlino', '1995-05-05', 'Hip Hop'),
(6, 'omnicus@gmail.com', 'password', 'Omnicus', 'http://musicplayer.local:8888/multimedia/artists/artist6.jpg', 'Dai primi passi tra le luci artificiali e le nebbie digitali di Neo-Seoul fino alla conquista delle classifiche universali, Omnicus ha ridefinito il rap cyberpunk. Dopo aver affinato la sua arte nei sotterranei della rete e aver dominato le competizioni di freestyle immersivo nel 2024, Omnicus, alias Max Volkov (nato in un futuro tecnologico nel 1993), debutta sotto l’etichetta MetaPulse con una serie di mixtape che svelano il potere di un MC dalla voce sintetica e dalla lirica futuristica. Con una padronanza unica dei ritmi elettronici e dei testi evocativi, Omnicus guida l’ascoltatore in un viaggio attraverso realtà virtuali e paesaggi digitali, mescolando emozioni cybernetiche e sonorità pulsanti in un’esperienza musicale di livello superiore.', 'Italia', 'Roma', '1980-01-01', 'Pop'),
(7, 'luminaut@gmail.com', 'password', 'Luminaut ', 'http://musicplayer.local:8888/multimedia/artists/artist7.jpg', 'Dai primi accordi tra i grattacieli luminosi e le strade illuminate di Neo-Barcellona fino alla conquista delle classifiche transculturali, Luminaut ha tracciato una nuova rotta nel rap cyberpunk. Originario di una città futuristica nel 2001, Carlos Ramirez (alias Luminaut) ha iniziato a farsi notare nei circuiti clandestini del cyberspazio e ha dominato i palchi di freestyle a gravità zero nel 2023. Il suo debutto sotto l’etichetta Starlight Syndicate è segnato da una serie di mixtape che rivelano la sua abilità nel fondere ritmi pulsanti e melodie eteree con liriche che navigano tra sogni digitali e realtà aumentata. Con una presenza scenica che riflette l’energia delle luci neon e una voce che risuona attraverso la rete neurale, Luminaut guida l’ascoltatore in un viaggio luminoso attraverso galassie sonore e paesaggi virtuali senza confini.', 'USA', 'New York', '1990-02-02', 'Rock'),
(8, 'nexaxiom@gmail.com', 'password', 'Nex Axiom', 'http://musicplayer.local:8888/multimedia/artists/artist8.jpg', 'Dai primi esperimenti sonori nelle officine di Neo-Berlin fino alla dominazione delle classifiche di metaverso, Nex Axiom ha creato una nuova dimensione nel rap cyberpunk. Nato nel 1992, Elias Vogt (alias Nex Axiom) ha perfezionato la sua arte nei laboratori di realtà virtuale e ha brillato nei tornei di freestyle cybernetico del 2024. Sotto l’etichetta Digital Nexus, il suo debutto discografico è caratterizzato da mixtape che esplorano il confine tra intelligenza artificiale e creatività umana. Con un’abilità unica nell’integrare ritmi algoritmici e testi profondamente futuristici, Nex Axiom trasporta l’ascoltatore in un viaggio attraverso architetture sonore complesse e mondi virtuali, dove l’elettronica incontra la riflessione esistenziale.', 'UK', 'Londra', '1985-03-03', 'Jazz'),
(9, 'cyroreverie@gmail.com', 'password', 'Cryo Reverie', 'http://musicplayer.local:8888/multimedia/artists/artist9.jpg', 'Dai primi passi nel gelo di Neo-Mosca fino alla conquista delle vette delle classifiche intergalattiche, Cryo Reverie ha creato un’eco unica nel rap cyberpunk. Figlio di un’era futuristica (nato nel 1996), Nikolai Ivanov (alias Cryo Reverie) ha affinato le sue competenze nei laboratori di sintesi sonora e ha trionfato nei festival di freestyle ghiacciati nel 2025. Con il suo debutto sotto l’etichetta Frostwave Records, Cryo Reverie offre mixtape che mescolano atmosfere gelide e ritmi pulsanti con liriche che esplorano i confini tra il cosmo e l’inconscio umano. Con un sound che riflette l’ipnotico abisso dell’era glaciale e una voce che attraversa le dimensioni, Cryo Reverie guida l’ascoltatore attraverso un paesaggio sonoro di cristallo e oscurità.', 'Francia', 'Parigi', '1975-04-04', 'Goa Psytrance'),
(10, 'void@gmail.com', 'password', 'Void', 'http://musicplayer.local:8888/multimedia/artists/artist10.jpg', 'Dai primi battiti tra le ombre di Neo-Sydney fino alla conquista dei vertici delle classifiche cosmiche, Void ha ridefinito il rap cyberpunk con la sua visione unica. Nato nel 1988, Ava Carter (alias Void) ha affinato la sua arte nei circuiti di realtà aumentata e ha brillato nei tornei di freestyle ad alta definizione nel 2024. Il suo debutto sotto l’etichetta Null Dimension è caratterizzato da mixtape che esplorano il concetto di vuoto e pienezza attraverso un mix di ritmi e testi penetranti. Con una voce che risuona come un’eco nello spazio profondo e una produzione che esplora l’invisibile e l’ignoto, Void trasporta l’ascoltatore in un viaggio attraverso spazi astrali e realtà parallele, creando un\'esperienza musicale che sfida le leggi del tempo e dello spazio.', 'Germania', 'Berlino', '1995-05-05', 'Hip Hop'),
(11, 'zenith@gmail.com', 'password', 'Zenith', 'http://musicplayer.local:8888/multimedia/artists/artist11.jpg', 'Dai primi passi tra le vette di Neo-Seattle fino alla conquista delle vette delle classifiche interstellari, Zenith ha plasmato il futuro del rap cyberpunk con il suo stile innovativo. Nato nel 1999, Orion Drake (alias Zenith) ha affinato la sua arte nei laboratori di realtà virtuale e ha trionfato nelle gare di freestyle gravitazionali nel 2025. Con il suo debutto sotto l’etichetta Astral Echo, Zenith presenta mixtape che combinano ritmi eterei e liriche che esplorano l\'apice della condizione umana e tecnologica. Con una presenza scenica che evoca l’elevazione verso le stelle e una voce che attraversa l’universo, Zenith guida l’ascoltatore in un’odissea sonora che sfida le frontiere della realtà e del sogno, creando un’esperienza musicale sublime e trascendentale.', 'Italia', 'Roma', '1980-01-01', 'Pop'),
(12, 'voltraction@gmail.com', 'password', 'Voltraction', 'http://musicplayer.local:8888/multimedia/artists/artist12.jpg', 'Nel cuore pulsante di Neo-San Francisco, dove i circuiti elettrici e le strade fluttuano in un’armonia di luci e ombre, Voltraction emerge come il rivoluzionario del rap cyberpunk. Scelto come erede di una città futuristica nel 2000, Samuel Kincaid (alias Voltraction) ha affinato la sua tecnica nei laboratori di sintesi sonora e ha dominato i tornei di freestyle a realtà aumentata nel 2024. Con il suo debutto sotto l’etichetta Quantum Pulse, Voltraction svela mixtape che fondono ritmi pulsanti con liriche che esplorano la convergenza tra umanità e macchina. Con un’abilità unica nel tessere suoni futuristici e parole provocatorie, Voltraction trascina l’ascoltatore in un viaggio attraverso una metropoli elettrica, dove la tecnologia e la natura si intrecciano in una danza sonora mozzafiato.', 'USA', 'New York', '1990-02-02', 'Rock'),
(13, 'etherpulse@gmail.com', 'password', 'Netek', 'http://musicplayer.local:8888/multimedia/artists/artist13.jpg', 'Dai labirinti sottomarini di Neo-Atlantis, dove i corridoi digitali si intrecciano con i resti delle antiche civiltà sommerse, emerge Ether Pulse come la voce nuova del rap cyberpunk. Nato nel 1994, Aeliana Drake (alias Ether Pulse) ha affinato la sua arte tra le onde dell’oceano virtuale e ha brillato nei festival di freestyle cibernetico nel 2025. Con il suo debutto sotto l’etichetta AquaVortex, Ether Pulse lancia mixtape che mescolano ritmi ipnotici con liriche che esplorano il confine tra la realtà liquida e quella virtuale. Con una voce che riecheggia tra i coralli digitali e una produzione che esplora le profondità sonore, Ether Pulse guida l’ascoltatore in un’immersione nell’oceano di dati e emozioni, creando un’esperienza musicale tanto profonda quanto sconvolgente.', 'UK', 'Londra', '1985-03-03', 'Jazz'),
(14, 'kyrokinetik@gmail.com', 'password', 'Kyro Kinetik', 'http://musicplayer.local:8888/multimedia/artists/artist14.jpg', 'Dai laboratori segreti di Neo-Tokyo, dove le macchine danzano e la realtà è una simulazione in continua evoluzione, Kyro Kinetik emerge come il pioniere del rap cyberpunk. Nato nel 1988, Kaito Nishida (alias Kyro Kinetik) ha affinato la sua arte nei sotterranei della rete neurale e ha trionfato nelle competizioni di freestyle al limite della gravità nel 2023. Con il suo debutto sotto l’etichetta HyperFlux, Kyro Kinetik presenta mixtape che fondono ritmi freneticamente fluidi con liriche che esplorano l’energia cinetica dell’universo digitale. Con una presenza scenica che sembra un turbine di elettroni e una voce che vibra come una corrente ad alta velocità, Kyro Kinetik trascina l’ascoltatore in una corsa attraverso il multiverso del cyberspazio, offrendo un’esperienza musicale che sfida le leggi della fisica e della percezione.', 'Francia', 'Parigi', '1975-04-04', 'Goa Psytrance'),
(15, 'revendast@gmail.com', 'password', 'Revendast ', 'http://musicplayer.local:8888/multimedia/artists/artist15.jpg', 'Nel cuore pulsante di Neo-Dubai, dove i grattacieli scintillano e le vie digitali si intrecciano in una sinfonia di luci e ombre, Revendast emerge come la nuova leggenda del rap cyberpunk. Nato nel 1995, Amir Al-Farsi (alias Revendast) ha affinato le sue competenze nei templi virtuali e ha dominato i palchi di freestyle olografico nel 2026. Con il suo debutto sotto l’etichetta Mirage Beats, Revendast lancia mixtape che uniscono ritmi maestosi a liriche che esplorano il conflitto tra il lusso del mondo reale e le sue ombre virtuali. Con una voce che rimbomba come un echi attraverso le architetture digitali e una produzione che evoca paesaggi sonori futuristici, Revendast guida l’ascoltatore in un viaggio attraverso una metropoli di opposti, dove l’eleganza del presente si confronta con le tensioni del futuro.', 'Germania', 'Berlino', '1995-05-05', 'Hip Hop'),
(17, 'mayavega@email.com', 'mayavega', 'Maya Vega', 'http://musicplayer.local:8888/multimedia/artists/artist16.jpg', 'Dai battiti iniziali sotto le luci neon di Neo-Rio fino alla conquista delle vette delle classifiche digitali intergalattiche, AstroBeatz ha rivoluzionato il mondo del rap futuristico. Dopo aver affinato le sue abilità nei circuiti della realtà aumentata e dominato le battaglie di freestyle nell\'iperrealtà nel 2023, AstroBeatz, alias Maya Vega (nata in un futuro avanguardistico nel 1998), debutta sotto l\'etichetta StellarPulse con una serie di mixtape che mostrano il potere di un MC dalla voce futuristica e dai testi innovativi. Con una maestria nell\'intrecciare ritmi galattici e liriche avventurose, AstroBeatz guida l\'ascoltatore in un viaggio attraverso dimensioni virtuali e universi paralleli, fondendo emozioni spaziali e beat pulsanti in un’esperienza musicale che supera i limiti della realtà conosciuta.', 'Italia', 'Neo-Kotu', '1985-06-15', 'Rock');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MusicPlayer_Artista`
--
ALTER TABLE `MusicPlayer_Artista`
  ADD PRIMARY KEY (`IdArtista`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MusicPlayer_Artista`
--
ALTER TABLE `MusicPlayer_Artista`
  MODIFY `IdArtista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
