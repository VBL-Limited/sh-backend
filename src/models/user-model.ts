import uniqueValidator from 'mongoose-unique-validator';
import { model, Schema,Document } from 'mongoose';
import mongoose from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    mobile: string;
    organisation?: string;
    createdAt:Date;
  }

// const OrganisationSchema = new Schema({
//     denomination: {
//         type: String,
//         required: true
//     },
// 	forme_juridique: {
//         type: String,
//         required: true
//     },
// 	state:{  
//         type: String,
//         defualt: 'TRIAL' //- [trial, paid, ....]
//     },
// 	duration: {
//         type: Number,
//         default: 0 // in days
//     }
// });

const UserSchema = new Schema({
    
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        defaut: 'AGENT'
    },
    organisation: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', UserSchema);