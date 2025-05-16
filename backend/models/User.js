import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        
        password: {
            type: String,
            required: true,
        },
        role:{
            type:String,
            enum:['admin','student','teacher'],
            required:true,
            
        },
        
        token: {
            type: String,
        },
        // for token expiry time if resetPasswordExpires > date.now() then only user can reset password
        resetPasswordExpires: {
            type: Date,
            default: Date.now ,
        },
            
        
    },
    { timestamps: true }
)

const User = mongoose.model('User',UserSchema);
export default User












