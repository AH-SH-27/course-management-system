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
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          console.log("Excel data:", jsonData);
          setExcelData(jsonData);
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
          <code className="text-white">AAA</code>
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
          <label>Upload Excel</label>
          <Input
            name="banID"
            onChange={handlePersonalDataChange}
            type="text"
            placeholder="Id"
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
          <Input
            name="excelFile"
            onChange={handleChangeFile}
            type="file"
            placeholder="File"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
           <select
            name="department"
            onChange={handlePersonalDataChange}
          >
            <option value="">Select Department</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default ExcelForm;
