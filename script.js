/* ----------------------------------------------------------------------- */
/* ------------------------------ Variables ------------------------------ */
/* ----------------------------------------------------------------------- */

// Menu opening and closing
const menuButton = document.getElementById("menu-icon");
const menuOpenBar = document.getElementById("menu-open-bar");
const menuOpenBGFade = document.getElementById("menu-open-BGFade");
const navBar = document.getElementsByTagName("nav")[0];
const navBarOriginalBGColor = getComputedStyle(navBar).backgroundColor;
const menuOpenLinkItems = document.getElementsByClassName("menu-open-link-item");

// Creating Themes
const themes = document.getElementById("themes");
const numThemes = 6;
var menuIsOpen = false;

// Duplicating Game node
const games = document.getElementById("games");
const game = document.getElementsByClassName("game")[0];
const numGames = 8;
const gameThumbnails = document.getElementsByClassName("game-thumbnail");
const gameCardNames = document.getElementsByClassName("game-card-name");
const gameNameList = {
    "game1": "Falling Ball",
    "game2": "Tic Tac Toe",
    "game3": "Duck Hunt",
    "game4": "HexGL",
    "game5": "2048",
    "game6": "Flappy Bird",
    "game7": "Mario",
    "game8": "Tower Stack",
}

// Duplicating Article node
const articles = document.getElementById("articles");
const article = document.getElementsByClassName("article")[0];
const numArticles = 8;
const articleThumbnails = document.getElementsByClassName("article-thumbnail");
const articleCardLabels = document.getElementsByClassName("article-card-label");
const articleLabelList = {
    "article1": "The mythology of Mortal Kombat: How a 1992 video game spawned a globally successful franchise across media",
    "article2": "Video game therapy could treat COVID-induced ‘brain fog’, scientists suggest",
    "article3": "Good news for gamers! Stadia Pro free trial is now live: Here's what you need to do",
    "article4": "PUBG Mobile India release date leaked? Here's all PUBG lovers should know",
    "article5": "Why do video games like Cyberpunk 2077, Valorant suffer from errors, glitches at the onset?",
    "article6": "Microsoft Flight Simulator coming to Xbox Series in summer 2021",
    "article7": "EA announces Battlefield mobile game, coming to smartphones in 2022",
    "article8": "Despite supply constraints, Sony sold 7.8 million PS5 consoles till March end",
}

// Opening and closing frame Container
const frameOpenContainer = document.getElementById("frame-open-container");
const frameOpenBGFade = document.getElementById("frame-open-BGFade");
var frameIsOpen = false;
const frameCloseBtnWrapper = document.getElementById("frame-close-btn-wrapper");
const frameExpandShrinkBtnWrapper = document.getElementById("frame-expand-shrink-btn-wrapper");
const frameExpandShrinkBtn = document.getElementById("frame-expand-shrink-btn");
var frameIsExpanded = false;
const openFrame = document.getElementById("open-frame");
const bodyOverflowOGValue = getComputedStyle(document.body).overflow;
const elementUrls = {
    "game1": "games/Falling Ball/index.html",
    "game2": "games/Tic Tac Toe/index.html", 
    "game3": "http://duckhuntjs.com/",
    "game4": "http://hexgl.bkcore.com/play/",
    "game5": "games/2048/index.html",
    "game6": "https://flappybird.io/",
    "game7": "games/Mario/index.html",
    "game8": "http://fe.bmqb.com/tower_game/index.html",
    
    "article1": "https://www.firstpost.com/entertainment/the-mythology-of-mortal-kombat-how-a-1992-video-game-spawned-a-globally-successful-franchise-across-media-9551731.html",
    "article2": "https://indianexpress.com/article/technology/gaming/video-game-therapy-could-treat-covid-induced-brain-fog-suggest-scientists-7287567/",
    "article3": "https://zeenews.india.com/gaming/good-news-for-gamers-stadia-pro-free-trial-is-now-live-heres-what-you-need-to-do-2332332.html",
    "article4": "https://zeenews.india.com/technology/pubg-mobile-india-release-date-leaked-heres-all-pubg-lovers-should-know-2356338.html",
    "article5": "https://www.firstpost.com/sports/why-do-video-games-like-cyberpunk-2077-valorant-suffer-from-errors-glitches-at-the-onset-9457161.html",
    "article6": "https://www.indiatvnews.com/technology/news-microsoft-flight-simulator-coming-to-xbox-series-in-summer-2021-670761",
    "article7": "https://indianexpress.com/article/technology/gaming/ea-announces-battlefield-mobile-game-coming-to-smartphones-in-2022-7285700/",
    "article8": "https://indianexpress.com/article/technology/gaming/despite-supply-constraints-sony-sold-7-8-million-ps5-consoles-till-march-end-7293567/",

    "menu-item-0": "https://forms.gle/NbCGPLDCPWhxzb6WA",
    "menu-item-1": "https://forms.gle/XviBCZF2yW8TfepC8 ",
    "menu-item-2": "",
    "menu-item-3": "https://forms.gle/AmYnJfmWm7wL1pMf6",
};




/* ----------------------------------------------------------------------- */
/* ------------------------------ Main Code ------------------------------ */
/* ----------------------------------------------------------------------- */


// Setting first background Image
document.body.style.backgroundImage = "url('pictures/themes/theme (4).jpg')";



