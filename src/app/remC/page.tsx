"use client";
import React from "react";
import { useEffect } from "react";
import { courseDataType, studentCoursesDataType } from "../types/types";

type remainingCoursesResponseType =
  | {
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
    }[];

type studentDataType = {
  studentPersonalData: {
    banID: string;
    fullName: string;
    bauEmail: string;
    personalEmail: string;
  };
  studentCoursesData: {
    Course: string;
    Credits: number;
    Grade: string;
    Level: string;
    SGPA: number | null;
    Term: string;
    Title: string;
  }[];
};



interface StoredData {
  studentData: studentCoursesDataType;
  courseOfferingData: courseDataType[];
}
const getRemainingCourses = async (data: StoredData) => {
  try {
    const res: any = await fetch("http://localhost:3000/api/remainingCourses", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed!");
    }
    const results = await res.json();
    console.log("results");
    console.log(results);
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStudentData = localStorage.getItem("StudentData");
      const storedCourseOfferingData =
        localStorage.getItem("CourseOfferingData");

      if (storedStudentData != null && storedCourseOfferingData != null) {
        const parsedStudentData: studentDataType = JSON.parse(storedStudentData);
        const parsedCourseOfferingData: courseDataType[] = JSON.parse(storedCourseOfferingData);
        const data: StoredData = {
          studentData: parsedStudentData.studentCoursesData,
          courseOfferingData: parsedCourseOfferingData,
        };

        console.log("data.studentData");
        console.log(data.studentData);
        // console.log("data.courseOfferingData");
        // console.log(data.courseOfferingData);

        const sendData = async () => {
          try {
            const remainCourses = await getRemainingCourses(data);
            console.log("remainCourses");
            console.log(remainCourses);
          } catch (err) {
            console.log("ERROR Happen while sending data! ", err);
          }
        };
        sendData();
      }
    }
  }, []);

  return <div>Remaining...</div>;
}

export default page;
