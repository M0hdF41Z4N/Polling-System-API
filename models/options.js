// Importing mongoose
const mongoose =  require('mongoose');

// Creating Schema
const optionSchema = new mongoose.Schema({
    text : {
        type : String,
        required:true
    },
    votes : {
        type:Number
    },
    link_to_vote : {
        type:String,
        required:true
    }
    ,question : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
},{
    timestamps:true
});

// Creating Model
const Option = mongoose.model('Option',optionSchema);
// Exporting Model
module.exports = Option