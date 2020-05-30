const cheerio = require('cheerio')
const fetch = require('node-fetch')
const util = require('../modules/utils')
const base_url = "https://www.newscientist.com"

const fetchNewsScience = async (page) => {
     return new Promise((resolve,reject) => {
          fetch(createURLWithPage(page))
          .then(res => res.text())
          .then(body => {
               const $ = cheerio.load(body)
               const firstSection = $('section').first()

               const articles = []

               const posts = firstSection.find('.card')
               
               posts.each((index,doc) => {
                    const post = $(doc)
                    const imgNode = post.find('.card__image img').attr('data-src')

                    const title = post.find('.card__heading').text()
                    const link = createArticleLink(post.find('a').attr('href'))
                    const category = post.find('.card__eyebrow-link').text().trim()
                    const img_url = getHighQualityImagePath(imgNode)

                    articles.push({
                         uuid : util.generateUUID(),
                         title : title,
                         link : link,
                         category : category,
                         img_url : img_url
                    })
               })
                
               resolve(articles)
          }).catch(e => reject(e))
     })
}


function createURLWithPage(page){
     return `${base_url}/section/news/page/${page}`
}

function createArticleLink(postfix){
     return `${base_url}${postfix}`
}

function getHighQualityImagePath(originalPath){
     let newPath = ""
     for(let i = 0; i <= originalPath.length; i++){
          if(originalPath[i] == "?") break
          newPath += originalPath[i]
     }
     return `${newPath}?width=1080`
}


module.exports = {
     fetchNewsScience
}