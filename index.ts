#!/usr/bin/node

import inquirer from "inquirer";
import showBanner from "node-banner";

class Student {
  //defines a class called Student. A class is a blueprint for creating objects.
  id: number; //The id property is the student's ID number.
  name: string; //The name property is the student's name.
  courses: string[]; //The courses property is an array of the courses that the student is enrolled in.
  balance: number; //The balance property is the student's tuition balance.

  constructor(name: string) {
    //the constructor for the Student class. The constructor is a special method that is called when an object is created from the class.
    this.id = Math.floor(Math.random() * 10000) + 1; //assigns a random ID number to the new student.
    this.name = name; //assigns the name of the student to the name property.
    this.courses = []; // initializes the courses property to an empty array.
    this.balance = Math.floor(Math.random() * 10000) + 1; // Generating random balance between 1 and 1000.
  }

  // This method returns the student's ID number.
  getId(): number {
    return this.id;
  }

  // This method returns the student's name.
  getName(): string {
    return this.name;
  }

  // This method enrolls the student in a course. The method takes a course name as its argument and adds the course name to the courses property.
  enroll(course: string): void {
    this.courses.push(course);
  }

  // This method returns the student's tuition balance.
  viewBalance(): number {
    return this.balance;
  }

  // This method reduces the student's tuition balance by the specified amount.
  payTuition(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Insufficient balance to pay tuition.");
    }
  }

  // This method displays the student's status, including their ID number, name, courses enrolled, and tuition balance.
  showStatus(): void {
    console.log(`Student ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
    console.log(`Balance: $${this.balance}`);
  }
}

(async () => {
  await showBanner(
    "Student Management System",
    "Welcome to the Student Management System",
    "red"
  );
})();

const students: Student[] = []; //store students here

// This line defines an asynchronous function called enrollStudent.
//An asynchronous function is a function that can do things that take time, such as reading from a file or making a network request.

async function enrollStudent(): Promise<void> {
  //Promise<void> the enrollStudent() function returns a promise that resolves to void.
  await inquirer //uses the inquirer module to prompt the user for the student's name.
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter student name:",
      },
    ])
    .then((studentName) => {
      //uses the then method to attach a callback function to the promise.
      const student = new Student(studentName.name);
      students.push(student); //creates a new Student object with the specified name and adds it to the students array.

      console.log(
        //logs a message to the console that the student has been enrolled.
        `Student ${student.getName()} has been enrolled with ID ${student.getId()}`
      );
      mainMenu(); //calls the mainMenu() function, which will display the main menu of the application.
    });
}

async function payTuition(): Promise<void> {
  //defines an asynchronous function called payTuition
  await inquirer //uses the inquirer module to prompt the user for the student's ID and the amount of tuition to pay.
    .prompt([
      {
        type: "input",
        name: "studentId",
        message: "Enter student ID:",
      },
      {
        type: "number",
        name: "amount",
        message: "Enter tuition amount:",
      },
    ])
    .then((studentPay) => {
      //the callback function will find the student with the specified ID, reduce their tuition balance by the specified amount, and then log a message to the console.
      const student = students.find((s) => s.getId() === +studentPay.studentId); //finds the student with the specified ID by looping through the students array and comparing the ID of each student to the specified ID.

      if (student) {
        // checks if the student was found.
        student.payTuition(studentPay.amount); //If the student was found, the payTuition() method is called to reduce their tuition balance by the specified amount.
        console.log(`Tuition paid. Updated balance: $${student.viewBalance()}`); //The viewBalance() method is then called to get the student's updated balance. The message Tuition paid. Updated balance: $${student.viewBalance()} is then logged to the console.
      } else {
        console.log("Student not found.");
      }
      mainMenu();
    });
}

async function viewStudentBalance(): Promise<void> {
  //defines an asynchronous function called viewStudentBalance
  await inquirer //uses the inquirer module to prompt the user for the student's ID
    .prompt([
      {
        type: "input",
        name: "studentId",
        message: "Enter student ID:",
      },
    ])
    .then((studentIdInput) => {
      //callback function when promise resolved then this function run statements
      const student = students.find(
        // finds the student with the specified ID by looping through the student array and comparing the ID of each student to the specified ID.
        (s) => s.getId() === +studentIdInput.studentId
      );
      if (student) {
        //student pass as a condition if student id is exist so it will print console
        console.log(
          `Student ${student.getName()}'s Balance: $${student.viewBalance()}`
        );
      } else {
        //if not so else console will run
        console.log("Student not found.");
      }
      mainMenu(); //mainMenu() function is then called to display the main menu of the application.
    });
}

