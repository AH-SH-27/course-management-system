import { NextRequest, NextResponse } from "next/server";
import { remaincourses, allCourses, preReqList, getTotalCreditsByCategory }  from "@/app/utils/remainCourses";

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
    emptySpace1: string;
    emptySpace2: string;
    emptySpace3: string;
    emptySpace4: string;
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

type remainingCoursesBodyType = {
    availableCourses: availableCoursesType;
   takenCourses:  takenCoursesType;
}

type totalCreditsByCategoryType = {
    CECore: number;
    TechnicalElective: number;
    GeneralElective: number;
    GNR: number;
    AllTakenCourses: number;
  }



export const POST = async (req: NextRequest) => {
  try {
    const body:remainingCoursesBodyType = await req.json();
    //console.log(body);

     const totalCreditsByCategories:totalCreditsByCategoryType =  await getTotalCreditsByCategory(body.takenCourses, allCourses);

    const results = await remaincourses(body.availableCourses, body.takenCourses,allCourses,preReqList,totalCreditsByCategories.AllTakenCourses);
    console.log("results")
    console.log(results)

    // console.log("totalCreditsByCategory")
    // console.log(totalCreditsByCategory)
    return new NextResponse(JSON.stringify({results}), { status: 201 });
    
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};
