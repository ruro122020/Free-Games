/***Global Variable */
let gamesList;
let counter = 0;
/***Helper functions */

/***Events */
function titleEvent(titleElement){
    titleElement.addEventListener('click', () => {
        handleTitleEvent(titleElement)
    })
}
/***Handle Events Functions */
function handleTitleEvent(titleElement){
    const gameObj = gamesList.find(game => game.title === titleElement.textContent )
    renderGameInfo(gameObj)
}
/***Render to DOM */
function renderGameTitles (){
    const nextGames = gamesList.map(game => game.title)
    nextGames.forEach(gameTitle => {
        let titlesContainer = document.getElementById('game-list')
        const titleElement = document.createElement('li')
        titleElement.textContent = gameTitle
        titlesContainer.appendChild(titleElement)
        titleEvent(titleElement)
    }) 
}   
/***Fetch Requests */
let options = {
    method: 'GET',
    headers: config
}
function getGames(){
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    .then(res => res.json())
    .then(games => {
        gamesList = games
        renderGameTitles()
    })
}

//initialize
function init(){
    getGames()
}
init()