// Menu opening and closing
function toggleMenu(){
    if(!menuIsOpen){
        menuIsOpen = true;
        menuOpenBar.style.left = "0";
        navBar.style.backgroundColor = "black";
        menuOpenBGFade.style.height = "100%";
        menuOpenBGFade.style.opacity = "1";
    }else{
        menuIsOpen = false;
        menuOpenBar.style.left = "-100%";
        navBar.style.backgroundColor = navBarOriginalBGColor;
        menuOpenBGFade.style.height = "0";
        menuOpenBGFade.style.opacity = "0";
    }
}
menuButton.addEventListener("click", toggleMenu);
menuOpenBGFade.addEventListener("click", toggleMenu);

for(i=0; i<menuOpenLinkItems.length; i++){
    menuOpenLinkItems[i].addEventListener("click", openCloseFrameContainer);
}



// Creating Themes
for(i=0; i<numThemes;i++){
    var newTheme = document.createElement("div");
    newTheme.setAttribute("class", "theme");
    newTheme.setAttribute("id", "theme (" + parseInt(i+1) + ")");
    themes.appendChild(newTheme);
    newTheme.style.backgroundImage = "url('pictures/themes/theme (" + parseInt(i+1) + ").jpg')";
    newTheme.addEventListener("click", changeTheme);
    var newThemeFade = document.createElement("div");
    newThemeFade.setAttribute("class", "theme-fade");
    newTheme.appendChild(newThemeFade);
}
function changeTheme(){
    var themeId = this.getAttribute("id");
    document.body.style.backgroundImage = "url('pictures/themes/" + themeId + ".jpg')";
}



// Duplicating Game node
game.addEventListener("click", openCloseFrameContainer);
for(i=1; i<numGames; i++){
    var newGame = game.cloneNode(true);
    games.appendChild(newGame);
    newGame.id = "game" + parseInt(i+1);
    newGame.addEventListener("click", openCloseFrameContainer);
    gameCardNames[i].innerHTML = gameNameList[newGame.id];
    gameThumbnails[i].src = "pictures/game thumbnails/" + gameNameList[newGame.id] + ".png";
}



// Duplicating Article Node
article.addEventListener("click", openCloseFrameContainer);
for(i=1; i<numArticles; i++){
    var newArticle = article.cloneNode(true);
    articles.appendChild(newArticle);
    newArticle.id = "article" + parseInt(i+1);
    newArticle.addEventListener("click", openCloseFrameContainer);
    articleCardLabels[i].innerHTML = articleLabelList[newArticle.id];
    articleThumbnails[i].src = "pictures/article thumbnails/" + newArticle.id + ".jpg";
}



// Opening and closing frame container
function openCloseFrameContainer(){
    if(!frameIsOpen){
        frameIsOpen = true;
        frameOpenContainer.style.height = "90vh";
        frameOpenContainer.style.minWidth = "500px";
        frameOpenContainer.style.width = "85vw";
        frameOpenContainer.style.borderWidth = "2px";
        frameOpenBGFade.style.height = "100%";
        frameOpenBGFade.style.opacity = "1";
        var elementId = this.getAttribute("id");
        openFrame.setAttribute("src", elementUrls[elementId]);
        openFrame.focus();
    }else{
        frameIsOpen = false;
        frameOpenContainer.style.height = "0";
        frameOpenContainer.style.minWidth = "0";
        frameOpenContainer.style.width = "0";
        frameOpenContainer.style.borderWidth = "0";
        frameOpenContainer.style.top = "53%";
        frameOpenBGFade.style.height = "0";
        frameOpenBGFade.style.opacity = "0";
        openFrame.style.width = "97%";
        openFrame.style.height = "95%";
        frameExpandShrinkBtn.classList.add("fa-expand");
        frameExpandShrinkBtn.classList.remove("fa-compress");
        openFrame.removeAttribute("src");
        document.body.style.overflow = bodyOverflowOGValue;
    }
}

function expandShrinkFrameContainer(){
    if(!frameIsExpanded){
        frameIsExpanded = true;
        frameOpenContainer.style.height = "100vh";
        frameOpenContainer.style.minWidth = "500px";
        frameOpenContainer.style.width = "100vw";
        frameOpenContainer.style.borderWidth = "0";
        frameOpenContainer.style.top = "50%";
        frameOpenBGFade.style.height = "0";
        frameOpenBGFade.style.opacity = "0";
        openFrame.style.width = "100%";
        openFrame.style.height = "100%";
        frameExpandShrinkBtn.classList.add("fa-compress");
        frameExpandShrinkBtn.classList.remove("fa-expand");
        openFrame.focus();
        document.body.style.overflow = "hidden";
    }else{
        frameIsExpanded = false;
        frameOpenContainer.style.height = "90vh";
        frameOpenContainer.style.minWidth = "500px";
        frameOpenContainer.style.width = "85vw";
        frameOpenContainer.style.borderWidth = "2px";
        frameOpenContainer.style.top = "53%";
        frameOpenBGFade.style.height = "100%";
        frameOpenBGFade.style.opacity = "1";
        openFrame.style.width = "97%";
        openFrame.style.height = "95%";
        frameExpandShrinkBtn.classList.add("fa-expand");
        frameExpandShrinkBtn.classList.remove("fa-compress");
        openFrame.focus();
        document.body.style.overflow = bodyOverflowOGValue;
    }
}
frameCloseBtnWrapper.addEventListener("click", openCloseFrameContainer);
frameExpandShrinkBtnWrapper.addEventListener("click", expandShrinkFrameContainer);
