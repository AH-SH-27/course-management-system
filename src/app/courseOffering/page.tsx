"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SpinnerDotted } from 'spinners-react';

const getCourseOfferingData = async (department: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/courseOffering", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department }), // Send department as an object
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API error");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


function page() {
  
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const studentData = localStorage.getItem("StudentData");
      if (studentData != null) {
        const parsedStudentData = JSON.parse(studentData);
        if (
          parsedStudentData.studentPersonalData &&
          parsedStudentData.studentPersonalData.department
        ) {
          const department = parsedStudentData.studentPersonalData.department;
          
              const fetchData = async () => {
      try {
        setLoading(true);
        const courseOfferingData = await getCourseOfferingData(department);

        if (courseOfferingData !== "Something went wrong!") {
          localStorage.setItem("CourseOfferingData", JSON.stringify(courseOfferingData));
          router.push("/remain_courses");
        }
      } catch (error) {
        setLoading(false)
        console.error("Error fetching course offering data:", error);

      }
    };

    fetchData();
        }
      }
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Please wait while we load your course offering</h1>
      <h2 className="text-xl mb-8">When finished, you will be directed automatically</h2>
      <h2 className="text-md mb-8">It may take a while</h2>
      <div>
        {loading ? (
          <SpinnerDotted size={120} color="#131a33" />
        ) : (
          <h1 className="text-2xl text-red-500">Something went wrong. Please close the page &#x1F613;</h1>
        )}
      </div>
    </div>
  );
}

export default page;
