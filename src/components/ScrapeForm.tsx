"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { SpinnerCircular } from 'spinners-react';

type Inputs = {
  username: string;
  password: string;
  department: string;
};

async function postData(inputs: Inputs) {
  const res = await fetch("/api/courses", {
    method: "POST",
    body: JSON.stringify(inputs),
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  const result = await res.json();
  return result;
}

function ScrapeForm() {
  const [inputs, setInputs] = React.useState<Inputs>({
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

  const mutation = useMutation(postData, {
    onSuccess: (data) => {
      const { data: responseData, message } = data;

      if (message === "Data retrieved successfully") {
        localStorage.setItem("StudentData", JSON.stringify(responseData));
        toast({
          title: "Great",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Your data was retrieved successfully &#x1F601;</code>
            </pre>
          ),
        });
        router.push("/courseOffering");
      } else {
        console.error("An error occurred:", message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(inputs);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
          <label className="ml-[150px] text-3xl font-bold">Scrape Data</label>
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
            className="p-2 h-10 w-full bg-[#f9f9f9] rounded-sm placeholder:text-muted-foreground"
            onChange={handleChange}
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
          <Button className="w-full" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <SpinnerCircular size={20} color="#ffffff" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default ScrapeForm;
