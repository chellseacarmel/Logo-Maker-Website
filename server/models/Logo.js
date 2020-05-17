var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text:String,
  multipletext:[{Xlocation:Number,Ylocation:Number,textName:String,textColor:String,textSize:Number}],
  backgroundColor: String,
  borderColor: String,
  borderWidth: { type: Number, min: 0, max: 100 },
  borderRadius: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 100 },
  margin: { type: Number, min: 0, max: 100 },
  lastUpdate: { type: Date, default: Date.now },
  logoWidth: { type: Number, min: 0, max: 100 },
  logoHeight:{ type: Number, min: 0, max: 100 },
  image: [{Xlocation:Number,Ylocation:Number,Url:String,ImageHeight:Number,ImageWidth:Number}]
});

module.exports = mongoose.model('Logo', LogoSchema);