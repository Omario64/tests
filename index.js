const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
app.get('/', function (req, res) {
  let typ = req.query.typ;
  let lan = req.query.lan;
  let kommun = req.query.kommun;

  let urlTest = 'https://bensinpriser.nu/stationer/' + typ + '/' + lan + '/' + kommun + '';


  request(urlTest, function (error, response, html) {

    if (!error) {

      var $ = cheerio.load(html);

      const scrapedData = [];
      $('#price_table > tbody > tr').each((index, element) => {
        if (index === 0) return true;
        const tds = $(element).find('td');
        const station = $(tds[0]).text();
        const pris = $(tds[1]).text();
        const tableRow = { station, pris };
        scrapedData.push(tableRow);
      });

      var json = [{
        lan: lan,
        kommun: kommun,
        typ: typ,
        Result: scrapedData
      }];
      res.send(json)

    }

  });

});
app.listen(process.env.PORT || 5000);
module.exports = app;
