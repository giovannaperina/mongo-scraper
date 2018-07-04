// Dependecies
const db = require("./../models");
const express = require('express');
const request = require("request");
const cheerio = require("cheerio");
const router = express.Router();

// Routes

router.get("/scrape", function(req, res) {
  request("https://medium.com/topic/programming/", function(error, response, html) {
      let $ = cheerio.load(html);
      let results = [];
      
      $(".js-topicStream .streamItem--section .u-borderBox .js-sectionItem").each(function (i, element) {
        let title = $(element).find('h3.ui-h3').text();
        let summary = $(element).find('h4.ui-summary').text();
        
        let articleImage = $(element).find('a.u-block.u-backgroundSizeCover').attr('style');

        articleImage = "" + articleImage; // make sure it's a string
        articleImage = articleImage.split('"'); // split string
        articleImage = articleImage[1]; // getting only the second element

        let articleDate = $(element).find('.ui-caption time').attr('datetime');
        let articleUrl = $(element).find('h3.ui-h3').parent().attr('href');
        let articleId = $(element).find('h3.ui-h3').parent().data('post-id');

        let authorName = $(element).find('a.postMetaInline--author').text();
        let authorUrl = $(element).find('a.postMetaInline--author').attr('href');
        let authorAvatar = $(element).find('a img.avatar-image').attr('src');

        results.push({
          title: title,
          summary: summary, 

          articleImage: articleImage,
          articleDate: articleDate,
          articleUrl: articleUrl,
          articleId: articleId,

          authorName: authorName,
          authorUrl: authorUrl,
          authorAvatar: authorAvatar
 
        });
      });

      results.map((result, i) => {
        db.article.findOne({articleId: result.articleId})
        .then(function(article){
          if(!article){
            db.article.create(result)
            .then(function(dbArticle) {
              console.log(dbArticle);
            })
            .catch(function(err) {
              return res.json(err);
            });
          }
        });
        console.log(results.length, i);
        if(results.length -1 === i){
          res.json({msg: "Trollei!"})
        }
      })
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
  console.log(req.params.id)

    db.article.findByIdAndUpdate(req.params.id, { savedArticle: true }, { new: true }, (err, article) => {
      if(err) return res.status(500).json({ msg: 'error...' });
      res.json(article); 
    });
});

router.post("/articles/delete/:id", function(req, res) {
  console.log(req.params.id)

    db.article.findByIdAndUpdate(req.params.id, { savedArticle: false }, { new: true }, (err, article) => {
      if(err) return res.status(500).json({ msg: 'error...' });
      res.json(article); 
    });
});



// Export routes for server.js to use.
module.exports = router;
