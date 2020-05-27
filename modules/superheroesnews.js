const cheerio = require('cheerio')
const fetch = require('node-fetch')

const fetchComicsByUniverse = () => {
     return new Promise((resolve,reject) => {
          fetch('https://superheronews.com/')
          .then(res => res.text())
          .then(body => {
               const $ = cheerio.load(body)
               const posts = $('.td_module_10')
               const results = []
     
               posts.each((index,element) => {
                    const single = $(element)
                    const imageNode = single.find('.td-module-thumb a img').attr('src')
                    
                    const imgUrl = getHighQualityImagePath(imageNode)
                    const title = single.find('.item-details h3 a').text()
                    const date = single.find('.td-module-meta-info .td-post-date time').text()
                    
                    results.push(
                         {
                              img_url: imgUrl,
                              title: title,
                              date: date
                         }
                    )
               })
               resolve(results)
          }).catch(e => reject(e))
     })
}

function getHighQualityImagePath(originalPath){
     let newPath = ""
     for(let i = 0; i <= originalPath.length; i++){
          if(originalPath[i] == "?") break
          newPath += originalPath[i]
     }
     return `${newPath}?resize=1080%2C1080&quality=100`
}



module.exports = {
     fetchComicsByUniverse
}