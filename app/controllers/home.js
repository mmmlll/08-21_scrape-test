const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const async = require('async')

const router = express.Router()
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')

function scrape (url, callback) {
  request(url, function (err, response, body) {
    if (err) return callback(err)
    const $ = cheerio.load(body)

    let title = $('.entry-title').text()
    let vidUrl = $('.embed-container').find('iframe').attr('src')
    let steps = $('.recipe-instructions').find('li').map(function () {
      let $stepText = $(this).find('p')
      return $stepText.text()
    }).get()

    console.log({
      title,
      vidUrl,
      steps
    })

    callback(
      null,
      {
        title,
        vidUrl,
        steps
      }
    )
  })
}

router.get('/', function (req, res, next) {
  let url = 'http://themeatmen.sg/'

  request(url, function (err, response, body) {
    if (err) return next(err)
    const $ = cheerio.load(body)

    let urls = $('.featured > div').map(function () {
      let $div = $(this).find('.thumbnail > a')
      return $div.attr('href')
    }).get()

    async.concat(urls, scrape, function (err, results) {
      if (err) return next(err)
      return res.send(results)
    })

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
})

module.exports = function (app) {
  app.use('/', router)
}
