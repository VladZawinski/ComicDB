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
     const comic = await getComic.getComicsByUniverse('marvel',1)
     console.log(comic);
     
     removeAndInsertComics(comic)
}

function removeAndInsertComics(comics) {
     database.insertComics(comics)
}

module.exports = {
     scrapeInInterval
}