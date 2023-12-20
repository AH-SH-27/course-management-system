import { NextRequest, NextResponse } from "next/server";
import { courseDataType, studentCoursesDataType } from "@/app/types/types"; 

const allCourses:allCoursesType = [
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

const preReqList:preReqListType = [
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

function remainCourses(availableCourses: CourseResult[], takenCourses: studentCoursesDataType, allCourses: allCoursesType, preReqList: preReqListType, totalCredits: number) {
  const takenCourseCodes = takenCourses.map((course) => course.Course);
  const uniqueCourses: { [key: string]: CourseResult } = {};

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

function getTotalCreditsByCategory(takenCourses: studentCoursesDataType, allCourses: allCoursesType) {
  console.log("takenCourses---------");
  console.log(takenCourses);
  const ceCoreCourses = takenCourses
    .filter((course) =>
      allCourses.some(
        (allCourse) =>
          allCourse.Course === course.Course && allCourse.Type === "CE Core"
      )
    )
    .map((course) => course.Course);

  const technicalElectiveCourses = takenCourses
    .filter((course) => {
      const isAllCourses = allCourses.some(
        (allCourse) => allCourse.Course === course.Course
      );
      return (
        (course.Course.startsWith("COMP") ||
          course.Course.startsWith("COME")) &&
        !isAllCourses
      );
    })
    .map((course) => {
      return course.Credits;
    });

  const gnrCourses = allCourses
    .filter((course) => course.Type === "GNR")
    .filter((gnrCourse) =>
      takenCourses.some(
        (takenCourse) => takenCourse.Course === gnrCourse.Course
      )
    )
    .map((course) => {
      return course.Credits;
    });

  const generalElectiveCourses = takenCourses
    .filter((course) => {
      const isAllCourses = allCourses.some(
        (allCourse) => allCourse.Course === course.Course
      );
      return (
        !isAllCourses &&
        !(course.Course.startsWith("COMP") || course.Course.startsWith("COME"))
      );
    })
    .map((course) => {
      console.log("General Elective Course:", course.Course);
      return course.Credits;
    });

  const allTakenCoursesCredits = takenCourses.map((course) => {
    return course.Credits;
  });

  const ceCoreTotalCredits = sumArray(
    ceCoreCourses.map((courseCode) => getCourseCredits(courseCode, allCourses))
  );
  const technicalElectiveTotalCredits = sumArray(technicalElectiveCourses);
  const generalElectiveTotalCredits = sumArray(generalElectiveCourses);
  const gnrTotalCredits = sumArray(gnrCourses);
  const allTakenCoursesTotalCredits = sumArray(allTakenCoursesCredits);

  return {
    CECore: ceCoreTotalCredits,
    TechnicalElective: technicalElectiveTotalCredits,
    GeneralElective: generalElectiveTotalCredits,
    GNR: gnrTotalCredits,
    AllTakenCourses: allTakenCoursesTotalCredits,
  };
}

function getCourseCredits(courseCode:string, allCourses:allCoursesType) {
  const course = allCourses.find((course) => course.Course === courseCode);
  return course ? course.Credits : 0;
}

function sumArray(arr:number[]) {
  return arr.reduce((total, value) => total + value, 0);
}

type availableCoursesType = {
  campus: string;
  crn: string;
  code: string;
  name: string;
  letter: string;
  credits: string;
  type: string;
  days: string;
  times: string;
  bldg: string;
  class: string;
  dr: string;
  capacity: string;
  otherMajor: string;
  major: string;
  courseType: string;
}[]

type takenCoursesType = {
Term: string;
Course: string;
Title: string;
Credits: number;
Level: string;
Grade: string;
SGPA: number;
}[]



type allCoursesType = {
Course: string;
Title: string;
Credits: number;
Level: string;
Type: string;
}[]
type preReqListType = {
Course: string;
Prerequisite: string[];
}[]

type totalCreditsByCategoryType = {
CECore: number;
TechnicalElective: number;
GeneralElective: number;
GNR: number;
AllTakenCourses: number;
}

type remainingCoursesBodyType = {
    availableCourses: availableCoursesType;
   takenCourses:  takenCoursesType;
}

type StudentCoursesType = {
  Course: string;
  Credits: number;
  Grade: string;
  Level: string;
  SGPA: number | null;
  Term: string;
  Title: string;
}[];

type CoursesofferingType =
  | {
      campus: string;
      crn: string;
      code: string;
      name: string;
      letter: string;
      credits: string;
      type: string;
      days: string;
      times: string;
      bldg: string;
      class: string;
      dr: string;
      capacity: string;
      otherMajor: string;
      major: string;
      courseType: string;
    }[];

type requestBodyType = {
studentData: studentCoursesDataType,
courseOfferingData: courseDataType[],
}

type CourseResult = {
  campus: string;
  crn: string;
  code: string;
  name: string;
  letter: string;
  credits: string;
  type: string;
  days: string;
  times: string;
  bldg: string;
  class: string;
  dr: string;
  capacity: string;
  otherMajor: string;
  major: string;
  courseType: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const body:requestBodyType = await req.json();
    const takenCourse = body.studentData
    const totalCreditsByCategories:totalCreditsByCategoryType =  getTotalCreditsByCategory(body.studentData, allCourses);
    const results = remainCourses(body.courseOfferingData, body.studentData,allCourses,preReqList,totalCreditsByCategories.AllTakenCourses);
    return new NextResponse(JSON.stringify({results,totalCreditsByCategories}), { status: 201 });
    
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};
