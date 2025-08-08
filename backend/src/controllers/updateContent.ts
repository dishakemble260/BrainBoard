import { Request, Response } from "express";
import { ContentModel } from "../models/content";

export const updateContent = async(req: Request,res: Response) => {

    const {contentId} = req.params;
    const data = req.body;
     
    if(!contentId){
        return res.status(404).json({message: "Content ID not provided"})
    }

    try {
        const updatedData = await ContentModel.findByIdAndUpdate(contentId,data,{new:true});

        if(!updateContent){
            return res.status(404).json({message:"Content not found"});
        }

        return res.status(200).json({
            message:"Content updated successfully",
            data: updatedData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong, try again later"})
    }

}