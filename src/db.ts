import mongoose from "mongoose";
require('dotenv').config();

const password = process.env.MONGO_DB_CONNECTION;

export const connectedToDatabase = async () => {
    try{
        const connection = mongoose.connect(
            `mongodb+srv://harjotsk03:${password}@blossomappcluster.tkfa8t5.mongodb.net/blossom-app?retryWrites=true&w=majority&appName=blossomAppCluster`
        );
        if(connection){
            console.log("connection success")
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

