var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisSchema = new Schema({
    fname: String,
    lname: String,
    email:String,
    password: String,
    role:{
        type:String,
        default:'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', RegisSchema);