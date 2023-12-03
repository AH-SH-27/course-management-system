import React from "react";
import  ExcelForm  from "@/components/ExcelForm"
import  ScrapeForm  from "@/components/ScrapeForm"

function GetCoursesPage() {

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
