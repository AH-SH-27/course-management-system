"use client";
import React from "react";

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
    }
  | null[];

type studentDataType =
  | {
      studentPersonalData: {
        banID: string;
        fullName: string;
        bauEmail: string;
        personalEmail: string;
      };
      studentCoursesData: {
        Term: string;
        Course: string;
        Title: string;
        Credits: number;
        Level: string;
        Grade: string;
        SGPA: number;
      }[];
    }
  | undefined;

interface StoredData {
  studentData: any;
  courseOfferingData: any;
}

function page() {
  const getRem = async () => {
    try {
      const storedStudentData = localStorage.getItem("StudentData");
      const storedCourseOfferingData =
        localStorage.getItem("CourseOfferingData");

      const dataa: StoredData = {
        studentData: storedStudentData ? JSON.parse(storedStudentData) : null,
        courseOfferingData: storedCourseOfferingData
          ? JSON.parse(storedCourseOfferingData)
          : null,
      };

      const res: any = await fetch(
        "http://localhost:3000/api/remainingCourses",
        {
          method: "POST",
          body: JSON.stringify(dataa),
        }
      );
      if (!res.ok) {
        throw new Error("Failed!");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return <div>Remaining...</div>;
}

export default page;
