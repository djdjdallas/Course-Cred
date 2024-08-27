import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";

export default async function CoursePage({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: course, error: courseError } = await supabase
    .from("total_courses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (courseError) {
    console.error("Error fetching course:", courseError);
    return <div>Error loading course. Please try again later.</div>;
  }

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .eq("course_id", params.id);

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
    return <div>Error loading reviews. Please try again later.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.course_name}</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Details</h2>
        <ul>
          <li>Rating: {course.course_rating}/5</li>
          <li>Total Reviews: {course.total_num_of_revs}</li>
          <li>Course Duration: {course.total_course_time}</li>
          <li>Price: ${course.course_price}</li>
          <li>Instructor: {course.course_instructor}</li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{course.course_description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Link</h2>
        <a
          href={course.course_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on Udemy
        </a>
      </div>
      <ReviewList reviews={reviews} />
      <ReviewForm courseId={params.id} />
    </div>
  );
}
