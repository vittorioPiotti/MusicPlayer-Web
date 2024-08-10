
<!--
Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
Copyright 2024 Vittorio Piotti
Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
-->

<!--
Swiper 11.1.4
Most modern mobile touch slider and framework with hardware accelerated transitions
https://swiperjs.com

Copyright 2014-2024 Vladimir Kharlampidi

Released under the MIT License

Released on: May 30, 2024
-->

<!--
clipboard.js v2.0.11
https://clipboardjs.com/

Licensed MIT © Zeno Rocha
-->

<!--
Bootstrap v4.0.0 (https://getbootstrap.com)
Copyright 2011-2018 The Bootstrap Authors
Copyright 2011-2018 Twitter, Inc.
Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
-->

<?php include 'config/data.php'; ?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MP · Home</title>
    <link rel="stylesheet" href="./dist/styles/swiper-bundle.min.css">
    <link rel="stylesheet" href="./assets/styles/animations.css">
    <link rel="stylesheet" href="./assets/styles/colors.css">
    <link rel="stylesheet" href="./assets/styles/global.css">
    <link rel="stylesheet" href="./assets/styles/mySwiper.css">
    <link rel="stylesheet" href="./assets/styles/footer.css">
    <link rel="stylesheet" href="./assets/styles/navbar.css">
    <link rel="stylesheet" href="./assets/styles/artist.css">
    <link rel="stylesheet" href="./assets/styles/home.css">
    <link rel="stylesheet" href="./assets/styles/header.css">
    <link rel="stylesheet" href="./assets/styles/music.css">
</head>
<body>

    <header id="header"></header>
    <nav class="nav-container" id="navbar"></nav>
    <main id="main"></main>
    <footer class="container-footer" id="footer"></footer>

    <script src="./dist/scripts/clipboard.min.js" defer></script>
    <script src="./dist/scripts/swiper-bundle.min.js" defer></script>
    <script src="./src/entry.js" type="module" defer></script>
    
</body>
</html>
