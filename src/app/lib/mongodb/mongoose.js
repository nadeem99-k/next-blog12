import mongoose from "mongoose";

let initialized = false;

export const connect = async() =>{
   mongoose.set(`strictQuery`, true);
   if(initialized){
    console.log('Already connected to MongoDB');
    
    return;
   }try{
        mongoose.connect(process.env.MONGODB_URI, {
     dbName: 'next-blog', 
     useNewUrlParser: true,
     useUnifiedTopology: true,

        });
        console.log('connected to MongoDB');

        initialized = true;
        
   }catch (error){
console.log('Error connecting to MongoDB:', error);


}}
