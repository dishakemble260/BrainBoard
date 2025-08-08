import { UserModel } from "../models/user";

const Signup = async(req : any , res: any) => {

    interface User {
        username : string,
        password : string
    }

    const {username,password} : User = req.body;

    if(!username){
      return  res
        .status(411)
        .json({
            "message" : "Username is required."
        })
    }

    if(!password){
    return res
    .status(411)
    .json({
        message : "Password is required."
    })
    }

    const usernameExists = await UserModel.findOne({username: username});

    if(usernameExists){
       return res.status(403).json({message: "Username already exists"})
    }
    
    await UserModel.create({
        username:username,
        password:password
    })
    res.status(200).json({message:"User signed up successfully"})

}

export default Signup;