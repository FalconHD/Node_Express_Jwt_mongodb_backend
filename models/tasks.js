const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');





const Schema = mongoose.Schema;


const TasksSchema = new Schema({
    task: {
        type: String,
        required: true
    },

    delivery_datetime: {
        type: Date,
    },
    member: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },


}, { timestamps: true });




TasksSchema.plugin(uniqueValidator);
const TasksModel = model('Task', TasksSchema);

module.exports = TasksModel;