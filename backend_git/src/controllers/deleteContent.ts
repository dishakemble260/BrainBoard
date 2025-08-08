import { Request, Response } from "express";
import { ContentModel } from "../models/content";

export const deleteContent = async(req:Request, res:Response) => {
    const {contentId} = req.params;
    //@ts-ignore
    const userId = req.user.response._id;

    if(!contentId){
        return res.status(400).json({message:'Invalid content to delete'})
    }
    if(!userId){
        return res.status(400).json({message:'Unauthenticated user trying to delete content'})
    }

    try{
        await ContentModel.deleteOne({_id:contentId,userId:userId});
        res.status(200).json({message:"Content deleted successfully"})
    }catch(e){
        res.status(500).json({message:"Something went wrong"})
    } 

}