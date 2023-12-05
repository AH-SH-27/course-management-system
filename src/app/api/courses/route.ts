import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

const extractDataFromPage = async (selector: string) => {
  const data: string[][] = [];
  const table = document.querySelector(selector);

  if (table) {
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const columns = row.querySelectorAll("td");
      const rowData = Array.from(columns).map(
        (column) => column.textContent?.trim() ?? ""
      );
      data.push(rowData);
    });
  }

  return data;
};
const lunchScraping = async (body: reqBodyType) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      timeout: 80000,
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request.resourceType() === ("image" || "img")) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(
      "https://icas.bau.edu.lb:8443/cas/login?service=https://mis.bau.edu.lb/web/v12/iconnectv12/cas/sso.aspx"
    );

    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.waitForSelector('button[name="submit_form"]');

    await page.type('input[name="username"]', body.username, {
      delay: 100,
    });
    await page.type('input[name="password"]', body.password, {
      delay: 100,
    });

    await Promise.all([
      page.waitForNavigation({ timeout: 0 }),
      page.click('button[name="submit_form"]'),
    ]);

    const pageContent = await page.content();

    if (pageContent.includes("Invalid username or password")) {
      console.error("Invalid username or password");
    } else if (pageContent.includes("Another type of error message")) {
      console.error("Another type of error message");
    } else {
      console.log("Login successful!");
    }

    // Extract data from the page
    const data = await page.evaluate(() => {
      const banID =
        (
          document.getElementById("lblBanID") as HTMLElement
        )?.textContent?.trim() || "";
      const fullName =
        (
          document.getElementById("lblFullName") as HTMLElement
        )?.textContent?.trim() || "";
      const bauEmail =
        (
          document.getElementById("lblBAUEmail") as HTMLElement
        )?.textContent?.trim() || "";
      const personalEmail =
        (
          document.getElementById("lblPersonalEmail") as HTMLElement
        )?.textContent?.trim() || "";

      // Create an object to store the data
      
      return {
        banID,
        fullName,
        bauEmail,
        personalEmail,
        
      };
    });
    
    //console.log(data);

    try {
      await page.goto(
        "https://mis.bau.edu.lb/web/v12/iconnectv12/cas/intermediate.aspx?TargetURL=https://mis.bau.edu.lb/web/v12/iconnectv12/base/profileV2.aspx"
      );
    } catch (err) {
      console.log("NAVIGATING TO LINK " + err);
    }

    // Wait for the table to be available, adjust the selector as needed
    const tableSelector = "#AcademicHistory";
    await page.waitForSelector(tableSelector);

    let allTableData: string[][] = [];

    while (true) {
      // Extract data from the current page
      const tableData: string[][] = await page.evaluate(
        extractDataFromPage,
        tableSelector
      );
      allTableData = allTableData.concat(tableData);

      const nextPageButton = await page.$(".pagination .next");
      if (nextPageButton) {
        const isDisabled = await nextPageButton.evaluate((button) =>
          button.classList.contains("disabled")
        );
        if (isDisabled) {
          break;
        }
        await nextPageButton.click();

        await page.waitForSelector(tableSelector, { timeout: 5000 });
      } else {
        break;
      }
    }

    // Print all the extracted data

    const finalCourses = allTableData
    .filter((item) => !item[0].includes("Lebanese baccalaureate or Eqv."))
    .map((item) => ({
      Term: item[0],
      Course: item[1],
      Title: item[2],
      Credits: parseFloat(item[3]),
      Level: item[4],
      Grade: item[5],
      SGPA: parseFloat(item[6]),
    }));
  


     let studentData = {
      studentPersonalData: {
        ...data,
        department: body.department, // Add the department from the request body
      },
      studentCoursesData: finalCourses,
    };

    await browser.close();
    return studentData;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};


type reqBodyType = {
  username: string;
  password: string;
  department: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const body: reqBodyType = await req.json();
    console.log(body);

    const data = await lunchScraping(body);
    if (data != null) {
      return new NextResponse(
        JSON.stringify({ data, message: "Data retrieved successfully" }),
        { status: 201 }
      );
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};
