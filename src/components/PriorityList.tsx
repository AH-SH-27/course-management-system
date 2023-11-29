"use client"
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
//import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/priorityList", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed!");
//   }
//   return res.json();
// };

 // const data: tesCoursesListType = await getData();
  // if (!data) {
  //   console.log("no data: " + data);
  // } else {
  //   console.log(data);
  // }

type tesCoursesListType = {
  crn: string;
  name: string;
  credits: number;

}[];

var tesCoursesList:tesCoursesListType = [
  {
    crn: "1234",
    name: "COMP1",
    credits: 3,

  },
  {
    crn: "5678",
    name: "COMP2",
    credits: 3,

  },
  {
    crn: "1122",
    name: "COMP3",
    credits: 2,

  },
  {
    crn: "1551",
    name: "COMP4",
    credits: 3,

  },
  {
    crn: "2233",
    name: "COMP5",
    credits: 3,
  },
];

const PriorityList = () => {

  const [checkedCourses, setCheckedCourses] = useState(new Array(tesCoursesList.length).fill(false));

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedCourses = [...checkedCourses];
    updatedCheckedCourses[index] = !updatedCheckedCourses[index];
    setCheckedCourses(updatedCheckedCourses);
  };
  
  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const checkedCoursesList = tesCoursesList.filter((course, index) => checkedCourses[index]);
    toast({
      title: "Great",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">GREAT!!!</code>
        </pre>
      ),
    });
      const storedData = sessionStorage.setItem(
          "studentCoursesCheckedCourses",
          JSON.stringify(checkedCoursesList)
        );
  // console.log("Checked Courses: ");
  // console.log(checkedCoursesList);
  }

  return (
    <>
      <h1>hello</h1>
      <form method="POST" onSubmit={onSubmit}>
        <div className="flex gap-2 bg-red">
          {tesCoursesList.map((course, index) => (
            <Card className="w-[400px]" key={index}>
              <CardTitle >{course.name}</CardTitle>
              <CardHeader>{course.credits}</CardHeader>
              <CardContent>
                <p >{course.crn}</p>
                <input checked={checkedCourses[index]} type="checkbox" onChange={() => handleCheckboxChange(index)} />
              </CardContent>
              <CardDescription>Description</CardDescription>
              <CardFooter>FOOTER</CardFooter>
            </Card>
          ))}
        </div>
        <div>
          
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default PriorityList;
