var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  summary: String,

  articleUrl: {
    type: String,
    required: true
  },
  articleImage: String,
  articleDate: String,
  articleUrl : String,
  articleId : String,

  authorName: String,
  authorUrl: String,
  authorAvatar: String,


  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },

  savedArticle: {
    type: Boolean,
    default: false
  },
});

// This creates our model from the above schema, using mongoose's model method
var article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = article;
