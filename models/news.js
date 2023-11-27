const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
    {
        time: {type:String,required:true},
        title: {type:String,required:true},
        text: {type:String,required:true},
        img: {data: Buffer,contentType: String},
    }
);

const newsModel = mongoose.model('news',newsSchema);

module.exports = newsModel;