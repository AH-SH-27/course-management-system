"use client";
import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback, useLayoutEffect, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

const allCourses = [
  {
    Course: "COMP499",
    Title: "Internship",
    Credits: 1,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP502",
    Title: "Final Year Project II",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP452",
    Title: "compilers",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP500",
    Title: "research methodology",
    Credits: 2,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP443",
    Title: "operating systems",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP525",
    Title: "embedded & microprocessor syst",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP501",
    Title: "Final Year Project I",
    Credits: 1,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP453",
    Title: "transm. & proc. of dig. signal",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP543",
    Title: "cryptography & info. security",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP543L",
    Title: "crypto. & info. security lab",
    Credits: 1,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP454",
    Title: "computer networks",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP454L",
    Title: "computer networks lab",
    Credits: 1,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP344",
    Title: "database systems",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP364",
    Title: "intro. to AI & ML",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP428",
    Title: "digital systems design",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP442",
    Title: "software engineering",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP423",
    Title: "computer architecture",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP361",
    Title: "control systems for comp eng",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP337",
    Title: "design & analysis of algorithm",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COME223",
    Title: "digital electronics",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "COMP232",
    Title: "data structures",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP311",
    Title: "object oriented prg.",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP325",
    Title: "microprocessor org. & design",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP210",
    Title: "PROGRAMMING II",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP215",
    Title: "Programming for eng.",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP231",
    Title: "discrete structures",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP226",
    Title: "digital systems 2",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "COMP208",
    Title: "Programming I",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "COMP225",
    Title: "digital systems 1",
    Credits: 3,
    Level: "UG",
    Type: "CE Core",
  },
  {
    Course: "BLAW001",
    Title: "Human Rights",
    Credits: 1,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "ENGR001",
    Title: "Engineering Ethics",
    Credits: 1,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MATH284",
    Title: "Numerical Analysis",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "CHEM405",
    Title: "Solid State Chemistry",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "COME411",
    Title: "instrumentation",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MGMT002",
    Title: "Entrepreneurship",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MATH381",
    Title: "Probability And Statistics",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "ARAB001",
    Title: "Arabic language & Literature",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "INME221",
    Title: "Engineering Economy",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "POWE212",
    Title: "electric circuits 1",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "ENGL300",
    Title: "Speech Communications",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "PHYS282",
    Title: "Material Properties and Heat",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "ENGL211",
    Title: "Advanced Writing",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "CHEM241",
    Title: "Principles of Chemistry",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MATH283",
    Title: "Differential Equations",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "ENGL001",
    Title: "General English",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "ENGR002",
    Title: "intro. to engineering",
    Credits: 2,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MATH281",
    Title: "Linear Algebra",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MATH282",
    Title: "Calculus",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "MCHE213",
    Title: "Dynamics",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "PHYS281",
    Title: "Electricity and Magnetism",
    Credits: 3,
    Level: "UG",
    Type: "GNR",
  },
  {
    Course: "IC003",
    Title: "Intern&Comput.Core Cert",
    Credits: 0,
    Level: "UG",
    Type: "Certificate",
  },
];

const preReqList = [
  {
    Course: "MATH283",
    Prerequisite: ["MATH282", "MATH281"],
  },
  {
    Course: "COMP210",
    Prerequisite: ["COMP208"],
  },
  {
    Course: "COMP215",
    Prerequisite: ["COMP208"],
  },
  {
    Course: "COMP231",
    Prerequisite: ["MATH282"],
  },
  {
    Course: "COME223",
    Prerequisite: ["POWE212"],
  },
  {
    Course: "COMP226",
    Prerequisite: ["COMP225"],
  },
  {
    Course: "COMP232",
    Prerequisite: ["COMP210", "COMP231"],
  },
  {
    Course: "COMP311",
    Prerequisite: ["COMP210"],
  },
  {
    Course: "MATH381",
    Prerequisite: ["MATH282"],
  },
  {
    Course: "MATH284",
    Prerequisite: ["MATH283"],
  },
  {
    Course: "COMP325",
    Prerequisite: ["COMP226"],
  },
  {
    Course: "CHEM405",
    Prerequisite: ["CHEM241"],
  },
  {
    Course: "COMP453",
    Prerequisite: ["COMP231"],
  },
  {
    Course: "COMP337",
    Prerequisite: ["COMP231"],
  },
  {
    Course: "COMP361",
    Prerequisite: ["MATH283", "POWE212"],
  },
  {
    Course: "COMP423",
    Prerequisite: ["COMP226"],
  },
  {
    Course: "COME411",
    Prerequisite: ["COME223"],
  },
  {
    Course: "COMP344",
    Prerequisite: ["COMP232"],
  },
  {
    Course: "COMP442",
    Prerequisite: ["COMP311"],
  },
  {
    Course: "COMP364",
    Prerequisite: ["COMP215"],
  },
  {
    Course: "COMP428",
    Prerequisite: ["COMP325"],
  },
  {
    Course: "COMP454",
    Prerequisite: ["COMP225"],
  },
  {
    Course: "COMP543",
    Prerequisite: ["COMP337"],
  },
  {
    Course: "COMP500",
    Prerequisite: ["ENGL300"],
  },
  {
    Course: "ENGL300",
    Prerequisite: ["ENGL211"],
  },
  {
    Course: "ENGL211",
    Prerequisite: ["ENGL001"],
  },
  {
    Course: "COMP452",
    Prerequisite: ["COMP311"],
  },
  {
    Course: "COMP525",
    Prerequisite: ["COMP325"],
  },
  {
    Course: "COMP443",
    Prerequisite: ["COMP423"],
  },
  {
    Course: "COMP502",
    Prerequisite: ["COMP501"],
  },
];



