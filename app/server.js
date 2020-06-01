const express = require('express')
const app = express()

const scraper = require('../utils/scraper')
// const supernews = require('../modules/superheroesnews')
// const getComic = require('../modules/getcomic')
// const deadline = require('../modules/deadlinenews')
// const newsScience = require('../modules/newsscience')
// const animeNews = require('../modules/animenews')
// const gameNews = require('../modules/pcgamer')

const db = require('./database.js')

// Port changes
const port = process.env.PORT || 1887

app.get('/news', (req, res) => {
     supernews.fetchComicsByUniverse()
     .then(
          r => {
               db.insertHeroesNews(r)
               res.send(db.getAllHeroesNews());
               
          }
     )
     // .then(r => res.status(200).send(
     //      {
     //           latest_news: r
     //      }
     // ))
     .catch(e => res.status(501).send({message: "Something went wrong"}))
});

app.get('/movie/news', (req, res) => {
     console.log(req);
     
     deadline.fetchLatestNews(1)
          .then(result => res.status(201).send({news: result}))
          .catch(e => res.status(501).send({message: 'Something went wrong'}))
});

app.get('/comic/universe/:name/:page', (req, res) => {
     console.log(db.getComicsByUniverse('marvel'));
     
     // res.send(db.getComicsByUniverse("marvel"));
     // let name = req.params.name || marvel
     // let page = req.params.page || 1

     // getComic.getComicsByUniverse(name,page)
     //      .then(result => res.status(200).send(result))
     //      .catch(e=> res.status(501).send({message: 'Something went wrong'}))
});

app.get('/home/:page', (req, res) => {
     const page = req.params.page

     if(page == 1){
          fetchLandingPageOne().then(result => res.status(200).send(result))
     }else if (page == 2){
          fetchLandingPageTwo().then(result => res.status(200).send(result))
     }else {
          res.send({message: 'No more articles'});
     }
     
});

app.get('*', (req, res) => {
     res.status(404).send({
          message: "GTFO and STFU"
     });
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});

scraper.scrapeInInterval(900000)

/**
 * News,
 * Marvel,
 * DC
 */
async function fetchLandingPageOne(){
     // const heroesNews = await supernews.fetchComicsByUniverse()
     // console.log(heroesNews);
     const heroesNews = db.getAllHeroesNews()
     const marvel = db.getComicsByUniverse('marvel')
     const dc = db.getComicsByUniverse('dc')

     return {
          heroes_news : heroesNews,
          marvel_comic : marvel,
          dc_comic : dc
     }
     
     // const marvel = await getComic.getComicsByUniverse('marvel',1)
     // const dc = await getComic.getComicsByUniverse('dc',1)

     // return {
     //      heroes_news : heroesNews,
     //      marvel_comic : marvel,
     //      dc_comic : dc
     // }
}

async function fetchLandingPageTwo(){
     const scienceNews = db.getNewsScienceNews()
     const anime = db.getAnimeNews()
     const gamingNews = db.getGamingNews()

     return {
          last : true,
          science_news : scienceNews,
          anime_news: anime,
          gaming_news: gamingNews
     }
}




