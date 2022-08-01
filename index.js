const inquirer = require('inquirer');
const db = require('./db/index');
const { findAllDepartments, findAllRoles, viewDepartmentsReal } = require('./db/index');
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
        addRole();
        break;
      case 'View All Departments':
        viewDepartments();
        break;
      case 'Add Department':
        departmentsMenu();
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


const addDepartmentQuestion = [
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "addDepartment",
  }
]

const departmentsMenu = () => {
  inquirer.prompt(addDepartmentQuestion)
  .then((data) => {
    db.insertDepartment(data.addDepartment)
    console.log(`Added ${data.addDepartment} to the database` )
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

const addRole = async () => {
  const depData = await db.findAllDepartments()
  .then(([data]) => {
    return data.map(({ id, name }) => ({
      id: id,
      name: name,
    }));
  });
  const roleQuestions = [
    {
      type: "input",
      message: "What is the name of the new role?",
      name: "roleName" 
    },
    {
      type: "input",
      message: "What is the salary of the new role?",
      name: "roleSalary" 
    },
    {
      type: "list",
      message: "In which department does the new role belong?",
      choices: depData,
      name: "roleDepartment"
    },
  ]
  inquirer.prompt(roleQuestions)
  .then((data) => {
    // console.log(depData)
    let deptId = findId(depData, data.roleDepartment)
    const roleData = [data.roleName, data.roleSalary, deptId];
    db.insertRole(roleData);
    console.log(`Added ${data.roleName} to the database` )
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

const findId = (arr, input) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === input) {
      return arr[i].id;
    }
  }
}

init();

