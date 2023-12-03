"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
          console.log("Department:", department);
              const fetchData = async () => {
      try {
        const courseOfferingData = await getCourseOfferingData(department);

        if (courseOfferingData !== "Something went wrong!") {
          localStorage.setItem("CourseOfferingData", JSON.stringify(courseOfferingData));
          console.log("Successfully Got Course Offering");
          //router.push("/remC");
        }
      } catch (error) {
        console.error("Error fetching course offering data:", error);

      }
    };

    fetchData();
        }
      }
    }
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const courseOfferingData = await getCourseOfferingData();

  //       if (courseOfferingData !== "Something went wrong!") {
  //         localStorage.setItem("CourseOfferingData", JSON.stringify(courseOfferingData));
  //         console.log("Successfully Got Course Offering");
  //         //router.push("/remC");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching course offering data:", error);

  //     }
  //   };

  //   fetchData();

  // }, []);

  return (
    <div>
      <h1>COURSE OFFERING</h1>
      <Button>CLICK HERE</Button>
    </div>
  );
}

export default page;
