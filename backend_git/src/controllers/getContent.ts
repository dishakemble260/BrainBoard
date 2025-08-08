import { Request, Response } from "express";
import { ContentModel } from "../models/content";

export const getContent = async(req:Request,res:Response) => {
    //@ts-ignore
    const userId = req.user.response._id;

    const {type} = req.params;

    if(!userId) {
        return res.status(401).json({message:"Invalid user"})
    }


    try {
        if(!type){
           const response = await ContentModel.find({userId : userId});
           return  res.status(200).json({response});
        }else {
            const response = await ContentModel.find({userId : userId, type: type});
            return  res.status(200).json({response});
        }
         

    } catch (error) {
        res.status(500).json({message:"Failed to fetch content"})
    }
   
}