async function enrollInCourse(student: Student): Promise<void> {
  //defines an asynchronous function called enrollInCourse
  await inquirer // uses the inquirer module to prompt the user for the course name. The prompt method returns a promise
    .prompt([
      {
        type: "input",
        name: "course",
        message: "Enter course name:",
      },
    ])
    .then((enrollcourse) => {
      // uses the then method to attach a callback function to the promise.
      student.enroll(enrollcourse.course); //enrolls the student in the specified course. The enroll() method takes the course name as its argument.
      console.log(
        //logs a message to the console that the student has been enrolled in the course.
        `Student ${student.getName()} has been enrolled in course: ${
          enrollcourse.course
        }`
      );
      mainMenu();
    });
}

async function showStatus(): Promise<void> {
  //defines an asynchronous function called showStatus.
  await inquirer // uses the inquirer module to prompt the user for the student ID
    .prompt([
      {
        type: "input",
        name: "studentId",
        message: "Enter student ID:",
      },
    ])
    .then((studentStatus) => {
      //uses the then method to attach a callback function to the promise.
      const student = students.find(
        //find() method takes a callback function as its argument.
        (s) => s.getId() === +studentStatus.studentId //the callback function checks if the student's ID is equal to the specified ID. The + operator is used to convert the string value of the studentStatus.studentId property to a number.
      );
      if (student) {
        student.showStatus(); //If the student was found, the showStatus() method is called to display the student's status.
      } else {
        console.log("Student not found."); //Otherwise, the message "Student not found" is displayed to the console.
      }
      mainMenu();
    });
}

async function showAllStudentsStatus(): Promise<void> {
  //an asynchronous function called showAllStudentsStatus
  console.log("Status of all enrolled students:"); //logs a message to the console
  students.forEach((student) => {
    //iterates through the students array and calls the showStatus() method for each student forEach() method takes a callback function as its argument.
    student.showStatus(); //The showStatus() method displays the status of the student, including their ID number, name, courses enrolled, and tuition balance
    console.log("-------------------");
  });
  mainMenu();
}

async function mainMenu(): Promise<void> {
  //an asynchronus function called
  await inquirer // uses the inquirer module to prompt the user for an action
    .prompt([
      //The promise will be resolved with the user's choice when the user enters it.
      {
        type: "list",
        name: "action",
        message: "Select an action:",
        choices: [
          "Enroll Student",
          "Enroll Course",
          "Pay Tuition",
          "View Balance",
          "Show Status",
          "Show All Students Status",
          "Exit",
        ],
      },
    ])
    .then(async (method) => {
      //then method to attach a callback function to the promise.
      switch (
        method.action //the callback function will execute the action that the user has chosen.
      ) {
        case "Enroll Student":
          enrollStudent();
          break;
        case "Enroll Course": //in this case by using prompt through studentid and then find student using find method and then enroll a student in that course
          const studentId: {
            studentId: number;
          } = await inquirer.prompt([
            {
              type: "input",
              name: "studentId",
              message: "Enter student ID:",
            },
          ]);
          const student = students.find(
            (s) => s.getId() === +studentId.studentId
          );
          if (student) {
            await enrollInCourse(student);
          } else {
            console.log("Student not found.");
          }
          break;
        case "Pay Tuition":
          payTuition();
          break;
        case "View Balance": // Added case for viewing balance
          viewStudentBalance();
          break;
        case "Show Status":
          showStatus();
          break;
        case "Show All Students Status":
          await showAllStudentsStatus();
          break;
        case "Exit":
          console.log("Exiting...");
          process.exit();
      }
    });
}

setTimeout(() => {
  mainMenu();
}, 1000);
