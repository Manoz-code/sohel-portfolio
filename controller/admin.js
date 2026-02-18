import Admin from "../model/userModel.js";
import bcrypt from "bcryptjs";

const createAdmin=async()=>{

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);
    const admin =await Admin.create({
        email : process.env.EMAIL,
        password : hashedPassword
    });
}

export default createAdmin