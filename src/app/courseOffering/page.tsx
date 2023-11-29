import { Button } from "@/components/ui/button";
import React from "react";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/courseOffering", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed!");
    }
    const data = await res.json();
   
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

async function page() {
  const gdata = await getData();

  return (
    <div>
      <h1>COURSE OFFERING</h1>
      <Button>CLICK HERE</Button>
    </div>
  );
}

export default page;
