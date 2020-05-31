const fetch = require('node-fetch')
const cheerio = require('cheerio')

const base_url = 'https://www.pcgamer.com'

// Time remaining
const fetchLatestGamingNews = () => {
     return new Promise((resolve,reject) => {
          fetch(createNewsUrl())
          .then(res => res.text())
          .then(body => {
               const $ = cheerio.load(body)

               const posts = $('.listingResult')
               
               const articles = []

               for(let i = 1;i< posts.length ; i++){
                    let single = $(posts[i])
                    let imgNode = single.find('.article-lead-image-wrap').get()
                    let contentNode = single.find('div.content header')
                    

                    let title = single.find('.article-name').text()
                    let img_url = $(imgNode).attr('data-original')
                    
                    let author = $(contentNode).find('span').find('span').text().trim()
                    
                    articles.push({
                         title: title,
                         img_url: img_url,
                         author: author
                    })
               }
               
               resolve(articles)
          }).catch(e => reject(e))
     })
}


function createNewsUrl(){
     return `${base_url}/news`
}

module.exports = {
     fetchLatestGamingNews
}