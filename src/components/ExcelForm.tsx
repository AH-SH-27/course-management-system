"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import XLSX from "xlsx";
import { useRouter } from "next/navigation";

type PersonalInfoType = {
  banID: string;
  bauEmail: string;
  fullName: string;
  personalEmail: string;
  department: string;
};

function ExcelForm() {
  const formData = new FormData();
  const [file, setFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    banID: "",
    bauEmail: "",
    fullName: "",
    personalEmail: "",
    department:"",
  });
  const studentDataFromExcel = {
    studentCoursesData: excelData,
    studentPersonalData: personalInfo,
  };

  console.log(studentDataFromExcel);
  const router = useRouter();
  
  const handlePersonalDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setPersonalInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = (target.files as FileList)[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;

        if (data) {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData: { Term: string }[] = XLSX.utils.sheet_to_json(sheet);

          // Filter out courses with the specified term
          const filteredData = jsonData.filter(
            (item) => !item.Term.includes("Lebanese baccalaureate or Eqv.")
          );
          console.log("Excel data:", filteredData);
          setExcelData(filteredData);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    toast({
      title: "Great",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Your data was retrieved successfully &#x1F601;</code>
        </pre>
      ),
    });
    localStorage.setItem(
      "StudentData",
      JSON.stringify(studentDataFromExcel)
    );
    router.push("/courseOffering");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
          <label className="ml-[150px] text-3xl font-bold">Upload Excel</label>
          <Input
            name="banID"
            onChange={handlePersonalDataChange}
            type="text"
            placeholder="Id"
            className=""
          />
          <Input
            name="bauEmail"
            onChange={handlePersonalDataChange}
            type="text"
            placeholder="BAU email"
          />
          <Input
            name="fullName"
            onChange={handlePersonalDataChange}
            type="text"
            placeholder="Full name"
          />
          <Input
            name="personalEmail"
            onChange={handlePersonalDataChange}
            type="text"
            placeholder="Personal email"
          />
          <select
            name="department"
            className="p-2 h-10 w-full bg-[#f9f9f9] rounded-sm placeholder:text-muted-foreground"
            onChange={handlePersonalDataChange}
          >
            <option className="flex p-3 m-2 " value="">Select Department</option>
            <option className="flex p-3 m-2 " value="Computer Engineering">Computer Engineering</option>
            <option className="flex p-3 m-2 " value="Civil Engineering">Civil Engineering</option>
            <option className="flex p-3 m-2 " value="Mechanical Engineering">Mechanical Engineering</option>
            <option className="flex p-3 m-2 " value="Mechanical Engineering">Electric Power & Machines</option>
            <option className="flex p-3 m-2 " value="Mechanical Engineering">Chemical Engineering</option>
            <option className="flex p-3 m-2 " value="Mechanical Engineering">Biomedical Engineering</option>
            <option className="flex p-3 m-2 " value="Mechanical Engineering">Communication & Electronics</option>
            <option className="flex p-3 m-2 " value="Mechanical Engineering">Industrial Engineering</option>
          </select>
          <Input
            name="excelFile"
            onChange={handleChangeFile}
            type="file"
            placeholder="File"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
           
          <Button className="w-full" type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default ExcelForm;
