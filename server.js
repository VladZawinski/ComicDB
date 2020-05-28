const express = require('express')
const app = express()

const supernews = require('./modules/superheroesnews')
const getComic = require('./modules/getcomic')
const deadline = require('./modules/deadlinenews')

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


// Something went wrong


app.get('*', (req, res) => {
     res.status(404).send({
          message: "GTFO and STFU"
     });
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});