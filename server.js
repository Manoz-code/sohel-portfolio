import dotenv from "./config/dotenv.js";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors"
import createAdmin from "./controller/admin.js"
import router from "./routes/adminRouter.js"

// connect to database
connectDB();
await createAdmin();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json())
app.use(cors());
app.use("/auth/api", router)


app.listen(PORT,()=>console.log("server is running..."))
