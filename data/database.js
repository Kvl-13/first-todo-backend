import mongoose from "mongoose";

export const connectToDB = () => {
    // connecting to database
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendapi"
    })
        .then(() => {
            console.log("Database is connected successfully")
        })
        .catch((e) => {
            console.log(e)
        })
} 