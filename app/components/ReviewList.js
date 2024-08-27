// File: app/components/ReviewList.js
"use client";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available for this course yet.</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Rating: {review.rating}/5</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
