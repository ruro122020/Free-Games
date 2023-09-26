/***Global Variable */
let gamesList;

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
    })
}

//initialize
function init(){
    getGames()
}
init()