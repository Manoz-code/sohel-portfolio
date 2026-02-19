import Admin from "../model/userModel.js";
import bcrypt from "bcryptjs";

const createAdmin=async()=>{

      // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.EMAIL });
    if (existingAdmin) {
      console.log("✅ Admin already exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);
    const admin =await Admin.create({
        email : process.env.EMAIL,
        password : hashedPassword
    });
}

export default createAdmin