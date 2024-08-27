"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import "/Users/dominickhill/trustpilot/coursecred/app/globals.css";
export default function TotalCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase.from("total_courses").select("*");
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
      }
    }
    fetchCourses();
  }, [supabase]);

  const filteredCourses = courses
    .filter((course) => {
      if (
        filterDifficulty !== "all" &&
        course.course_level !== filterDifficulty
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.course_price - b.course_price;
      if (sortBy === "price-desc") return b.course_price - a.course_price;
      if (sortBy === "rating-asc") return a.course_rating - b.course_rating;
      if (sortBy === "rating-desc") return b.course_rating - a.course_rating;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      <div className="flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">All Stock Trading Courses</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={course.course_image}
                alt={course.course_name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{course.course_name}</h3>
                <p className="text-muted-foreground mb-4">
                  {course.course_description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.course_level}
                  </span>
                  <Link
                    href={course.course_link}
                    className="text-primary hover:text-primary-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-medium">
                    ${course.course_price}
                  </span>
                  <span className="text-sm font-medium">
                    Rating: {course.course_rating}/5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-64 bg-background rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sort-by">Sort By</Label>
            <Select id="sort-by" value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              id="difficulty"
              value={filterDifficulty}
              onValueChange={setFilterDifficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="All Levels">All Levels</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
