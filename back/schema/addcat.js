var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var catSchema = new Schema({
    category:String,
    restname:String,
    image:String,
    time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('categorie', catSchema);