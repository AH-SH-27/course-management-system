"use client";
import React from "react";
import { useEffect, useState } from "react";
import { courseDataType, studentCoursesDataType } from "../types/types";
import { useMutation } from "react-query";
import { Flat } from "@alptugidin/react-circular-progress-bar";
import { RemainingCoursesType } from "../types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import PriorityList from "@/components/PriorityList";
import { SpinnerDotted } from "spinners-react";

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



function remainingCoursesPage() {

  const [remainingCoursesArray, setRemainingCoursesArray ] = useState([]);

  if (typeof window !== "undefined") {
    const storedStudentData = localStorage.getItem("StudentData");
    const storedCourseOfferingData = localStorage.getItem("CourseOfferingData");

    if (storedStudentData != null && storedCourseOfferingData != null) {
      const parsedStudentData: studentDataType = JSON.parse(storedStudentData);
      const parsedCourseOfferingData: courseDataType[] = JSON.parse(storedCourseOfferingData);
      const data: StoredData = {
        studentData: parsedStudentData.studentCoursesData,
        courseOfferingData: parsedCourseOfferingData,
      };

      const { mutate, isLoading, isError } = useMutation(
        async () => {
          try {
            const res = await fetch("http://localhost:3000/api/remainingCourses", {
              method: "POST",
              body: JSON.stringify(data),
            });

            if (!res.ok) {
              throw new Error("Failed!");
            }

            const results = await res.json();
            return results;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
        {
          onSuccess: (results) => {
            console.log("results CLIENT------------")
            console.log(results)
            localStorage.setItem("RemainingCourses&Credits", JSON.stringify(results))
          },
        }
      );

      // Call the mutate function to trigger the mutation
      useEffect(() => {
        mutate();
      }, []);

      if (isLoading) {
        return <div className="flex flex-col justify-center items-center h-screen w-full">
        <SpinnerDotted size={120} color="#131a33" />
      </div>;
      }

      if (isError) {
        return <div className="flex flex-col justify-center items-center h-screen w-full">
          <h1 className="text-2xl text-red-500">Oops! Something went wrong. Failed to retrieve data. &#x1F613;</h1>
      </div>;
      }
    }
  }

  const remainingCoursesData = localStorage.getItem("RemainingCourses&Credits")
  if(remainingCoursesData != null){
    const parsedRemainingCoursesData: RemainingCoursesType = JSON.parse(remainingCoursesData)
    if(!parsedRemainingCoursesData){
      console.log("Something wrong!");
    }

    if (!parsedRemainingCoursesData || !parsedRemainingCoursesData.results || parsedRemainingCoursesData.results.length === 0) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="text-red-500 text-4xl font-bold">Sorry, couldn't load your data. &#x1F613;</p>
        </div>
      );
    }

  return (
  <div className="bg-white">
    <div>
    <h1 className="text-4xl font-bold mb-4 mt-5 text-center">
    <span className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-transparent bg-clip-text">
  Remaining Courses
</span>

</h1>

    <div className="flex my-5 p-2 justify-center gap-[50px]">

      <div className="w-40">
  
        {        
          <Flat
            progress={parsedRemainingCoursesData.totalCreditsByCategories.AllTakenCourses}
            range={{ from: 0, to: 150 }}
            sign={{ value: "/150", position: "end" }}
            text={"Finished"}
            showMiniCircle={false}
            showValue={true}
            sx={{
              strokeColor: "#ff0000",
              barWidth: 5,
              bgStrokeColor: "#f2f2f2",
              bgColor: { value: "#000000", transparency: "20" },
              shape: "full",
              strokeLinecap: "round",
              valueSize: 13,
              valueWeight: "bold",
              valueColor: "#000000",
              valueFamily: "Trebuchet MS",
              textSize: 13,
              textWeight: "bold",
              textColor: "#000000",
              textFamily: "Trebuchet MS",
              loadingTime: 1000,
              miniCircleColor: "#ff0000",
              miniCircleSize: 5,
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
          }
      </div>
      <div className="w-40">
        
        {        
          <Flat
            progress={parsedRemainingCoursesData.totalCreditsByCategories.CECore}
            range={{ from: 0, to: 74 }}
            sign={{ value: "/74", position: "end" }}
            text={"CE Core"}
            showMiniCircle={false}
            showValue={true}
            sx={{
              strokeColor: "#ff0000",
              barWidth: 5,
              bgStrokeColor: "#ffffff",
              bgColor: { value: "#000000", transparency: "20" },
              shape: "full",
              strokeLinecap: "round",
              valueSize: 13,
              valueWeight: "bold",
              valueColor: "#000000",
              valueFamily: "Trebuchet MS",
              textSize: 13,
              textWeight: "bold",
              textColor: "#000000",
              textFamily: "Trebuchet MS",
              loadingTime: 1000,
              miniCircleColor: "#ff0000",
              miniCircleSize: 5,
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
          }
      </div>
      <div className="w-40">
        
        {        
          <Flat
            progress={parsedRemainingCoursesData.totalCreditsByCategories.GNR}
            range={{ from: 0, to: 56 }}
            sign={{ value: "/56", position: "end" }}
            text={"G. Eng. Courses"}
            showMiniCircle={false}
            showValue={true}
            sx={{
              strokeColor: "#ff0000",
              barWidth: 5,
              bgStrokeColor: "#ffffff",
              bgColor: { value: "#000000", transparency: "20" },
              shape: "full",
              strokeLinecap: "round",
              valueSize: 12,
              valueWeight: "bold",
              valueColor: "#000000",
              valueFamily: "Trebuchet MS",
              textSize: 12,
              textWeight: "bold",
              textColor: "#000000",
              textFamily: "Trebuchet MS",
              loadingTime: 1000,
              miniCircleColor: "#ff0000",
              miniCircleSize: 5,
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
          }
      </div>
      <div className="w-40">
        
        {        
          <Flat
            progress={parsedRemainingCoursesData.totalCreditsByCategories.GeneralElective}
            range={{ from: 0, to: 8 }}
            sign={{ value: "/8", position: "end" }}
            text={"General Courses"}
            showMiniCircle={false}
            showValue={true}
            sx={{
              strokeColor: "#ff0000",
              barWidth: 5,
              bgStrokeColor: "#ffffff",
              bgColor: { value: "#000000", transparency: "20" },
              shape: "full",
              strokeLinecap: "round",
              valueSize: 12,
              valueWeight: "bold",
              valueColor: "#000000",
              valueFamily: "Trebuchet MS",
              textSize: 12,
              textWeight: "bold",
              textColor: "#000000",
              textFamily: "Trebuchet MS",
              loadingTime: 1000,
              miniCircleColor: "#ff0000",
              miniCircleSize: 5,
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
          }
      </div>
      <div className="w-40">
        
        {        
          <Flat
            progress={parsedRemainingCoursesData.totalCreditsByCategories.TechnicalElective}
            range={{ from: 0, to: 12 }}
            sign={{ value: "/12", position: "end" }}
            text={"Tech. Courses"}
            showMiniCircle={false}
            showValue={true}
            sx={{
              strokeColor: "#ff0000",
              barWidth: 5,
              bgStrokeColor: "#ffffff",
              bgColor: { value: "#000000", transparency: "20" },
              shape: "full",
              strokeLinecap: "round",
              valueSize: 13,
              valueWeight: "bold",
              valueColor: "#000000",
              valueFamily: "Trebuchet MS",
              textSize: 13,
              textWeight: "bold",
              textColor: "#000000",
              textFamily: "Trebuchet MS",
              loadingTime: 1000,
              miniCircleColor: "#ff0000",
              miniCircleSize: 5,
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
          }
      </div>  
      </div>
      <div className="mt-[60px]">
      <PriorityList remainingCoursesList={parsedRemainingCoursesData.results} />
      </div>
    </div>
  </div>
  );
}
}

export default remainingCoursesPage;
