import mongoose from "mongoose";

export const connectToDB = () => {
    // connecting to database
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendapi"
    })
        .then((c) => {
            console.log(`Database is connected with ${c.connection.host}`)
        })
        .catch((e) => {
            console.log(e)
        })
} 