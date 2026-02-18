import Admin from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginAdmin =async(req,res)=>{
    try {
        const {email,password} = req.body;
        const admin = await Admin.findOne({email});
        if(!admin) return res.status(501).json({message : "Wrong Information"});

       // compare password
       const verify = await bcrypt.compare(password,admin.password);

       if(!verify) return res.status(400).json({message : "Wrong Password"});
      
    //    create token
    const token = jwt.sign({id : admin._id}, process.env.JWT_SECRET,{expiresIn:"1d"});
    res.status(200).json({message : "Sucessfully Login...", token});

    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}




