import { NextRequest, NextResponse } from "next/server";

type courseDataType = {
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

type courseOfferingPageDataType = {
  Faculty: string;
  Attribute: string;
  courseType: string;
}[];

type scrapedCourses = {
  courseDataArray: courseDataType[];
  check: boolean;
};

const launchScraping = async (coursesData: courseOfferingPageDataType) => {
  console.log("STARTING! ");
  try {
    const courseDataArray: courseDataType[] = [];
    const puppeteer = require("puppeteer");

    await (async () => {
      const browser = await puppeteer.launch({
        headless: "new",
        timeout: 80000,
      });
      const page = await browser.newPage();
      const timeout = 100000;
      page.setDefaultTimeout();

      {
        const targetPage = page;
        const promises: Promise<string>[] = [];
        const startWaitingForEvents = () => {
          promises.push(targetPage.waitForNavigation());
        };
        startWaitingForEvents();
        await targetPage.goto(
          "https://mis.bau.edu.lb/web/v15/CourseOffering.aspx"
        );
        await Promise.all(promises);
      }
      {
        const targetPage = page;
        await puppeteer.Locator.race([
          targetPage.locator("::-p-aria(CAMPUS: Debbieh)"),
          targetPage.locator("::-p-text(CAMPUS: Debbieh)"),
        ])
          .setTimeout(timeout)
          .click();
      }

      async function getDataFromPage(courseType: string) {
        let resultText: string[] = []
        let check = false;
        const targetElement = await page.$x(
          '//tr[.//*[contains(text(), "Debbieh")]]'
        );

        console.log("Starting Collecting Data...")
        if (targetElement.length > 0) {
          const dxgvTdElements = await targetElement[0].$$("td.dxgv");

          for (const td of dxgvTdElements) {
            let innerText = await td.evaluate((el: any) => el.innerText);

            if (
              !innerText.startsWith("ATTRIBUTE:") &&
              !innerText.startsWith("CAMPUS:") &&
              !innerText.startsWith("FACULTY:") &&
              innerText != ""
            ) {
              resultText.push(innerText);
            }
          }
        } else {
          console.error("Element not found");
        }

        const arrayNoSpaces = ((arrayRem, len) => {
          let startIndex = 0;
          let endIndex = len - 1;
          while (startIndex < len && arrayRem[startIndex].trim() === "") {
            startIndex++;
          }
          while (endIndex >= 0 && arrayRem[endIndex].trim() === "") {
            endIndex--;
          }
          return arrayRem.slice(startIndex, endIndex + 1);
        })(resultText, resultText.length);

        console.log("Modifying Data...")
        for (let index = 0; index < arrayNoSpaces.length; index++) {
          const i = index % 19;
          if (i === 0) {
            const courseData: courseDataType = {
              campus: arrayNoSpaces[index],
              crn: arrayNoSpaces[index + 1],
              code: arrayNoSpaces[index + 2],
              name: arrayNoSpaces[index + 3],
              letter: arrayNoSpaces[index + 4],
              credits: arrayNoSpaces[index + 5],
              type: arrayNoSpaces[index + 6],
              days: arrayNoSpaces[index + 7],
              times: arrayNoSpaces[index + 8],
              bldg: arrayNoSpaces[index + 9],
              class: arrayNoSpaces[index + 10],
              dr: arrayNoSpaces[index + 11],
              capacity: arrayNoSpaces[index + 12],
              otherMajor: arrayNoSpaces[index + 13],
              major: arrayNoSpaces[index + 14],
              emptySpace1: arrayNoSpaces[index + 15],
              emptySpace2: arrayNoSpaces[index + 16],
              emptySpace3: arrayNoSpaces[index + 17],
              emptySpace4: arrayNoSpaces[index + 18],
              courseType: courseType,
            };
            courseDataArray.push(courseData);
            console.log("courseData...")
            console.log(courseData)
          }
        }
        if (courseDataArray) {
          check = true;
        }

        const resultFromPage = {
          courseDataArray,
          check,
        };
        console.log("Finishing Collecting Data...")
        return resultFromPage;
      }

      async function processPage(
        page: any,
        facultyString: string,
        AttributeString: string,
        courseType: string
      ) {
        const targetPage = page;
        let resultText: string[] = [];

        await targetPage.waitForTimeout(3000);

        await puppeteer.Locator.race([targetPage.locator(facultyString)])
          .setTimeout(timeout)
          .click();

        await targetPage.waitForTimeout(3000);

        await puppeteer.Locator.race([targetPage.locator(AttributeString)])
          .setTimeout(timeout)
          .click();

        await targetPage.waitForTimeout(3000);

        let result: scrapedCourses = await getDataFromPage(
          courseType,
          
        );

        if (result.check == true) {
          const page2Link = await page.$(
            "a.dxp-num[onclick=\"ASPx.GVPagerOnClick('GVCourseOffering','PN1');\"]"
          );

          if (page2Link) {
            await page.click(
              "a.dxp-num[onclick=\"ASPx.GVPagerOnClick('GVCourseOffering','PN1');\"]"
            );

            await targetPage.waitForTimeout(3000);

            const result2: scrapedCourses = await getDataFromPage(
              courseType,
            );
            result2.courseDataArray.forEach((course) => {
              result.courseDataArray.push(course);
            });

            result.check = result2.check;
            await page.click(
              "a.dxp-num[onclick=\"ASPx.GVPagerOnClick('GVCourseOffering','PN0');\"]"
            );

            await targetPage.waitForTimeout(3000);
          }
        }

        if(coursesData.length > 1){
        await puppeteer.Locator.race([targetPage.locator(AttributeString)])
          .setTimeout(timeout)
          .click();

        await targetPage.waitForTimeout(3000);

        await puppeteer.Locator.race([targetPage.locator(facultyString)])
          .setTimeout(timeout)
          .click();

        await targetPage.waitForTimeout(3000);
        }
        return result;
      }
     
      let f;
      if(coursesData.length > 1){
      for (let i = 0; i < coursesData.length; ) {
        const course = coursesData[i];
        console.log(course.Attribute);
        f = await processPage(
          page,
          course.Faculty,
          course.Attribute,
          course.courseType
        );
        if (f.check == true) {
          i++;
        }
      }
    }else{
      await processPage(
        page,
        coursesData[0].Faculty,
        coursesData[0].Attribute,
        coursesData[0].courseType
      );
    }
      await browser.close();
    })().catch((err) => {
      console.error(err);
      throw err;
    });

    return courseDataArray;
  } catch (err) {
    console.log("ERROR: " + err);
    throw err;
  }
};

const setMajor = async (major: string) => {
  const courseOfferingEngData: courseOfferingPageDataType = [
    {
      Faculty: "::-p-aria(FACULTY: Engineering)",
      Attribute: `::-p-aria(ATTRIBUTE: ${major} - Fifth Year - Core Courses)`,
      courseType: "Major",
    },
    {
      Faculty: "::-p-aria(FACULTY: Engineering)",
      Attribute: `::-p-aria(ATTRIBUTE: ${major} - Fourth Year - Core Courses)`,
      courseType: "Major",
    },
    {
      Faculty: "::-p-aria(FACULTY: Engineering)",
      Attribute: `::-p-aria(ATTRIBUTE: ${major} - Third Year - Core Courses)`,
      courseType: "Major",
    },
    {
      Faculty: "::-p-aria(FACULTY: Engineering)",
      Attribute: `::-p-aria(ATTRIBUTE: ${major} - Second Year - Core Courses)`,
      courseType: "Major",
    },
    {
      Faculty: "::-p-aria(FACULTY: Engineering)",
      Attribute: `::-p-aria(ATTRIBUTE: ${major} - First Year - Core Courses)`,
      courseType: "Major",
    },
    {
      Faculty: "::-p-aria(FACULTY: Engineering)",
      Attribute: `::-p-aria(ATTRIBUTE: ${major} - Fourth Year - Elective Courses)`,
      courseType: "Technical Elective",
    },
  ];

  return courseOfferingEngData;
};

const courseOfferingElectiveData: courseOfferingPageDataType = [
  {
    Faculty: "::-p-aria(FACULTY: University Elective Courses)",
    Attribute:
      "::-p-aria(ATTRIBUTE: University Elective Courses)",
    courseType: "General Elective",
  },
]
const courseOfferingGeneralEngData: courseOfferingPageDataType = [
    {
    Faculty: "::-p-aria(FACULTY: Engineering)",
    Attribute: "::-p-aria(ATTRIBUTE: General Engineering Core Courses)",
    courseType: "GNR",
  },
]
const courseOfferingCoreData: courseOfferingPageDataType = [
  {
    Faculty: "::-p-aria(FACULTY: University Core Courses)",
    Attribute:
      "::-p-aria(ATTRIBUTE: University Core Courses)",
    courseType: "GNR",
  },
]

type courseOfferningBodyRequestType = {
  department: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: courseOfferningBodyRequestType = await req.json();
    const setMajorFromRequest = await setMajor(body.department)
    const promises = [
    launchScraping(setMajorFromRequest),
    launchScraping(courseOfferingGeneralEngData),
    launchScraping(courseOfferingElectiveData),
    launchScraping(courseOfferingCoreData),
    ]
    const results = await Promise.all(promises);
    const flattenedResults = results.flat();
 
     const modifiedResults = flattenedResults.map(courseData => {
      const { emptySpace1, emptySpace2, emptySpace3, emptySpace4, ...modifiedCourseData } = courseData;
      return modifiedCourseData;
    });
    

      return new NextResponse(JSON.stringify(modifiedResults), { status: 201 });
    
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};
