const express = require('express')
const app = express()

const supernews = require('./modules/superheroesnews')
const getComic = require('./modules/getcomic')
const deadline = require('./modules/deadlinenews')
const newsScience = require('./modules/newsscience')
// Port changes
const port = process.env.PORT || 1887

app.get('/news', (req, res) => {
     supernews.fetchComicsByUniverse()
     .then(r => res.status(200).send(
          {
               latest_news: r
          }
     ))
     .catch(e => res.status(501).send({message: "Something went wrong"}))
});

app.get('/movie/news', (req, res) => {
     console.log(req);
     
     deadline.fetchLatestNews(1)
          .then(result => res.status(201).send({news: result}))
          .catch(e => res.status(501).send({message: 'Something went wrong'}))
});

app.get('/comic/universe/:name/:page', (req, res) => {

     let name = req.params.name || marvel
     let page = req.params.page || 1

     getComic.getComicsByUniverse(name,page)
          .then(result => res.status(200).send(result))
          .catch(e=> res.status(501).send({message: 'Something went wrong'}))
});

async function fetchLandingPageTwo(){
     const scienceNews = newsScience.fetchNewsScience(1)

}

app.get('/home/:page', (req, res) => {
     fetchLandingPageOne()
     .then(result => res.send(result))
});

app.get('*', (req, res) => {
     res.status(404).send({
          message: "GTFO and STFU"
     });
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});


async function fetchLandingPageOne(){
     const heroesNews = await supernews.fetchComicsByUniverse()
     const marvel = await getComic.getComicsByUniverse('marvel',1)
     const dc = await getComic.getComicsByUniverse('dc',1)
     
     return {
          heroes_news : heroesNews,
          marvel_comic : marvel,
          dc_comic : dc
     }
}
