/***Global Variable */
let gamesList;
let counter = 0;
/***Helper functions */

/***Render to DOM */
function renderGameTitles (){
    const nextGames = gamesList.map(game => game.title)
    nextGames.forEach(gameTitle => {
        let titlesContainer = document.getElementById('game-list')
        const titleElement = document.createElement('li')
        titleElement.textContent = gameTitle
        titlesContainer.appendChild(titleElement)
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