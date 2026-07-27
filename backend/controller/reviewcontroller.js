const { ReviewModel } = require("../model/ReviewModel");
const { BorrowModel } = require("../model/BorrowModel");

const reviewController = {};
reviewController.addReview = async(req,res)=>{

try{

const userId=req.userInfo.id;
const {bookId,rating,review}=req.body;

const borrow=await BorrowModel.findOne({
    userId,
    bookId,
    status:"Returned"
});

if(!borrow){
    return res.status(400).json({
        error:true,
        message:"You can review only returned books."
    });
}

const exists=await ReviewModel.findOne({
    userId,
    bookId
});

if(exists){
    return res.status(400).json({
        error:true,
        message:"You already reviewed this book."
    });
}

const newReview=new ReviewModel({
    bookId,
    userId,
    rating,
    review
});

await newReview.save();

res.json({
    error:false,
    message:"Review added successfully",
    review:newReview
});

}
catch(err){

console.log(err);

res.status(500).json({
    error:true,
    message:"Server Error"
});

}

};

reviewController.getReviews=async(req,res)=>{

try{

const reviews=await ReviewModel.find({
    bookId:req.params.bookId
})
.populate("userId","name")
.sort({
    createdAt:-1
});

res.json({
    error:false,
    reviews
});

}
catch(err){

res.status(500).json({
    error:true,
    message:"Server Error"
});

}

};

reviewController.updateReview=async(req,res)=>{

try{

const review=await ReviewModel.findById(req.params.id);

if(!review){

return res.status(404).json({
    error:true,
    message:"Review not found"
});

}

if(review.userId.toString()!=req.userInfo.id){

return res.status(403).json({
    error:true,
    message:"Unauthorized"
});

}

review.rating=req.body.rating;
review.review=req.body.review;

await review.save();

res.json({
    error:false,
    message:"Review updated successfully"
});

}
catch(err){

res.status(500).json({
    error:true,
    message:"Server Error"
});

}

};

reviewController.deleteReview=async(req,res)=>{

try{

const review=await ReviewModel.findById(req.params.id);

if(!review){

return res.status(404).json({
    error:true,
    message:"Review not found"
});

}

if(review.userId.toString()!=req.userInfo.id){

return res.status(403).json({
    error:true,
    message:"Unauthorized"
});

}

await ReviewModel.findByIdAndDelete(req.params.id);

res.json({
    error:false,
    message:"Review deleted successfully"
});

}
catch(err){

res.status(500).json({
    error:true,
    message:"Server Error"
});

}

};

reviewController.getAverageRating=async(req,res)=>{

try{

const mongoose=require("mongoose");

const result=await ReviewModel.aggregate([

{
$match:{
bookId:new mongoose.Types.ObjectId(req.params.bookId)
}
},

{
$group:{
_id:null,
averageRating:{
$avg:"$rating"
},
totalReviews:{
$sum:1
}
}

}

]);

res.json(result[0] || {

averageRating:0,
totalReviews:0

});

}
catch(err){

res.status(500).json({
message:"Server Error"
});

}

};
module.exports={reviewController};