const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const SubjectSchema = new Schema({
    title : {
        type : String,
        required : true,
    } ,
   
    description : {
        type : String,
    }
   
}, { timestamps: true } );




SubjectSchema.plugin(uniqueValidator);
const SubjectModel = model('Subject' , SubjectSchema);

module.exports = {SubjectModel};