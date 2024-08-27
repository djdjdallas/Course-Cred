import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CourseList from "./components/courseList";
import "./globals.css";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: courses } = await supabase.from("total_courses").select("*");

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Course Cred</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/total-courses"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Total Courses
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Submit Review
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-10">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Find, Review, and Compare Trading Courses
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Read honest reviews. Share your experience. Discover courses
                  you can trust.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <form className="flex gap-2 w-full">
                  <Input
                    type="text"
                    placeholder="Search for a course..."
                    className="flex-1"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
            <CourseList courses={courses} />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Customer Reviews
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from real people who have taken these courses and see
                  what they think.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6 bg-background rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center text-2xl">
                    🙂
                  </div>
                  <div>
                    <div className="font-bold">Jane Doe</div>
                    <div className="text-sm text-muted-foreground">
                      Mastering Stock Trading Strategies
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <span className="text-lg font-bold">4.8</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    This course was a game-changer for me. The instructors
                    really know their stuff and the content is top-notch. Highly
                    recommended!
                  </p>
                </div>
              </Card>
              <Card className="p-6 bg-background rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center text-2xl">
                    😊
                  </div>
                  <div>
                    <div className="font-bold">John Smith</div>
                    <div className="text-sm text-muted-foreground">
                      Beginner's Guide to Stock Trading
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <span className="text-lg font-bold">4.7</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    As a complete beginner, this course was exactly what I
                    needed. The step-by-step lessons made it easy to understand
                    the fundamentals of stock trading.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
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
