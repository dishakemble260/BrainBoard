import jwt from "jsonwebtoken";
import { jwt_secret } from "../config";
import { UserModel } from "../models/user";


export const signin = async(req:any ,res:any) => {
    const {username,password} = req.body;

    if(!username){
        return res.status(411).json({message:'Username is required'})
    }
    if(!password){
        return res.status(411).json({message:'Password is required'})
    }

    const response = await UserModel.findOne({username:username});

    if(response?.username == username && response?.password == password){
        const user = {response}
        const generateToken = jwt.sign(user,jwt_secret,{
            expiresIn: "36000m"
        } )
    return res.status(200).json({message:"Login Successful",response,generateToken});
    } 
    else{
        res.status(400).json({message:"Invalid credentials"})
    }

}
