// Importing models
const Question = require('../models/questions');
const Option = require('../models/options');

// module to view all questions = 
module.exports.viewAll = async function (req,res) {

    try {
        
        let questions = await Question.find({})
        .populate({path:'options'});
        return res.status(200).json({
            message:'List of Questions',
            questions : questions
        });
    }
    catch(err) {
        return res.status(200).json({
            message : "Internal Server Error"
            // For Debugging Purpose
            // ,Error : err
        });
    }
}

// module to create question
module.exports.createQues = async function(req,res) {
    try {
        // Getting data from request
        let data = req.body;
        // Creating Question
        await Question.create({
            title:data.title
        });

        return res.status(200).json({
            message:"Question created Successfully."
        });

    }catch(err) {
         // For Debugging Purpose
        // console.log(err);
        return res.status(200).json({
            message:"Internal Server Error"
             // For Debugging Purpose
            // ,Error : err
        });
    }
}

// module to delete question
module.exports.deleteQues = async function(req,res) {
    try {
        // Getting question id from request
        const ques_id = req.params.id;
        // finding question in db and deleting from db
        let question = await Question.findByIdAndDelete(ques_id);
        // if question found
        if (question) {
            // deleting options
            await Option.deleteMany({question:req.params.id});
        }else {
            return res.status(200).json({
                message:"Question not found"
            });
        }
        return res.status(200).json({
            message:"Question delete succesfully"
        });
    }catch(err) {
        // For Debugging Purpose
        // console.log(err);
        return res.status(200).json({
            message:"Internal Server Error"
        });
    }
    

}

// module to view question
module.exports.viewQues = async function(req,res) {
    
    try {
        // Getting question id 
        const { id } = req.params;
        // finding question in db and populating its options
        let question = await Question.findById({
            _id:id
        }).populate({path:'options'});
        // if question found
        if (question) {
            res.status(200).json({
                question:question
            });
        }
        else{
            res.status(200).json({
                message:"No Question Found!"
            });
        }
    }catch(err) {
        // For Debugging Purpose
        // console.log(err);
        return res.status(200).json({
            message:"Internal Server Error"
             // For Debugging Purpose
            // ,Error : err
        });
    }
}

// module to add option at any particular question
module.exports.addOption = async function (req,res) {

    try {
        // getting question id
        const ques_id = req.params.id;
        // First find question
        let question = await Question.findById({
            _id:ques_id
        });
        // if question found
        if (question) {
            // create option
            let option = await Option.create({
                text:req.body.text,
                votes:0,
                // linking dummy vote link
                link_to_vote:`http://localhost:8000/options/add_vote`
            });
            
            // getting option
            if (option) {
                // Create link to add vote
                let linkStr = `http://localhost:8000/options/${option.id}/add_vote`;
                // updating the original vote link to option
                await Option.findByIdAndUpdate({
                    _id:option.id
                },{
                    link_to_vote : linkStr
                });
                // push option to question
                question.options.push(option);
                // saving question
                question.save();
                return res.status(200).json({
                    message:"option added successfully"
                    
                });
            }else{
                return res.status(200).json({
                    message:"Can't add Option"
                    
                });
            }
            
        }else {
            return res.status(200).json({
                        message:"Question not found"
                        
                    });
                }    

    }catch(err) {
        // For debugging purpose
        // console.log(err);
        return res.status(200).json({
            message:"Error in adding option"
        });
    }
    
}