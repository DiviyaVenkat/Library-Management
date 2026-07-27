import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
{
    bookId:{
        type:Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    review:{
        type:String,
        required:true,
        trim:true
    }

},
{
    timestamps:true
});

const ReviewModel = model("Review",ReviewSchema);

export default{ReviewModel};