"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { courseDataType } from "@/app/types/types";

const PriorityList = ({
  remainingCoursesList,
}: {
  remainingCoursesList: courseDataType[];
}) => {
  const router = useRouter();

  const [checkedCourses, setCheckedCourses] = useState(
    new Array(remainingCoursesList.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedCourses = [...checkedCourses];
    const currentCourse = remainingCoursesList[index];

    // Use CRN as a unique group identifier
    const groupIdentifier = currentCourse.crn;

    // Find all courses with the same group identifier (CRN)
    const coursesInSameGroup = remainingCoursesList.filter(
      (course) => course.crn === groupIdentifier
    );

    // Update the checked status for all courses in the same group
    coursesInSameGroup.forEach((course) => {
      const courseIndex = remainingCoursesList.findIndex((c) => c === course);
      updatedCheckedCourses[courseIndex] = !updatedCheckedCourses[courseIndex];
    });

    setCheckedCourses(updatedCheckedCourses);
  };

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const checkedCoursesList = remainingCoursesList.filter(
      (course, index) => checkedCourses[index]
    );
    toast({
      title: "Great",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Your courses selected successfully &#x1F601;
          </code>
        </pre>
      ),
    });
    const storedData = localStorage.setItem(
      "StudentCoursesCheckedCourses",
      JSON.stringify(checkedCoursesList)
    );
    router.push("/schedule");
  }

  console.log("Remaining Courses List:", remainingCoursesList);

  return (
    <>
      <div className="h-full">
        <h1 className="text-4xl font-bold mb-4 mt-5 text-center">
          <span className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-transparent bg-clip-text">
            List of Courses You Can Take
          </span>
        </h1>
        <hr className="border-1 border-black my-2" />
        <form method="POST" onSubmit={onSubmit} className="mb-8">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">CRN</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Credits</th>
                <th className="px-4 py-2">Days</th>
                <th className="px-4 py-2">Times</th>
                <th className="px-4 py-2">DR</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Campus</th>
                <th className="px-4 py-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {remainingCoursesList.map((course, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">
                    {index === 0 ||
                    course.code !== remainingCoursesList[index - 1].code
                      ? course.code
                      : null}
                  </td>
                  <td className="px-4 py-2">
                    {index === 0 ||
                    course.crn !== remainingCoursesList[index - 1].crn
                      ? course.crn
                      : null}
                  </td>
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">{course.credits}</td>
                  <td className="px-4 py-2">{course.days}</td>
                  <td className="px-4 py-2">{course.times}</td>
                  <td className="px-4 py-2">{course.dr}</td>
                  <td className="px-4 py-2">{course.capacity}</td>
                  <td className="px-4 py-2">{course.type}</td>
                  <td className="px-4 py-2">{course.campus}</td>
                  <td className="px-4 py-2">
                    <input
                      checked={checkedCourses[index]}
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      className="form-checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row-reverse mr-5">
            <Button type="submit" className="mt-4 w-[160px]">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PriorityList;
