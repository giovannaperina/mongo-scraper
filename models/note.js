var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  note: String,
  article_id: String
});

var note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = note;
