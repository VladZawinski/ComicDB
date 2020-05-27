const express = require('express')
const app = express()

const supernews = require('./modules/superheroesnews')

const port = process.env.PORT || 1887

app.get('/news', (req, res) => {
     console.log("Requested");
     
     supernews.fetchComicsByUniverse()
     .then(r => res.status(200).send(
          {
               latest_news: r
          }
     ))
     .catch(e => res.status(501).send({message: "Something went wrong"}))
});

app.get('*', (req, res) => {
     res.status(404).send({
          message: "GTFO and STFU"
     });
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});