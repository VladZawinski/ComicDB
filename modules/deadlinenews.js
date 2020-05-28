const cheerio = require('cheerio');
const fetch = require('node-fetch');
const util = require('./utils')

const base_url = 'https://deadline.com/'

const fetchLatestNews = (page) => {
     return new Promise((resolve,reject) => {
          fetch(base_url)
          .then(result => result.text())
          .then(body => {
               const $ = cheerio.load(body)

               const posts = $('.river-story.a-archive-grid__story')
               const news = []

               posts.each((index,element) => {
                    const single = $(element)

                    const imgNode = single.find('.c-figure__image ').attr('data-lazy-loaded','true').attr('data-lazy-src')
                    const labelNode = single.find('.c-label').first().text().trim()

                    const uuid = util.generateUUID()
                    const category = single.find('.c-label__link').text().trim()
                    const title = single.find('.c-title').text().trim()
                    const imgUrl = getHighQualityImagePath(imgNode)
                    const time = single.find('.c-timestamp').text()
                    const author = single.find('.c-byline a span').first().text()
                    let status = "None"
                    
                    if(labelNode == 'Breaking' || labelNode == 'Exclusive') status = labelNode

                    news.push({
                         uuid: uuid,
                         title : title,
                         category: category,
                         status: status,
                         img_url: imgUrl,
                         time: time,
                         author: author
                    })
                    
               })
               resolve(news)
               
          }).catch(e => reject(e))
     })
} 


function getHighQualityImagePath(originalPath){
     let newPath = ""
     for(let i = 0; i <= originalPath.length; i++){
          if(originalPath[i] == "?") break
          newPath += originalPath[i]
     }
     return `${newPath}?w=1080`
}

module.exports = {
     fetchLatestNews
}
