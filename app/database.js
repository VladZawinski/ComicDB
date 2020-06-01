const loki = require('lokijs');
const db = new loki('db.json');

const heroesCollection = db.addCollection('hero_news')
const comicCollection = db.addCollection('comic')

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
function insertComics(comics){
     if(comics){
          comicCollection.chain().find({}).remove()
          comicCollection.insert(comics)
     }
}

function getComicsByUniverse(){
     return comicCollection.find({})
}

module.exports = {
     insertHeroesNews,
     getAllHeroesNews,
     insertComics,
     getComicsByUniverse
     
}