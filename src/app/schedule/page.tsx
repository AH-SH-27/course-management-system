"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useState } from "react";
import { SpinnerDotted } from "spinners-react";

type Course = {
  campus: string;
  crn: string;
  code: string;
  name: string;
  letter: string;
  credits: string;
  type: string;
  days: string;
  times: string;
  bldg: string;
  class: string;
  dr: string;
  capacity: string;
  otherMajor: string;
  major: string;
  courseType: string;
};

type ScheduleItem = Course;

function page() {
  const [remainingCourses, setRemainingCourses] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const localStorageRemainingCourses = JSON.parse(
      localStorage.getItem("RemainingCourses&Credits")!
    );
    const localStorageSelectedCourses: Course[] = JSON.parse(
      localStorage.getItem("StudentCoursesCheckedCourses")!
    );
    const results: Course[] = localStorageRemainingCourses.results;
    console.log(localStorageRemainingCourses);
    console.log(localStorageSelectedCourses);

    const remainingResults: Course[] = localStorageRemainingCourses.results;

    const selectedCoursesMap = new Map<string, Course>();

    localStorageSelectedCourses.forEach((course) => {
      selectedCoursesMap.set(course.crn, course);
    });

    remainingResults.forEach((course) => {
      if (!selectedCoursesMap.has(course.crn)) {
        selectedCoursesMap.set(course.crn, course);
      }
    });

    const prioritizedCourses = Array.from(selectedCoursesMap.values());

    const output = {
      results: prioritizedCourses,
      totalCreditsByCategories:
        localStorageRemainingCourses.totalCreditsByCategories,
    };

    let schedule: ScheduleItem[] = [];
    let addedCRNs: Set<string> = new Set();

    function addCourse(course: Course): void {
      if (!hasCourse(course)) {
        schedule.push(course);
        console.log(`Added ${course.name} to the schedule`);
      } else {
        console.log(`Course ${course.name} not added due to conflicts.`);
      }
    }

    function hasCourse(newCourse: Course): boolean {
      return schedule.some(
        (existingCourse) =>
          existingCourse.name === newCourse.name ||
          existingCourse.code === newCourse.code
      );
    }

    function hasConflictForCRN(crn: string): boolean {
      return schedule.some((existingCourse) =>
        hasOverlap(existingCourse.times, crn)
      );
    }

    function hasConflictForAnyCRN(crns: string | string[]): boolean {
      const crnsArray = Array.isArray(crns) ? crns : [crns];

      return crnsArray.some((crn) => hasConflictForCRN(crn));
    }

    function hasOverlap(existingTime: string, newTime: string): boolean {
      if (!existingTime || !newTime) {
        return false;
      }

      const [existingStartTime, existingEndTime] = existingTime
        .split(" - ")
        .map((time) => parseInt(time));
      const [newStartTime, newEndTime] = newTime
        .split(" - ")
        .map((time) => parseInt(time));

      return (
        (newStartTime > existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime < existingEndTime) ||
        (newStartTime < existingStartTime && newEndTime > existingEndTime)
      );
    }

    prioritizedCourses.forEach((course) => {
      if (Array.isArray(course.crn)) {
        let selectedCRN = course.crn[0];
        addCourse({ ...course, crn: selectedCRN });
      } else {
        addCourse(course);
      }
    });

    // console.log("Courses added to the schedule:");
    // schedule.forEach((course) => {
    //   console.log(
    //     `- ${course.name} (CRN: ${course.crn}, Time: ${course.times})`
    //   );
    // });
    setLoading(false);
    localStorage.setItem("Schedule", JSON.stringify(schedule));
    setSchedule(schedule);
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem("StudentData");
    localStorage.removeItem("CourseOfferingData");
    localStorage.removeItem("StudentCoursesCheckedCourses");
    localStorage.removeItem("RemainingCourses&Credits");
    localStorage.removeItem("RemainingCourses&Credits");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Simulate an API call (replace this with your actual API call)
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      });

      // Handle the response (you may want to check for success or handle errors)
      console.log("API response:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <SpinnerDotted size={120} color="#131a33" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <p className="text-red-500 text-4xl font-bold">
        Sorry, Something went wrong! &#x1F613;
      </p>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col gap-9 p-8">
        <h1 className="text-2xl font-bold">Your Schedule</h1>
        <div className="flex justify-between">
          <ul className="space-y-4">
            {schedule.map((course) => (
              <li key={course.crn} className="border p-4 rounded-md">
                <strong>{course.name}</strong> - {course.code}
                <br />
                <span className="text-sm text-gray-700">
                  Campus: {course.campus}
                </span>
                <br />
                <span className="text-sm text-gray-700">CRN: {course.crn}</span>
                <br />
                <span className="text-sm text-gray-700">
                  Doctor: {course.dr}
                </span>
                <br />
              </li>
            ))}
          </ul>
        </div>
        <form className="flex flex-row-reverse" onSubmit={handleSubmit}>
          <Button
            type="submit"
            className="px-4 py-2"
            style={{ width: "120px" }}
          >
            Submit
          </Button>
        </form>
        <form className="flex flex-row-reverse" onSubmit={clearLocalStorage}>
          <Button
            type="submit"
            className="px-4 py-2"
            style={{ width: "120px" }}
          >
            Clear Data
          </Button>
        </form>
      </div>
    </div>
  );
}

export default page;
