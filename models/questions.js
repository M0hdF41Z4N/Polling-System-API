// Importing mongoose
const mongoose = require('mongoose');


// Creating Schema
const questionSchema = new mongoose.Schema({
    title : {
        type: String,
        required:true
    },
    options : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Option'
        }
    ]
}, {
    timestamps:true
});

// Creating Model
const Question = mongoose.model('Question',questionSchema);
// Exporting Model
module.exports = Question