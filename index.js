const inquirer = require('inquirer');
const db = require('./db/index');
const { findAllDepartments, findAllRoles } = require('./db/index');
const queries = require ("./db/index");
const logo = require('asciiart-logo');
const config = require('./package.json');
const cTable = require('console.table');



const init = () => {
  console.log(logo({
    name: 'Employee Tracker',
    font: 'ANSI Shadow',
    lineChars: 10,
    padding: 5, 
    margin: 5,
    borderColor: 'green',
    logoColor: 'bold-green'
  })
  .render());
  appMenu();
}


const appMenu = () => {
  inquirer.prompt(testQuestions)
  .then((data) => {
    console.log(data)
    switch(data.answer) {
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Employee':
        // addEmployee();
        break;
      case 'Update Employee Role':
        // updateEmployee();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'Add Role':
        // addRole();
        break;
      case 'View All Departments':
        viewDepartments();
        break;
      case 'Add Department':
        // addDepartment();
        break;
      case 'Quit':
        // quit();
        break;   
    }
  }) 
}

const testQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees", 
      "Add Employee", 
      "Update Employee Role", 
      "View All Roles", 
      "Add Role", 
      "View All Departments", 
      "Add Department",
      "Quit"
    ],
    name: "answer",
  }
]

const viewDepartments = () => {
  db.findAllDepartments()
  .then(([data]) => {
    console.table(data);
  })
  .then(() => {
    appMenu();
  })
}

const viewRoles = () => {
  db.findAllRoles()
  .then(([data]) => {
    console.table(data);
  })
  .then(() => {
    appMenu();
  })
}

const viewEmployees = () => {
  db.findAllEmployees()
  .then(([data]) => {
    console.table(data)
  })
  .then(() => {
    appMenu();
  })
}

init();

// ask questions