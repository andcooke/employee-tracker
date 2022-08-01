const inquirer = require('inquirer');
const db = require('./db/index');
const { findAllDepartments, findAllRoles, viewDepartmentsReal } = require('./db/index');
const queries = require ("./db/index");
const logo = require('asciiart-logo');
const config = require('./package.json');
const cTable = require('console.table');


//Initial function
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

//Recurring questions after every selection prompt track
const appMenu = () => {
  inquirer.prompt(appQuestions)
  .then((data) => {
    console.log(data)
    switch(data.answer) {
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployee();
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
        addDepartment();
        break;
      case 'Quit':
        // quit();
        break;   
    }
  }) 
}

//Main questions
const appQuestions = [
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

//View Departments
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
    name: "department",
  }
]

const addDepartment = () => {
  inquirer.prompt(addDepartmentQuestion)
  .then((data) => {
    db.insertDepartment(data.department)
    console.log(`Added ${data.department} to the database` )
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
    let deptId = findId(depData, data.roleDepartment, "name")
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


const addEmployee = async () => {
  let roles = [];
  let result;
  let man;
  let managers = ["None"];
  const roleData = await db.findAllRoles()
  .then(([data]) => {
    result = data.map(({ id, title, salary }) => ({
      id: id,
      title: title,
      salary: salary,
    }));
    for (let i = 0; i < result.length ; i++) {
      roles.push(result[i].title)
    }
  });
  const employeeData = await db.findAllEmployees()
  .then(([data]) => {
    man = data.map(({ id, first_name, last_name }) => ({
      id: id,
      first_name: first_name,
      last_name: last_name,
    }));
    for (let i = 0; i < data.length; i++) {
      if (data[i].manager === null){
        managers.push(`${data[i].first_name} ${data[i].last_name}`)
      }
    }
  })
  const employeeQuestions = [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName" 
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName" 
    },
    {
      type: "list",
      message: "What is the employee's role?",
      choices: roles,
      name: "employeeRole"
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      choices: managers,
      name: "manager" 
    },
  ]
  inquirer.prompt(employeeQuestions)
  .then((data) => {
    //first name
    let employeeInput = [];
    // console.log(employeeInput);
    const roleId = findId(result, data.employeeRole, "title");
    const managerId = findId(man, data.manager, "first_name");
    employeeInput.push(data.firstName, data.lastName, roleId, managerId);
    db.insertEmployee(employeeInput);
    console.log(`Added ${data.firstName} ${data.lastName} to the database` )
  })
  .then(() => {
    appMenu();
  })
}


const updateEmployee = async () => {
  let roles = [];
  let employees = [];
  let emp;
  const roleData = await db.findAllRoles()
  .then(([data]) => {
    result = data.map(({ id, title, salary }) => ({
      id: id,
      title: title,
      salary: salary,
    }));
    for (let i = 0; i < result.length ; i++) {
      roles.push(result[i].title)
    }
  });
  const employeeData = await db.findAllEmployees()
  .then(([data]) => {
    emp = data.map(({ id, first_name, last_name }) => ({
      id: id,
      first_name: first_name,
      last_name: last_name,
    }));
    for (let i = 0; i < data.length; i++) {
      employees.push(`${data[i].first_name} ${data[i].last_name}`)
    }
  })
  const updateQuestions = [
    {
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: employees,
      name: "updateEmployee"
    },
    {
      type: "list",
      message: "Which role do you want to assign to the selected employee?",
      choices: roles,
      name: "updateRole"
    }
  ]
  inquirer.prompt(updateQuestions)
  .then((data) => {
    let updateData = [];
    let employeeId = findId(emp, data.updateEmployee, "first_name");
    let roleId = findId (result, data.updateRole, "title")
    updateData.push(roleId, employeeId);
    db.update(updateData);
    console.log(`Updated ${data.updateEmployee}'s role in the database` )
  })
  .then(() => {
    appMenu();
  })
}

const findId = (arr, input, param) => {
  if (param === "first_name"){
    input = input.split(" ")[0];
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][param] === input) {
      return arr[i].id;
    }
  }
  return null;
}

init();