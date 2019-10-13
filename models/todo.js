const mongoose = require('mongoose'); // including my monngoose(ODM)

// Defining my schema
const contentSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },

    task_type: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    }

});

const Content = mongoose.model('Content',contentSchema);

module.exports = Content; 