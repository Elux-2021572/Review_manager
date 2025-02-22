import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name category is required"],
        unique: true
    },
    description:{
        type:String,
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Category', categorySchema);