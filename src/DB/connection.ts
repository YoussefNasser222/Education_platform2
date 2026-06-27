import mongoose from "mongoose";

const connectDB = () => {
   mongoose.connect(process.env.DB_URL as string)
   .then(() => {
    console.log("Connected to database successfully");
   })
   .catch((err) => {
    console.log("Error connecting to database", err);
   });  
};
export default connectDB;
