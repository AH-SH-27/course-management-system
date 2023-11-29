import React from "react";
import PriorityList from "@/components/PriorityList";
import { Button } from "@/components/ui/button";
const courses = [
  {
    name: "COMP1",
    credits: 3,
    crns: [
      {
        days: ["Monday", "Wednesday"],
        startTime: { hour: 8, minute: 1 },
        endTime: { hour: 9, minute: 30 },
        crn: "1001",
      },
      {
        days: ["Monday", "Wednesday"],
        startTime: { hour: 10, minute: 31 },
        endTime: { hour: 11, minute: 0 },
        crn: "1002",
      },
    ],
  },
  {
    name: "COMP2",
    credits: 3,
    crns: [
      {
        days: ["Monday", "Wednesday"],
        startTime: { hour: 8, minute: 31 },
        endTime: { hour: 13, minute: 30 },
        crn: "1003",
      },
      {
        days: ["Tuesday", "Thursday"],
        startTime: { hour: 12, minute: 31 },
        endTime: { hour: 13, minute: 30 },
        crn: "1004",
      },
    ],
  },
  {
    name: "COMP3",
    credits: 3,
    crns: [
      {
        days: ["Tuesday", "Thursday"],
        startTime: { hour: 8, minute: 1 },
        endTime: { hour: 9, minute: 0 },
        crn: "1005",
      },
      {
        days: ["Tuesday", "Thursday"],
        startTime: { hour: 9, minute: 1 },
        endTime: { hour: 10, minute: 0 },
        crn: "1006",
      },
      {
        days: ["Tuesday", "Thursday"],
        startTime: { hour: 10, minute: 1 },
        endTime: { hour: 11, minute: 0 },
        crn: "1007",
      },
    ],
  },
  {
    name: "COMP4",
    credits: 3,
    crns: [
      {
        days: ["Monday", "Wednesday"],
        startTime: { hour: 14, minute: 31 },
        endTime: { hour: 15, minute: 30 },
        crn: "1008",
      },
    ],
  },
];

type TimeType = {
  hour: number;
  minute: number;
};
type PositionType = {
  days: number[];
  Stime: number;
  Etime: number;
};

let week: Array<Array<string>> = Array.from(
  { length: 5 },
  () => new Array<string>(60)
);

function getInitialPosition(
  days: string[],
  startTime: TimeType,
  endingTime: TimeType
) {
  const dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let startingDayPosition: number[] = [];
  days.forEach((day) => {
    startingDayPosition.push(dayWeek.indexOf(day));
  });

  let startingTimePosition = (startTime.hour - 8) * 60 + startTime.minute - 1;
  startingTimePosition = ((startingTimePosition / 60) * 3) / 0.5;

  let endingTimePosition = (endingTime.hour - 8) * 60 + endingTime.minute;
  endingTimePosition = ((endingTimePosition / 60) * 3) / 0.5 - 1;

  const position: PositionType = {
    days: startingDayPosition,
    Stime: startingTimePosition,
    Etime: endingTimePosition,
  };
  return position;
}

function getInterval(startTime: TimeType, endTime: TimeType): number {
  const startMinutes = startTime.hour * 60 + startTime.minute;
  const endMinutes = endTime.hour * 60 + endTime.minute;

  return ((endMinutes - startMinutes + 1) / 60) * 6;
}

function createCoursesPriorityList() {
  // 80% DONE
}

function removeCourseFromWeek(
  week: (string | undefined)[][],
  positions: PositionType,
  interval: number,
  crn: string
) {
  positions.days.forEach((day) => {
    for (let i = positions.Stime; i < positions.Stime + interval; i++) {
      if (week[day][i] == crn) {
        delete week[day][i];
      }
    }
  });
}

function fillWeek(
  week: (string | undefined)[][],
  positions: PositionType,
  interval: number,
  crn: string
) {
  const retRes = {
    week: week,
    addedCourseCheck: false,
  };

  let daysCheck = 0;
  let problemCourse: string;
  positions.days.forEach((day) => {
    let check = 0;

    for (let i = positions.Stime; i < positions.Stime + interval; i++) {
      if (week[day][i] == undefined) {
        week[day][i] = crn;
        check++;
        if (check == interval - 1) {
          daysCheck++;
        }
      }
    }
    if (daysCheck == positions.days.length) {
      retRes.addedCourseCheck = true;
    } else if (
      daysCheck != positions.days.length &&
      day == positions.days.length
    ) {
      problemCourse = crn;
      removeCourseFromWeek(
        week,
        { days: [0, 2], Stime: 3, Etime: 32 },
        30,
        problemCourse
      );
      console.log("problem Course: " + problemCourse);
    }
  });
  retRes.week = week;
  return retRes;
}

function createSchedule(week: string[][]) {
  let we;

  //courses.forEach((course) => {
  console.log(
    "*******************************ALGO START HERE: **************************************************************"
  );
  coursesLoop: for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    //console.log(course);
    // console.log("i " + i);
    // console.log("crns " + course.crns);
    //course.crns.forEach((crn) => {
    crnLoop: for (let j = 0; j < course.crns.length; j++) {
      const crn = course.crns[j];
      const pos = getInitialPosition(crn.days, crn.startTime, crn.endTime);
      const interval = getInterval(crn.startTime, crn.endTime);
      // console.log("crn " + crn.crn);
      // console.log("crn length: " + course.crns.length);
      //  console.log("end time " + crn.endTime.hour +" : "+ crn.endTime.minute);
      //  console.log("pos " + pos.days);
      // console.log("pos " + pos.Etime);
      // console.log("interval " + interval);
      we = fillWeek(week, pos, interval, crn.crn);
      if (we.addedCourseCheck == true) {
        // console.log("crn is " + crn.crn);
        //j = course.crns.length;
        break;
      }
    }
  }
  console.log(we?.week);
}

const g = createSchedule(week);
console.log(g);

function page() {
  return (
    <div>
      <PriorityList />
      <div>HELLO</div>
    </div>
  );
}

export default page;
