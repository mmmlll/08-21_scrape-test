const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const router = express.Router()
  // mongoose = require('mongoose')
  // Article = mongoose.model('Article')

router.get('/', function (req, res, next) {
  let url = 'http://themeatmen.sg/sg-bbq-chicken-wings/'

  request(url, function (err, response, body) {
    if (err) return next(err)

    const $ = cheerio.load(body)
    let title = $('.entry-title').text()
    let vidUrl = $('.embed-container').find('iframe').attr('src')

    return res.send({
      title,
      vidUrl
    })
  })

  // Article.find(function (err, articles) {
  //   if (err) return next(err)
  //   res.render('index', {
  //     title: 'Scrapie scrape',
  //     articles: articles
  //   })
  // })
})

module.exports = function (app) {
  app.use('/', router)
}
