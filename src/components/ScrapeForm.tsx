"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  username: string;
  password: string;
  department: string;
};

function ScrapeForm() {
  const [inputs, setInputs] = useState<Inputs>({
    username: "",
    password: "",
    department: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        //body: JSON.stringify({ ...inputs, formData }),
        body: JSON.stringify(inputs),
      });
      if (!res.ok) {
        throw new Error("Failed!");
      }

      const result = await res.json();
      const { data, message } = result;

      if (message === "Data retrieved successfully") {

        localStorage.setItem("StudentData", JSON.stringify(data));
        toast({
          title: "Great",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">AAA</code>
            </pre>
          ),
        });
        router.push("/courseOffering");
      } else {
        console.error("An error occurred:", message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
          <label>Scrape Data</label>
          <Input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Username"
          />
          <Input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
           <select
            name="department"
            value={inputs.department}
            onChange={handleChange}
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

export default ScrapeForm;
