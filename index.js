/***Global Variable */

/***Fetch Requests */
let options = {
    method: 'GET',
    headers: config
}
function getGames(){
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    .then(res => res.json())
    .then(games => console.log('games', games))
}

//initialize
function init(){
    getGames()
}
init()