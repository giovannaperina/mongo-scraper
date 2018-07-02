const express = require ('express')
const router = express.Router();
const path = require ('path')

//Home Page 
router.get('/', function (req, res){
    res.sendFile( path.resolve('public/index.html') );
});

//Saved Articles 
router.get('/saved', function (req, res){
    res.sendFile( path.resolve('public/saved-articles.html') );
});

module.exports = router;


