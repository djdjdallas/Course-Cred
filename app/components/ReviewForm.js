// File: app/components/ReviewForm.js
"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function ReviewForm({ courseId }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("reviews")
      .insert({ course_id: courseId, rating, content });
    if (error) console.error("Error submitting review:", error);
    else {
      setRating(5);
      setContent("");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <div>
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Review:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}
