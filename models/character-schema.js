const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


//defining character Schema
const characterSchema = new Schema({
  name : String,
  occupation: String,
  weapon  : {type:String},
  cartoon: Boolean
});

//==seeting Character as model
const Character = mongoose.model('Character', characterSchema);

//==name of new character model following Schema guidelines
module.exports = Character; 
