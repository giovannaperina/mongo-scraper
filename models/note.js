var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  body: String,
});

var note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = note;
