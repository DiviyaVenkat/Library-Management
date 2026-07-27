const express=require("express");

const router=express.Router();

const {reviewController}=require("controller/reviewcontroller");

const verifyToken=require("../middleware/verifyToken");

router.post("/add", verifyToken, reviewController.addReview);

router.get("/average/:bookId", reviewController.getAverageRating);

router.get("/:bookId", reviewController.getReviews);

router.put("/:id", verifyToken, reviewController.updateReview);

router.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports=router;

