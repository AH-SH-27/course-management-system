import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import  ExcelForm  from "@/components/ExcelForm"
import  ScrapeForm  from "@/components/ScrapeForm"

function GetCoursesPage() {
  // const router = useRouter();


  //  const storedData = sessionStorage.setItem(
  //         "studentCoursesDataNew",
  //         JSON.stringify(studentDataFromExcel)
  //       );

  
  // Retrieve student data from local storage
  // const storedData = localStorage.getItem("studentCoursesData");

  // if (storedData) {
  //   // Parse the JSON data
  //   const studentData = JSON.parse(storedData);
  //   console.log("session data: ");
  //   console.log(studentData);
  // }



  return (
    <>
      <div className="flex items-center justify-center h-screen">
      <label>Student Data</label>
      <ExcelForm></ExcelForm>
      <ScrapeForm />
      </div>
    </>
  );
}

export default GetCoursesPage;
