import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    // console.log(body);

    return new NextResponse(
      JSON.stringify({ body, message: "Data retrieved successfully" }),
      { status: 201 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};

type tesCoursesListInterface = {
  crn: string;
  name: string;
  credits: number;
  isSelected: boolean;
}[];

var tesCoursesList:tesCoursesListInterface = [
  {
    crn: "1234",
    name: "COMP1",
    credits: 3,
    isSelected: false,
  },
  {
    crn: "5678",
    name: "COMP2",
    credits: 3,
    isSelected: false,
  },
  {
    crn: "1122",
    name: "COMP3",
    credits: 2,
    isSelected: false,
  },
  {
    crn: "1551",
    name: "COMP4",
    credits: 3,
    isSelected: false,
  },
  {
    crn: "2233",
    name: "COMP5",
    credits: 3,
    isSelected: false,
  },
];

export const GET = async () => {
  try {
    console.log("route: "+tesCoursesList)
    return new NextResponse(JSON.stringify(tesCoursesList), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};
