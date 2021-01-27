const express = require("express");
const request = require("request");
const app = express();
app.get("/", function (req, res) {
  let channel = req.query.ch;

  let urlTest = "https://shashatcom.faulio.com/api/v1/channels/" + channel;

  request(urlTest, function (error, response) {
    if (!error) {
      var obj = JSON.parse(response.body);
      res.redirect(obj.streams.hls)
    }
  });
});
// app.listen("8080");
app.listen(process.env.PORT || 5000);
module.exports = app;
