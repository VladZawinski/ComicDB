const cheerio = require('cheerio')
const fetch = require('node-fetch')
const util = require('./utils')

const base_url = 'https://getcomics.info/'

const getComicsByUniverse = (universe,page) => {
     return new Promise((resolve,reject) => {
          fetch(createUniverseURL(universe,page))
          .then(res => res.text())
          .then(body => {
               const $ = cheerio.load(body)
               const posts = $('article')
               
               const categoryName = $('.category-name').text()
               const totalPage = $('.page-numbers').last().text()
               const result = []

               posts.each((index,post) => {
                    const single = $(post)
                    const img_url = single.find('div a img').attr('src')
                    const link = single.find('.post-title a').attr('href')
                    const title = single.find('.post-title a').text()

                    result.push(
                         {
                              uuid : util.generateUUID(),
                              title: title,
                              link: link,
                              img_url: img_url
                         }
                    )
               })

               
               console.log(totalPage);
               
               resolve({
                    category_name : categoryName,
                    total_page: totalPage,
                    posts : result
               })
          })
          .catch(e => reject(e))
     })
}


function createUniverseURL(universe,page){
     return `${base_url}/cat/${universe}/page/${page}`
}

module.exports = {
     getComicsByUniverse
}