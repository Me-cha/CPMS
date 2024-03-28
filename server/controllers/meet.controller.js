const Meet = require('../models/meet.model');

const createMeet = async(req,res) => {
    const {link, Title,hostName,status} = req.body;
    try {
        const oldmeet = await Meet.findOne({link: link, Title:Title});
        if(oldmeet){
            return res.status(209).json({message: "Meeting already exist!"});
        }
        const meet = await Meet.create({
            Title,
            hostName,
            link,
            status
        })
        res.status(200).json({meet, message:"successfully created."});
    } catch (error) {
        return res.status(500).json({error, message: "Internal server error!"});
    }
}

const getMeetings = async (req,res) => {
    try {
        const meet = await Meet.find({});
        res.status(200).json({meet});
    } catch (error) {
        return res.status(500).json({error, message: "Internal server error!"});
    }
}

const updateStatus = async (req,res) => {
    const id = req.params.id;
    const status = req.body.status;
    
    try {
        const meet = await Meet.findByIdAndUpdate(id,{status: status},{
            new: true,
            runValidators: true
        });

        if(!meet){
            return res.status(404).json({message: `Meeting does not exist with ${id}!`});
        }

        
        res.status(200).json({meet, message: "updated successfully."})
    } catch (error) {
        return res.status(500).json({error, message: "Internal server error!"});
    }
}

const deleteMeet = async (req,res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const meet = await Meet.findByIdAndDelete(id);
        if(!meet){
            return res.status(404).json({message: `Meeting does not exist with ${id}!`});
        }
        res.status(200).json({message: "Successfully deleted."})

    } catch (error) {
        return res.status(500).json({error, message: "Internal server error!"});
    }
}
module.exports = {createMeet,getMeetings,updateStatus,deleteMeet}