const StudentfinishedCourses = [
  {
      "Term": "Spring 2022 / 2023",
      "Course": "COMP443",
      "Title": "operating systems",
      "Credits": 3,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Spring 2022 / 2023",
      "Course": "COMP500",
      "Title": "research methodology",
      "Credits": 2,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Spring 2022 / 2023",
      "Course": "COMP452",
      "Title": "compilers",
      "Credits": 3,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Spring 2022 / 2023",
      "Course": "COMP501",
      "Title": "Final Year Project I",
      "Credits": 1,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Spring 2022 / 2023",
      "Course": "CHEM405",
      "Title": "Solid State Chemistry",
      "Credits": 2,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Spring 2022 / 2023",
      "Course": "WRNL200",
      "Title": "Work Ready Now",
      "Credits": 3,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Spring 2022 / 2023",
      "Course": "COMP525",
      "Title": "embedded & microprocessor syst",
      "Credits": 3,
      "Level": "UG",
      "Grade": "[HOLD]",
      "SGPA": null
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COMP543",
      "Title": "cryptography & info. security",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B-",
      "SGPA": 3.37
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COME411",
      "Title": "instrumrntation",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B",
      "SGPA": 3.37
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COMP453",
      "Title": "transm. & proc. of dig. signal",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B",
      "SGPA": 3.37
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COMP560",
      "Title": "Deep Learning",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A-",
      "SGPA": 3.37
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COMP543L",
      "Title": "crypto. & info. security lab",
      "Credits": 1,
      "Level": "UG",
      "Grade": "B",
      "SGPA": 3.37
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COMP474",
      "Title": "Introduction to Robotics",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.37
  },
  {
      "Term": "Fall 2022 / 2023",
      "Course": "COMP512",
      "Title": "web programming",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A+",
      "SGPA": 3.37
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "COMP364",
      "Title": "intro. to AI & ML",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "MGMT002",
      "Title": "Entrepreneurship",
      "Credits": 2,
      "Level": "UG",
      "Grade": "B-",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "COMP454",
      "Title": "computer networks",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B+",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "COMP428",
      "Title": "digital systems design",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "COMP442",
      "Title": "software engineering",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "COMP344",
      "Title": "database systems",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A-",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "CVLE007",
      "Title": "Traffic Safety",
      "Credits": 1,
      "Level": "UG",
      "Grade": "A-",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "ENVI004",
      "Title": "Envi. Issues in Lebanon",
      "Credits": 2,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.64
  },
  {
      "Term": "Spring 2021 / 2022",
      "Course": "COMP454L",
      "Title": "computer networks lab",
      "Credits": 1,
      "Level": "UG",
      "Grade": "C+",
      "SGPA": 3.64
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "COME223",
      "Title": "digital electornics",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.26
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "CMPS005",
      "Title": "BULDING BASIC ANDROID APPS",
      "Credits": 2,
      "Level": "UG",
      "Grade": "A-",
      "SGPA": 3.26
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "COMP361",
      "Title": "control systems for comp eng",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.26
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "COMP423",
      "Title": "computer architecture",
      "Credits": 3,
      "Level": "UG",
      "Grade": "C",
      "SGPA": 3.26
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "IC003",
      "Title": "Intern&Comput.Core Cert",
      "Credits": 0,
      "Level": "UG",
      "Grade": "P",
      "SGPA": 3.26
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "COMP337",
      "Title": "design & analysis of algorithm",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.26
  },
  {
      "Term": "Fall 2021 / 2022",
      "Course": "COMP477",
      "Title": "emerging trends in comp eng",
      "Credits": 3,
      "Level": "UG",
      "Grade": "C",
      "SGPA": 3.26
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "COMP232",
      "Title": "data structures",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B-",
      "SGPA": 2.95
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "COMP325",
      "Title": "microprocessor org. &design",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B",
      "SGPA": 2.95
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "INME221",
      "Title": "Engineering Economy",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B",
      "SGPA": 2.95
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "BLAW001",
      "Title": "Human Rights",
      "Credits": 1,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 2.95
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "MATH381",
      "Title": "Probability And Statistics",
      "Credits": 3,
      "Level": "UG",
      "Grade": "D",
      "SGPA": 2.95
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "ARAB001",
      "Title": "Arabic language & Literature",
      "Credits": 2,
      "Level": "UG",
      "Grade": "A+",
      "SGPA": 2.95
  },
  {
      "Term": "Spring 2020 / 2021",
      "Course": "COMP311",
      "Title": "object oriented prg.",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A-",
      "SGPA": 2.95
  },
  {
      "Term": "Fall 2020 / 2021",
      "Course": "COMP226",
      "Title": "digital systems 2",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B",
      "SGPA": 3.41
  },
  {
      "Term": "Fall 2020 / 2021",
      "Course": "COMP215",
      "Title": "Programming for eng.",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.41
  },
  {
      "Term": "Fall 2020 / 2021",
      "Course": "ENGL300",
      "Title": "Speech Communications",
      "Credits": 2,
      "Level": "UG",
      "Grade": "C",
      "SGPA": 3.41
  },
  {
      "Term": "Fall 2020 / 2021",
      "Course": "POWE212",
      "Title": "electric circuits 1",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A-",
      "SGPA": 3.41
  },
  {
      "Term": "Fall 2020 / 2021",
      "Course": "COMP231",
      "Title": "discrete structures",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A+",
      "SGPA": 3.41
  },
  {
      "Term": "Fall 2020 / 2021",
      "Course": "COMP210",
      "Title": "PROGRAMMING II",
      "Credits": 3,
      "Level": "UG",
      "Grade": "B+",
      "SGPA": 3.41
  },
  {
      "Term": "Spring 2019 / 2020",
      "Course": "ENGL211",
      "Title": "Advanced Writing",
      "Credits": 2,
      "Level": "UG",
      "Grade": "P",
      "SGPA": 4
  },
  {
      "Term": "Spring 2019 / 2020",
      "Course": "COMP208",
      "Title": "Programming I",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 4
  },
  {
      "Term": "Spring 2019 / 2020",
      "Course": "MATH283",
      "Title": "Differential Equations",
      "Credits": 3,
      "Level": "UG",
      "Grade": "P",
      "SGPA": 4
  },
  {
      "Term": "Spring 2019 / 2020",
      "Course": "COMP225",
      "Title": "digital systems 1",
      "Credits": 3,
      "Level": "UG",
      "Grade": "P",
      "SGPA": 4
  },
  {
      "Term": "Spring 2019 / 2020",
      "Course": "CHEM241",
      "Title": "Principles of Chemistry",
      "Credits": 3,
      "Level": "UG",
      "Grade": "P",
      "SGPA": 4
  },
  {
      "Term": "Spring 2019 / 2020",
      "Course": "PHYS282",
      "Title": "Material Properties and Heat",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 4
  },
  {
      "Term": "Fall 2019 / 2020",
      "Course": "MCHE213",
      "Title": "Dynamics",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.67
  },
  {
      "Term": "Fall 2019 / 2020",
      "Course": "ENGL001",
      "Title": "General English",
      "Credits": 2,
      "Level": "UG",
      "Grade": "B+",
      "SGPA": 3.67
  },
  {
      "Term": "Fall 2019 / 2020",
      "Course": "MATH281",
      "Title": "Linear Algebra",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A+",
      "SGPA": 3.67
  },
  {
      "Term": "Fall 2019 / 2020",
      "Course": "MATH282",
      "Title": "Calculus",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A",
      "SGPA": 3.67
  },
  {
      "Term": "Fall 2019 / 2020",
      "Course": "ENGR002",
      "Title": "intro. to engineering",
      "Credits": 2,
      "Level": "UG",
      "Grade": "C",
      "SGPA": 3.67
  },
  {
      "Term": "Fall 2019 / 2020",
      "Course": "PHYS281",
      "Title": "Electricity and Magnetism",
      "Credits": 3,
      "Level": "UG",
      "Grade": "A+",
      "SGPA": 3.67
  }
]

