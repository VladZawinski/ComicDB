const loki = require('lokijs');
const db = new loki('db.json');

const heroesCollection = db.addCollection('hero_news')
const comicCollection = db.addCollection('comic')
const deadlineCollection = db.addCollection('deadline')
const newsScienceCollection = db.addCollection('news_science')
const animeNewsCollection = db.addCollection('anime_news')
const gameNewsCollection = db.addCollection('game_news')

/**
 * Heroes News
 * @param {Heroes} news 
 */
function insertHeroesNews (news){
     if(news){
          heroesCollection.remove([])
          heroesCollection.insert(news)
     }
}

function getAllHeroesNews(){
     return heroesCollection.find({})
}

/**
 * Comic
 */
function insertComics(universe,comics){
     if(comics){
          comicCollection.chain().find({universe : universe}).remove()
          comicCollection.insert(comics)          
     }
}

function getComicsByUniverse(universe){
     return comicCollection.find({universe: universe})
}

/**
 * Dead line news
 */

function insertDeadLineNews(news){
     if(news){
          deadlineCollection.chain().find({}).remove()
          deadlineCollection.insert(news)
     }
}

function getDeadLineNews(){
     return deadlineCollection.find({})
}

/**
 * News Science
 */
function insertNewsScienceNews(news){
     if(news){
          newsScienceCollection.chain().find({}).remove()
          newsScienceCollection.insert(news)
     }
}

function getNewsScienceNews(){
      return newsScienceCollection.find({})
}

/**
 * Anime News
 */
function insertAnimeNews(news){
     if(news){
          animeNewsCollection.chain().find({}).remove()
          animeNewsCollection.insert(news)
     }
}

function getAnimeNews(){
      return animeNewsCollection.find({})
}

/**
 * Gaming News
 */
function insertGamingNews(news){
     if(news){
          gameNewsCollection.chain().find({}).remove()
          gameNewsCollection.insert(news)
     }
}

function getGamingNews(){
      return gameNewsCollection.find({})
}


module.exports = {
     insertHeroesNews,
     getAllHeroesNews,
     insertComics,
     getComicsByUniverse,
     insertDeadLineNews,
     getDeadLineNews,
     insertNewsScienceNews,
     getNewsScienceNews,
     insertAnimeNews,
     getAnimeNews,
     insertGamingNews,
     getGamingNews
}