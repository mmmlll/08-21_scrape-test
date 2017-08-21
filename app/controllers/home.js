const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const async   = require('async')

const router = express.Router()
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')

  // Article = mongoose.model('Article')

router.get('/', function (req, res, next) {
  let url = 'http://themeatmen.sg/'

  request(url, function (err, response, body) {
    if (err) return next(err)
    const $ = cheerio.load(body)

    let urls = $('.featured > div').map(function () {
      let $div = $(this).find('.thumbnail > a')
      return $div.attr('href')
    }).get()

    return res.send({
      urls
    })

    // let title = $('.entry-title').text()
    // let vidUrl = $('.embed-container').find('iframe').attr('src')
    //
    // Recipe.create({
    //   title,
    //   vidUrl,
    //   steps
    // }, function (err, createdRecipe) {
    //   if (err) return next(err)
    //
    //   return res.send(createdRecipe)
    // })
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