const studentPlanData = {
  Year1: {
    Fall: [
      { Course: "MATH281", Title: "Linear Algebra", Credits: 3, Level: "UG" },
      { Course: "MATH282", Title: "Calculus", Credits: 3, Level: "UG" },
      { Course: "PHYS281", Title: "Electricity and Magnetism", Credits: 3, Level: "UG" },
      { Course: "ENGR002", Title: "Intro. to Engineering", Credits: 2, Level: "UG" },
      { Course: "MCHE213", Title: "Dynamics", Credits: 3, Level: "UG" },
      { Course: "ARAB001", Title: "Arabic Language & Literature", Credits: 2, Level: "UG" },
    ],
    Spring: [
      { Course: "MATH283", Title: "Differential Equations", Credits: 3, Level: "UG" },
      { Course: "POWE212", Title: "Electric Circuits 1", Credits: 3, Level: "UG" },
      { Course: "PHYS282", Title: "Material Properties and Heat", Credits: 2, Level: "UG" },
      { Course: "COMP225", Title: "Digital Systems 1", Credits: 3, Level: "UG" },
      { Course: "ENGL001", Title: "General English", Credits: 2, Level: "UG" },
      { Course: "COMP208", Title: "Programming I", Credits: 3, Level: "UG" },
    ],
    Summer: [
      { Course: "BLAW001", Title: "Human Rights", Credits: 1, Level: "UG" },
      { Course: "General Elective", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "CHEM241", Title: "Principles of Chemistry", Credits: 2, Level: "UG" },
      { Course: "ENGL221", Title: "Course Title", Credits: 3, Level: "UG" },
    ],
  },
  Year2: {
    Fall: [
      { Course: "COME223", Title: "Digital Electronics", Credits: 3, Level: "UG" },
      { Course: "COMP231", Title: "Discrete Structures", Credits: 3, Level: "UG" },
      { Course: "COMP226", Title: "Digital Systems 2", Credits: 3, Level: "UG" },
      { Course: "ENGL300", Title: "Speech Communications", Credits: 2, Level: "UG" },
      { Course: "COMP215", Title: "Programming for Eng.", Credits: 3, Level: "UG" },
      { Course: "COMP210", Title: "Programming II", Credits: 3, Level: "UG" },
    ],
    Spring: [
      { Course: "MATH284", Title: "Numerical Analysis", Credits: 3, Level: "UG" },
      { Course: "COMP232", Title: "Data Structures", Credits: 3, Level: "UG" },
      { Course: "MATH381", Title: "Probability and Statistics", Credits: 3, Level: "UG" },
      { Course: "COMP325", Title: "Microprocessor Org. & Design", Credits: 3, Level: "UG" },
      { Course: "INME221", Title: "Engineering Economy", Credits: 3, Level: "UG" },
      { Course: "COMP311", Title: "Object Oriented Prg.", Credits: 3, Level: "UG" },
    ],
    Summer: [
      { Course: "MGMT002", Title: "Entrepreneurship", Credits: 2, Level: "UG" },
      { Course: "CHEM405", Title: "Solid State Chemistry", Credits: 2, Level: "UG" },
      { Course: "ENGR001", Title: "Engineering Ethics", Credits: 1, Level: "UG" },
      { Course: "General Elective", Title: "Course Title", Credits: 3, Level: "UG" },
    ],
  },
  Year3: {
    Fall: [
      { Course: "COMP361", Title: "Control Systems for Comp Eng", Credits: 3, Level: "UG" },
      { Course: "COME411", Title: "Instrumentation", Credits: 3, Level: "UG" },
      { Course: "COMP337", Title: "Design & Analysis of Algorithm", Credits: 3, Level: "UG" },
      { Course: "COMP453", Title: "Transm. & Proc. of Dig. Signal", Credits: 3, Level: "UG" },
      { Course: "Technical Elective", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "COMP423", Title: "Computer Architecture", Credits: 3, Level: "UG" },
    ],
    Spring: [
      { Course: "COMP334", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "COMP454L", Title: "Computer Networks Lab", Credits: 1, Level: "UG" },
      { Course: "COMP454", Title: "Computer Networks", Credits: 3, Level: "UG" },
      { Course: "COMP428", Title: "Digital Systems Design", Credits: 3, Level: "UG" },
      { Course: "General Elective", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "COMP364", Title: "Intro. to AI & ML", Credits: 3, Level: "UG" },
      { Course: "COMP442", Title: "Software Engineering", Credits: 3, Level: "UG" },
    ],
    Summer: [],
  },
  Year4: {
    Fall: [
      { Course: "COMP543", Title: "Cryptography & Info. Security", Credits: 3, Level: "UG" },
      { Course: "COMP543L", Title: "Crypto. & Info. Security Lab", Credits: 1, Level: "UG" },
      { Course: "Technical Elective", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "Technical Elective", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "COMP501", Title: "Final Year Project I", Credits: 1, Level: "UG" },
      { Course: "COMP500", Title: "Research Methodology", Credits: 2, Level: "UG" },
      { Course: "COMP499", Title: "Internship", Credits: 1, Level: "UG" },
    ],
    Spring: [
      { Course: "Technical Elective", Title: "Course Title", Credits: 3, Level: "UG" },
      { Course: "COMP443", Title: "Operating Systems", Credits: 3, Level: "UG" },
      { Course: "COMP525", Title: "Embedded & Microprocessor Syst", Credits: 3, Level: "UG" },
      { Course: "COMP502", Title: "Final Year Project II", Credits: 3, Level: "UG" },
      { Course: "COMP452", Title: "Compilers", Credits: 3, Level: "UG" },
    ],
    Summer: [],
  },
};
     

