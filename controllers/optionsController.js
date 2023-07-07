// Importing models
const Option = require('../models/options');
const Question = require('../models/questions');

// module to Delete Option
module.exports.deleteOpt = async function(req,res) {
    try {
        // getting option id
        const opt_id = req.params.id;
        // finding option in db
        let option = await Option.findById(opt_id);
        // if option found
        if (option) {
            // finding question associated with particular option
            let ques_id = option.question;
            // delete the option
            option.deleteOne({_id:opt_id});
            // update the question by pulling of option from it
            let question = Question.findByIdAndUpdate(opt_id,{$pull:{
                options:opt_id
            }})
        }else {
            return res.status(200).json({message:"option not found"});   
        }
        return res.status(200).json({message:"option deleted successfully"});
    }catch(err) {
        // For debugging purpose
        // console.log(err);
        return res.status(200).json({message:"Error in deleting option"});
    }
}
// module for adding vote to particular option
module.exports.addVote =  async function(req,res) {
    try {
        // getting option id
        const opt_id = req.params.id;
        // finding option from db
        let option = await Option.findById(opt_id);
        // if option found
        if (option) {
            // getting current number of votes
            let curr_votes = option.votes;
            // Increamenting votes
            await Option.findByIdAndUpdate(opt_id,{
                votes:curr_votes+1
            });
        }else {
            return res.status(200).json({message:"option not found"});
        }
        return res.status(200).json({message:"vote added successfully"});
    }catch(err) {
        return res.status(200).json({message:"Error in voting"});
    }
}