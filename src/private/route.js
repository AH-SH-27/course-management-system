import { NextRequest, NextResponse } from "next/server";

const lunchScraping = async () => {
  const courseDataArray = [];
  try {
    const puppeteer = require("puppeteer");

    (async () => {
      const browser = await puppeteer.launch({
        headless: "new",
        timeout: 80000,
      });
      const page = await browser.newPage();
      const timeout = 80000;
      page.setDefaultTimeout(timeout);

      {
        const targetPage = page;
        await targetPage.setViewport({
          width: 1536,
          height: 707,
        });
      }
      {
        const targetPage = page;
        const promises = [];
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
      // {
      //   const targetPage = page;
      //   await puppeteer.Locator.race([
      //     targetPage.locator("::-p-aria(FACULTY: Engineering)"),
      //     targetPage.locator("::-p-text(FACULTY: Engineering)"),
      //   ])
      //     .setTimeout(timeout)
      //     .click();
      // }
      //   {
      //     const targetPage = page;
      //     await puppeteer.Locator.race([
      //       targetPage.locator(
      //         "::-p-aria(ATTRIBUTE: Computer Engineering - Fifth Year - Core Courses)"
      //       ),
      //       targetPage.locator(
      //         "::-p-text(ATTRIBUTE: Computer Engineering - Fifth)"
      //       ),
      //     ])
      //       .setTimeout(timeout)
      //       .click();
      //   }
      //   {
      //     const targetPage = page;
      //     await puppeteer.Locator.race([
      //       targetPage.locator('::-p-aria(ATTRIBUTE: Computer Engineering - Fourth Year - Core Courses)'),
      //       targetPage.locator('::-p-text(ATTRIBUTE: Computer Engineering - Fourth)')
      //   ])
      //         .setTimeout(timeout)
      //         .click();
      // }
      //   {
      //     const targetPage = page;
      //     await puppeteer.Locator.race([
      //       targetPage.locator('::-p-aria(ATTRIBUTE: Computer Engineering - Third Year - Core Courses)'),
      //       targetPage.locator('::-p-text(ATTRIBUTE: Computer Engineering - Third)')
      //   ])
      //         .setTimeout(timeout)
      //         .click();
      // }
      //   {
      //     const targetPage = page;
      //     await puppeteer.Locator.race([
      //       targetPage.locator('::-p-aria(ATTRIBUTE: Computer Engineering - Second Year - Core Courses)'),
      //       targetPage.locator('::-p-text(ATTRIBUTE: Computer Engineering - Second)')
      //   ])
      //         .setTimeout(timeout)
      //         .click();
      // }

      async function processPage(
        page,
        facultyString,
        AttributeString,
        courseType,
        resultText
      ) {
        const targetPage = page;
        let te = false;
       
        await targetPage.waitForTimeout(3000);

        console.log(facultyString)
        await puppeteer.Locator.race([targetPage.locator(facultyString)])
          .setTimeout(timeout)
          .click();

        await targetPage.waitForTimeout(3000);

        console.log(AttributeString)
        await puppeteer.Locator.race([targetPage.locator(AttributeString)])
          .setTimeout(timeout)
          .click();

        await targetPage.waitForTimeout(3000);

        const targetElement = await page.$x(
          '//tr[.//*[contains(text(), "Debbieh")]]'
        );

        if (targetElement.length > 0) {
          const dxgvTdElements = await targetElement[0].$$("td.dxgv");

          for (const td of dxgvTdElements) {
            let innerText = await td.evaluate((el) => el.innerText);

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

        for (let index = 0; index < arrayNoSpaces.length; index++) {
          const i = index % 19;
          if (i === 0) {
            const courseData = {
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
          }
        }
        if (courseDataArray) {
          te = true;
        }
        console.log("courseDataArray in fn");
        console.log(courseDataArray);
        const ret = {
          courseDataArray,
          te,
        };
                
        console.log(AttributeString)
        await puppeteer.Locator.race([targetPage.locator(AttributeString)])
            .setTimeout(timeout)
            .click();

        await targetPage.waitForTimeout(3000);

        console.log(facultyString)
        await puppeteer.Locator.race([targetPage.locator(facultyString)])
          .setTimeout(timeout)
          .click();
        
        await targetPage.waitForTimeout(3000);

        return ret;
      }
      let resArr = [];
      const courseOfferingPageData = [
        {
          Faculty: "::-p-aria(FACULTY: Engineering)",
          Attribute:
            "::-p-aria(ATTRIBUTE: Computer Engineering - Fifth Year - Core Courses)",
          courseType: "major",
        },
        {
          Faculty: "::-p-aria(FACULTY: Engineering)",
          Attribute:
            "::-p-aria(ATTRIBUTE: Computer Engineering - Fourth Year - Core Courses)",
          courseType: "major",
        },
        {
          Faculty: "::-p-aria(FACULTY: Engineering)",
          Attribute:
            "::-p-aria(ATTRIBUTE: Computer Engineering - Third Year - Core Courses)",
          courseType: "major",
        },
        {
          Faculty: "::-p-aria(FACULTY: Engineering)",
          Attribute:
            "::-p-aria(ATTRIBUTE: Computer Engineering - Second Year - Core Courses)",
          courseType: "major",
        },
        {
          Faculty: "::-p-aria(FACULTY: Engineering)",
          Attribute:
            "::-p-aria(ATTRIBUTE: Computer Engineering - First Year - Core Courses)",
          courseType: "major",
        },
        {
          Faculty: "::-p-aria(FACULTY: Engineering)",
          Attribute:
            "::-p-aria(ATTRIBUTE: Computer Engineering - Fourth Year - Elective Courses)",
          courseType: "elective",
        },
      ];

      let f;
      for (let i = 0; i < courseOfferingPageData.length; ) {
        const course = courseOfferingPageData[i];
        let allData = [];
        console.log(course.Attribute);
        f = await processPage(
          page,
          course.Faculty,
          course.Attribute,
          course.courseType,
          allData
        );
        if (f.te == true) {
          i++;
        }
      }

      console.log("final: ", courseDataArray);

      await browser.close();

    })().catch((err) => {
      console.error(err);
    });
  } catch (err) {
    console.log("ERROR: " + err);
  }
  return courseDataArray;
};

export const GET = async () => {
  try {
    const res = await lunchScraping();
    //console.log("Final results: " + res);

    return new NextResponse(JSON.stringify(res), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};
