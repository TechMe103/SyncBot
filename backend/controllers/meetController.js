import httpStatus from "http-status";
import { Meeting } from "../models/meetModel";

//add meeting to history
export const addToHistory = async (req , res) => {
    try {
        const userId = req.user.id ; 
        const { meetingCode } = req.body;

        if(!meetingCode) {
            return res.status(httpStatus.BAD_REQUEST).json({ message : "Meeting code is required" });
        } 

        await Meeting.create ( {
            user : userId , 
            meetingCode 
        });

        return res.status(httpStatus.CREATED).json({ message : "Meeting added to history successfully" });
    }
    catch(err) {
        console.log("Add meeting error :" , err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message : "Internal server error. Failed to add meeting history" });
    }
};


//get user meeting history 
export const getUserHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const meetings = await Meeting.find({ user : userId })
        .sort({ createdAt : -1 })
        .select("meetingCode date");

        return res.status(httpStatus.OK).json(meetings);
    }
    catch(err) {
        console.log("Get user history error :" , err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message : "Internal server error. Failed to fetch user history" });
    }
};