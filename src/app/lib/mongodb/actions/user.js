import User from "../models/user.model";

import { connect  } from '../mongodb/mongoose'

export const createOrupdateUser = async(
    id,
    first_name,
    last_name,
    image_url,
    eamil_addresses,
    username) => {
        try{
           await connect();
           const user = await User.findOneAndUpdate(
             {clerkId: id },
             {
                 $set:{
                    firstName: first_name,
                     lastName: last_name,
                     profilePicture: image_url,
                     email: eamil_addresses[0].eamil_addresses,
                     username,
                 },
             }, {new: true, upsert: true} 
            );
            return user;
        }catch (error){
           console.log('Error creating or updating user:', error);
           
        }
    };

export const deleteUser = async (id) => {
    try{
        await connect();
        await User.findOneAndDelete({ clerkId: Id });
    }catch (error){
        console.log('Error deleting user:', error);
        
    }
};
