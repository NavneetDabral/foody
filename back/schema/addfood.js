var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var foodSchema = new Schema({
    cuisine:String,
    category:String,
    restaurant:String,
    image:String,
    price:Number,
    time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('food', foodSchema);