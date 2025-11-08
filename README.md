# 🎓 Courses Management System (FYP Project)

This is my **Final Year Project (FYP)**, a system designed to help students efficiently manage their courses and generate an optimized schedule based on their taken, available, and prerequisite courses.

---

## 🚀 Features & Functionality

* **Course Data Input**: Retrieve courses via **Excel upload** or **web scraping**.
* **Course Comparison**: Compares student data with available courses, prerequisites, and course conditions (based on completed credits).
* **Schedule Generation**: Generates a suggested course schedule based on priority rules.
* **Local Storage**: Saves progress and intermediate data locally for continuity.
* **Priority Rules**: Courses are prioritized based on:

  * Required major courses
  * Common/core courses
  * Prerequisites
  * Courses with least options (CRNs)
  * Days availability

---

## ⚙ Tech Stack

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| Next.js 14    | Frontend framework               |
| React 18      | UI components                    |
| TypeScript 5  | Type safety and maintainability  |
| Tailwind CSS  | Styling and responsive design    |
| Framer Motion | Animations                       |
| React Flow    | Visualization of course plans    |
| Puppeteer     | Web scraping of course offerings |
| Node-xlsx     | Excel file parsing               |
| Radix UI      | Accessible UI components         |
| LocalStorage  | Data persistence                 |

---

## 🛠 How It Works

1. **Retrieve Courses** – Input courses via Excel or scraping.
2. **Fetch Course Offerings** – Get the list of courses available.
3. **Compare Courses** – Determine remaining courses based on:

   * Taken courses
   * Available courses
   * Prerequisites
   * Course-specific conditions
4. **Generate Schedule** – Suggests a schedule with prioritized courses.
5. **Data Saving** – Progress saved in **localStorage** at each step.

---

## 💡 Future Improvements / Work

* Refine the **course offering API** for better control and performance.
* Implement **server-side saving** for faster results and persistence.
* Add **student profiles** for saving data and teacher monitoring.
* Integrate a **chatbot** for responsive guidance.
* Improve **validations** and **data checking**.
* Finish and clean up the **schedule generation code**.
* Implement a **Q/A system** to assist students and teachers.

---

## 📦 Current Project Components

* Database design (via ER diagrams)
* Plan generation library with code implementation (using **ELK** or manual positioning)
* Schedule generation logic with course prioritization

---

## 🗓 Last Update

* **29 Dec. 2023**

---

## 📫 Contact

* **Email**: [shaabanahmad02@gmail.com](mailto:shaabanahmad02@gmail.com)

> For any questions or collaborations, feel free to reach out.
