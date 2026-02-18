import mongoose from "mongoose";

const connectDB = async()=>{
   try {
     await mongoose.connect(process.env.MONGO_STRING,{
      useNewUrlParser: true,
      useUnifiedTopology : true,
     });
    console.log("connected to database...");
    mongoose.set("debug",true);
   } catch (error) {
     console.log(error.message);
     process.exit(1);
   }
}

// handle disconnects
mongoose.connection.on("disconnected",()=>{
  console.warn("MongoDB disconnected")
})

// Optional: handle connection errors after initial connect
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
export default connectDB