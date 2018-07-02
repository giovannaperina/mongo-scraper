// Dependecies
const db = require("./../models");
const express = require('express');
const request = require("request");
const cheerio = require("cheerio");
const router = express.Router();

// Routes

router.get("/scrape", function(req, res) {
    request("https://medium.com/topic/programming/", function(error, response, html) {
        var $ = cheerio.load(html);
        var results = [];
        
        $("div.u-flexColumnTop.u-flexWrap ").each(function (i, element) {
          var title = $(element).children(".u-flex0").children("a").text(); //get the title
          var link = $(element).children("a").attr("href") //get the link
          var summary = $(element).children('a').text(); //get the summary
      
          results.push({
            title: title,
            link: link,
            summary: summary,
          });
        });
        $(".postMetaInline ").each(function (i, element) {
          var authorName = $(element).children("a").text(); //get the authorName
          var authorURL = $(element).children("a").attr("href") //get the authorURL

          results.push({
            authorName: authorName,
            authorURL: authorURL

          });
        });

        $(".ui-caption ").each(function (i, element) {
          var date = $(element).children("time").attr("datetime");

          results.push({
            date: date
          });
        });
        $(".avatar ").each(function (i, element) {
          var authorImage = $(element).children().attr("src");
          
          results.push({
            authorImage: authorImage

          });
        });
        console.log(results)
        
        db.article.create(results)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
});

router.get("/articles", function(req, res) {
    db.article.find({}).sort()
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
    });
});

router.get("/articles/saved", function(req, res) { 
    db.article.find({ savedArticle: true })
      .then(function(dbArticle) {
        res.json(dbArticle); // 
    
      })
      .catch(function(err) {
        res.json(err);
    });
});

router.post("/articles/:id", function(req, res) {
  
    db.article.findOneAndUpdate(req.params.id, { savedArticle: true }, { new: true }, (err, article) => {
      if(err) return res.status(500).json({ msg: 'error...' });
      res.json(article); 
    });

});



// Export routes for server.js to use.
module.exports = router;
