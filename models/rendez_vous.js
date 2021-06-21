const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;


const RVSchema = new Schema({
    date_rv : {
        type : Date,
        required : true,
       
    } ,
   
    status_rv : {
        type : String,
        required : true,
        
    }

   
}, { timestamps: true } );




RVSchema.plugin(uniqueValidator);
const RVModel = model('Meet' , RVSchema);

module.exports = RVModel;