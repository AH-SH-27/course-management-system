export type courseDataType = {
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
  };

  export type studentCoursesDataType = {
    Course: string;
    Credits: number;
    Grade: string;
    Level: string;
    SGPA: number | null;
    Term: string;
    Title: string;
  }[];