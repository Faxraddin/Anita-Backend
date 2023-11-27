const mongoose = require('mongoose');

const emailSchema = mongoose.Schema(
    {
        name: {type:String,required:true},
        email: {type:String,required:true},
        phone: {type:String,required:true},
        company: {type:String,required:true},
        message: {type:String,required:true},
    }
);

const emailModel = mongoose.model('email',emailSchema);

module.exports = emailModel;