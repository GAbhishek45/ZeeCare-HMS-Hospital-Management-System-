import mongoose from 'mongoose';

export const dbConnection = async()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT_SYSTEM"
    })
    .then(()=>console.log("DB Connection successfully"))
    .catch((err)=>console.log(`DB connection error ${err}`))
}