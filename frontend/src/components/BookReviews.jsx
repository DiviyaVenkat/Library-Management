import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Server_URL } from "../utils/config";

export default function BookReviews({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const token = localStorage.getItem("authToken");

  const loadReviews = async () => {
    try {
      const res = await axios.get(
        `${Server_URL}reviews/${bookId}`
      );

      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [bookId]);

  const submitReview = async () => {
    try {
      const res = await axios.post(
        `${Server_URL}reviews/add`,
        {
          bookId,
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setReview("");
      setRating(5);

      loadReviews();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="review-section">

      <h2>Book Reviews</h2>

      <div className="rating-stars">
        {[...Array(5)].map((star, index) => {

          const current = index + 1;

          return (
            <FaStar
              key={index}
              size={30}
              color={
                current <= (hover || rating)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => setHover(current)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(current)}
              style={{
                cursor: "pointer",
                marginRight: 5,
              }}
            />
          );
        })}
      </div>

      <textarea
        rows={4}
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <br />

      <button onClick={submitReview}>
        Submit Review
      </button>

      <hr />

      {reviews.length === 0 ? (
        <p>No Reviews Yet</p>
      ) : (
        reviews.map((item) => (
          <div
            key={item._id}
            className="review-card"
          >
            <h4>{item.userId.name}</h4>

            <div>

              {[...Array(item.rating)].map((_, i) => (
                <FaStar
                  key={i}
                  color="gold"
                />
              ))}

            </div>

            <p>{item.review}</p>

          </div>
        ))
      )}

    </div>
  );
}

const [average, setAverage] = useState({
    averageRating:0,
    totalReviews:0
});

const loadAverage=async()=>{

const res=await axios.get(
`${Server_URL}reviews/average/${bookId}`
);

setAverage(res.data);

}

useEffect(()=>{

loadReviews();

loadAverage();

},[bookId]);

<h3>

⭐ {average.averageRating?.toFixed(1)}

({average.totalReviews} Reviews)

</h3>