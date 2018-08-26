var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var addSchema = new Schema({
    Restaurant_Name: String,
    Address: String,
    description:String,
    email:String,
    image:String,
    Phone:Number,
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Restaurant', addSchema);