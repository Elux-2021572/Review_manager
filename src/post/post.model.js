import { Schema, model } from "mongoose";

const postSchema = new Schema({
    name: {  
        type: String,
        required: [true, "Post name is required."],  
        maxLength: [100, "The name of the publication cannot exceed 100 characters."], 
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    textPublication: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model('Post', postSchema);