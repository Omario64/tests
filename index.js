const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
app.get('/', function(req, res){
    // let date = req.query.date;
    // let sign = req.query.sign;
    // let url = 'https://www.astrology.com/horoscope/daily/' + date + '/' + sign + '.html';
    let typ = req.query.typ;
    let lan = req.query.lan;
    let kommun = req.query.kommun;

    let urlTest = 'https://bensinpriser.nu/stationer/' + typ + '/' + lan + '/' + kommun + '';


    request(urlTest, function(error, response, html) {

      // First we'll check to make sure no errors occurred when making the request
      if (!error) {

        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);

        // Finally, we'll define the variable we're going to capture
        // We'll be using Cheerio's function to single out the necessary information
        // using DOM selectors which are normally found in CSS.
        // var prediction = $('tr').text();
        // var predictionTest = $('td').each((index, element) => {
        //   console.log($(element).text());
        //   });


          const scrapedData = [];
          $('#price_table > tbody > tr').each((index, element) => {
              if (index === 0) return true;
              const tds = $(element).find('td');
              const station = $(tds[0]).text();
              const pris = $(tds[1]).text();
              const tableRow = { station, pris };
              scrapedData.push(tableRow);
          });
          // console.log(scrapedData)
          res.send(scrapedData)


        // And now, the JSON format we are going to expose
        // var json = {
        //   lan: lan,
        //   kommun: kommun,
        //   typ: typ,
        //   predictionTest: predictionTest
        // };
        // console.log(json)
        // res.send(json)

        // console.log(prediction);
        // res.send(prediction)

        // console.log(json);
        // res.send(json)
        // Send the JSON as a response to the client
      }

    });

});
app.listen(process.env.PORT || 5000);
module.exports = app;
