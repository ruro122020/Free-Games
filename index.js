/***Global Variable */
let gamesList;
let gameTitles;
let counter = 0;
/***Helper functions */
function clearDOM(parentElement) {
    const childElements = parentElement.children
    if (childElements.length) {
        Array.from(childElements).forEach(element => element.remove())
    }
}
function titlesArr(games) {
    gamesList = games
    return games.map(game => game.title)
}
function searchResults(value) {
    const newArr = gameTitles.filter(title => {
        const newTitle = title.toLowerCase()
        return newTitle.includes(value.toLowerCase())
    })
    return newArr
}
function clearClass(element){
    const parentElement = element.parentNode
    const children = parentElement.children
    Array.from(children).forEach(element => element.className = '')
}
/***Events */
function titleEvent(titleElement) {
    titleElement.addEventListener('click', () => {
        clearClass(titleElement)
        titleElement.setAttribute('class', 'highlighter')
        handleTitleEvent(titleElement)
    })
}
document.getElementById('forward').addEventListener('click', handleNextGames)
document.getElementById('back').addEventListener('click', handlePreviousGames)
document.getElementById('game-filter').addEventListener('change', handlePlatformGames)
document.getElementById('search').addEventListener('input', handleSearch)

/***Handle Events Functions */
function handleTitleEvent(titleElement) {
    const gameObj = gamesList.find(game => game.title === titleElement.textContent)
    renderGameInfo(gameObj)
}
function handleNextGames() {
    const gameListContainer = document.getElementById('game-list')
    const nextGames = gameTitles.slice(counter, counter + 10)
    if (!nextGames.length) {
        alert(`You're at the end of the game list`)
        return
    }
    clearDOM(gameListContainer)
    nextGames.forEach(title => renderGameTitles(title))
    counter += 10
    //on page load render the information of the first game on the list
    handleTitleEvent(gameListContainer.firstElementChild)
}
function handlePreviousGames() {
    if (counter === 10) {
        alert(`You're at the start of the game list`)
        return
    }
    const previousGames = gameTitles.slice(counter - 20, counter - 10)
    clearDOM(document.getElementById('game-list'))
    previousGames.forEach(game => renderGameTitles(game))
    counter -= 10
}
function handlePlatformGames(e) {
    getGamesByPlatform(e.target.value.toLowerCase())
}
function handleSearch(e) {
    counter = 0
    if (e.target.value === '') {
        gameTitles = titlesArr(gamesList)
        handleNextGames()
    } else {
        gameTitles = searchResults(e.target.value)
        handleNextGames()
    }
}

/***Render to DOM */
function renderGameTitles(title) {
    let titlesContainer = document.getElementById('game-list')
    const titleElement = document.createElement('li')
    titleElement.textContent = title
    titlesContainer.appendChild(titleElement)
    titleEvent(titleElement)
}
function renderGameInfo({ title, release_date, platform, genre, thumbnail, game_url, short_description}) {
    const gameInfoContainer = document.getElementById('game-info')
    clearDOM(gameInfoContainer)
    //create elements
    const img = document.createElement('img')
    const gameTitle = document.createElement('h2')
    const link = document.createElement('a')
    const dateReleased = document.createElement('p')
    const gamePlatform = document.createElement('p')
    const gameGenre = document.createElement('p')
    const description = document.createElement('p')
    //add text to elements
    gameTitle.textContent = title
    link.textContent = 'Play Game'
    dateReleased.textContent = `Date Released: ${release_date}`
    gamePlatform.textContent = `Platform: ${platform}`
    gameGenre.textContent = `Genre: ${genre}`
    description.textContent = `Description: ${short_description}`
    //set attributes
    img.src = thumbnail
    link.href = game_url
    gameInfoContainer.append(img, gameTitle, link, description, dateReleased, gamePlatform, gameGenre)
}
/***Fetch Requests */
let options = {
    method: 'GET',
    headers: config
}
function getGames() {
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
        .then(res => res.json())
        .then(games => {
            gameTitles = titlesArr(games)
            handleNextGames()
        })
        .catch(error => console.log('error', error))
}

function getGamesByPlatform(platform) {
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`, options)
        .then(res => res.json())
        .then(games => {
            gameTitles = titlesArr(games)
            counter = 0
            handleNextGames(games)
            console.log(games)
        })
        .catch(error => console.log('error', error))
}

//initialize
function init() {
    getGames()
}
init()