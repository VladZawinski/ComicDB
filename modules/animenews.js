const cheerio = require('cheerio');
const fetch = require('node-fetch');

const base_url = 'https://www.animenewsnetwork.com'

const fetchAnimeNews = () => {
     return new Promise((resolve,reject) => {
          fetch(createNewsUrl())
          .then(res => res.text())
          .then(body => {
               const $ = cheerio.load(body)

               const posts = $('.herald.box.news')
               const articles = []
               
               for(let i = 0 ; i < 15;i++){
                    const single = $(posts[i])
          
                    const imgNode = single.find('div.thumbnail').get()

                    const title = single.find('h3 a').text()
                    const link = single.find('h3 a').attr('href')
                    const img_url = createPosterUrl($(imgNode).attr('data-src'))
                    const date = single.find('time').text()

                    articles.push({
                         title : title,
                         link : link,
                         img_url : img_url,
                         date : date
                    })
                    
               }

               resolve(articles)
               
          }).catch(e => reject(e))
     })
}

fetchAnimeNews()

function createNewsUrl() {
     return `${base_url}/news`
}

function createPosterUrl(postfix){
     return `${base_url}${postfix}`
}


module.exports = {
     fetchAnimeNews
}