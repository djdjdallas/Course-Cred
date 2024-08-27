"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CourseList({ courses }) {
  if (!courses || courses.length === 0) {
    return <p>No courses available at the moment.</p>;
  }

  // Function to render a single course card
  const renderCourseCard = (course, badge) => (
    <Card key={course.id} className="p-6 bg-background rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 fill-primary" />
          <span className="text-lg font-bold">{course.course_rating}</span>
        </div>
        {badge && <Badge variant="secondary">{badge}</Badge>}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">{course.course_name}</h3>
        <p className="text-muted-foreground mt-2">
          {course.course_description}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {course.total_num_of_revs} reviews
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          View Course
        </Link>
      </div>
    </Card>
  );

  // Sort courses by rating (descending) and review count
  const sortedCourses = [...courses].sort((a, b) => {
    if (b.course_rating !== a.course_rating)
      return b.course_rating - a.course_rating;
    return b.total_num_of_revs - a.total_num_of_revs;
  });

  const featuredCourses = sortedCourses.slice(0, 3);
  const topRatedCourses = sortedCourses.slice(3, 6);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-12">
      <div>
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
          Featured Courses
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) =>
            renderCourseCard(
              course,
              index === 0 ? "Best Seller" : index === 1 ? "Popular" : "New"
            )
          )}
        </div>
      </div>
      <div>
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
          Top Rated Courses
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedCourses.map((course, index) =>
            renderCourseCard(
              course,
              index === 0
                ? "Top Pick"
                : index === 1
                ? "Editor's Pick"
                : "Trending"
            )
          )}
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
