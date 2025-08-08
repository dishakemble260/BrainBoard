import { Request, Response } from "express";
import { ContentModel } from "../models/content";

 export const addContent = async(req:Request,res:Response) => {
    //@ts-ignore
    const userId = req.user.response._id;

    const {type, link, title, tags} = req.body;

    if(!userId){
        return res.status(403).json({message:"Unauthenticated content added"})
    }

    try {
    await ContentModel.create({
        type,
        title,
        link,
        tags,
        userId :userId
    });
    res.status(200).json({
        message:"Content added successfully"
    })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong, add content again"
        })
    }

}