'use client'
import React from 'react';
import ReactFlow from 'reactflow';
 
import 'reactflow/dist/style.css';
 

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

// Function to create nodes and edges for each term and course
const createNodesAndEdges = (courses) => {
    const nodes = [];
    const edges = [];
    const semesterColumns = new Map(); // Map to track columns for each semester
  
    // Iterate through each term in reverse order (latest term first)
    courses.reverse().forEach((course) => {
      // Check if the semester column already exists, if not create a new one
      if (!semesterColumns.has(course.Term)) {
        semesterColumns.set(course.Term, semesterColumns.size * 300); // Adjust the column width as needed
      }
  
      const xPosition = semesterColumns.get(course.Term);
  
      const termNode = {
        id: course.Term,
        position: { x: xPosition, y: 0 },
        data: { label: course.Term },
        type: 'group',
      };
  
      nodes.push(termNode);
  
      const courseNode = {
        id: course.Course,
        position: { x: xPosition + 100, y: 150 }, // Adjust y-coordinate as needed
        data: { label: `${course.Course}\n${course.Title}` },
      };
  
      nodes.push(courseNode);
  
      const edge = { id: `e-${course.Term}-${course.Course}`, source: course.Term, target: course.Course };
      edges.push(edge);
    });
  
    return { nodes, edges };
  };
  
  const { nodes, edges } = createNodesAndEdges(StudentfinishedCourses);
  
  export default function Page() {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow nodes={nodes} edges={edges} />
      </div>
    );
  }