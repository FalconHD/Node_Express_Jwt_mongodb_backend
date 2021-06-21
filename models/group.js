const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema = mongoose.Schema;


const GroupSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    } ,
   
   
    member : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }],
    tasks : [{
        type : Schema.Types.ObjectId,
        ref : 'Task',
        required : true,
    }],
    leader : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    subject : {
        type : Schema.Types.ObjectId,
        ref : 'subject',
        required : true,
    }
}, { timestamps: true } );




GroupSchema.plugin(uniqueValidator);
const GModel = model('Group' , GroupSchema);

module.exports = GModel;