function remainCourses() {
  const takenCourseCodes = takenCourses.map((course) => course.Course);
  const uniqueCourses = {};

  availableCourses.forEach((course) => {
    if (!takenCourseCodes.includes(course.code)) {
      const prerequisites = preReqList.find((prereq) => prereq.Course === course.code);

      if (
        (prerequisites && prerequisites.Prerequisite.every((prereqCode) => takenCourseCodes.includes(prereqCode))) ||
        ((course.code === "COMP499" && totalCredits > 80) || (course.code === "COMP501" && totalCredits > 110))
      ) {
        const uniqueKey = `${course.code}-${course.crn}-${course.times}-${course.type}-${course.days}`;

        if (!uniqueCourses[uniqueKey]) {
          uniqueCourses[uniqueKey] = course;
        }
      }
    }
  });

  const remainingCourses = Object.values(uniqueCourses);

  return remainingCourses;
}


const currPosition = 0;
let position = { x: currPosition, y: 0 };

// const initialNodes = StudentfinishedCourses.map((course, index) => ({
//   id: `COMP${index + 1}`,
//   data: { label: course.Course },
//   position,
// }));

let id = 0; // Declare id variable outside the loop
const initialNodes = Object.keys(studentPlanData).flatMap((year, Yindex) =>
  Object.keys(studentPlanData[year]).flatMap((semester, Sindex) => {
    const courses = studentPlanData[year][semester];
    if (courses.length > 0) {
      return courses.map((course) => {
        id++; // Increment id for each course
        return {
          id: `M${Yindex}-${Sindex}-${id}`,
          data: { label: `${course.Course} - ${course.Title}` },
          position: { x: currPosition * Sindex, y: currPosition * Yindex },
        };
      });
    } else {
      return [];
    }
  })
);


// Create edges from preReqList
const initialEdges = preReqList.flatMap(({ Course, Prerequisite }) =>
  Prerequisite.map((prereq) => ({
    id: `e${Course}${prereq}`,
    source: `COMP${
      allCourses.findIndex((course) => course.Course === prereq) + 1
    }`,
    target: `COMP${
      allCourses.findIndex((course) => course.Course === Course) + 1
    }`,
    type: "smoothstep",
  }))
);

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);

          window.requestAnimationFrame(() => fitView());
        }
      );
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

  useEffect(() => {
    // Hide the React Flow attribution panel
    const attributionPanel = document.querySelector(
      ".react-flow__panel.react-flow__attribution.bottom.right"
    );

    if (attributionPanel) {
      attributionPanel.style.display = "none";
    }
  }, []);

  return (
    <div className="w-full" style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Panel position="top-right">
          <button onClick={() => onLayout({ direction: "DOWN" })}>
            vertical layout
          </button>

          <button onClick={() => onLayout({ direction: "RIGHT" })}>
            horizontal layout
          </button>
        </Panel>
        <MiniMap zoomable pannable />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
