const database = require('../app/database')

const supernews = require('../modules/superheroesnews')
const getComic = require('../modules/getcomic')
const deadline = require('../modules/deadlinenews')
const newsScience = require('../modules/newsscience')
const animeNews = require('../modules/animenews')
const gameNews = require('../modules/pcgamer')


const scrapeInInterval = async (amountOfTime) => {
     scrape()
     setInterval(() => {
          scrape()
     },amountOfTime)
     
}

async function scrape() {
     const marvel = await getComic.getComicsByUniverse('marvel',1)
     removeAndInsertComics('marvel',marvel)
     const dc = await getComic.getComicsByUniverse('dc',1)
     removeAndInsertComics('dc',dc)
     const dl = await deadline.fetchLatestNews(1)
     removeAndInsertDeadlineNews(dl)
     const heroNews = await supernews.fetchComicsByUniverse()
     removeAndInsertHeroesNews(heroNews)
     const scienceNews = await newsScience.fetchNewsScience(1)
     removeAndInsertNewsScienceNews(scienceNews)
     const anime = await animeNews.fetchAnimeNews()
     removeAndInsertAnimeNews(anime)
     const game = await gameNews.fetchLatestGamingNews()
     removeAndInsertGamingNews(game)
}

function removeAndInsertComics(universe,comics) {     
     database.insertComics(universe,comics)
}

function removeAndInsertDeadlineNews(news){
     database.insertDeadLineNews(news)
}

function removeAndInsertHeroesNews(news) {
     database.insertHeroesNews(news)
}

function removeAndInsertAnimeNews(news){
     database.insertAnimeNews(news)
}


function removeAndInsertGamingNews(news) {
     database.insertGamingNews(news)
}

function removeAndInsertNewsScienceNews(news){
     database.insertNewsScienceNews(news)
}

module.exports = {
     scrapeInInterval
}