"use client"
import React from "react";
import ExcelForm from "@/components/ExcelForm";
import ScrapeForm from "@/components/ScrapeForm";
import { motion } from "framer-motion";
import { useState } from "react";

function GetCoursesPage() {

  const [move, setMove] = useState(false);

  return (
    <>
    <div className="flex items-center h-screen relative">
      <motion.div
        animate={{ x: move ? -window.innerWidth / 2 : 0 }}
        className="bg-[#131a33] w-1/2 h-full absolute top-0 right-0 overflow-hidden"
        onClick={() => setMove(!move)}
      >
       {move ? (
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-8xl"
                style={{
                  background: "linear-gradient(#99fcf9, #154070, #593992)",
                  WebkitBackgroundClip: "text",
                  color: "#99fcf9",
                }}
                onClick={() => setMove(false)}
              >
                <p>Excel</p>
                <p>FORM</p>
              </div>
            ) : (
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-8xl"
                style={{
                  background: "linear-gradient(#99fcf9, #154070, #593992)",
                  WebkitBackgroundClip: "text",
                  color: "#99fcf9",
                }}
                onClick={() => setMove(true)}
              >
                <p>ID</p>
                <p>&</p>
                <p>PASSWORD</p>
              </div>
              
            )}
      </motion.div>
      <div className="bg-slate-100 w-1/2">
        <ExcelForm />
      </div>
      <div className="bg-slate-200 w-1/2">
        <ScrapeForm />
      </div>
    </div>
  </>
  );

}

export default GetCoursesPage;
