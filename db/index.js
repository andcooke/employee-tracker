const db = require("./connection");


// Queries 

class Queries{
  constructor(db) {
    this.db = db;
  }
  findAllDepartments() {
    return this.db.promise().query("SELECT * FROM department;")
  }
  findAllRoles() {
    return this.db.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM department JOIN role ON role.department_id = department.id;")
  }
  findAllEmployees() {
    return this.db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e JOIN role r ON r.id = e.role_id JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON e.manager_id = m.id;')
  }
  insertDepartment(input) {
    return this.db.promise().query('INSERT INTO department (name) VALUES(?);', input)
  }
  insertRole(input) {
    return this.db.promise().query('INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?);', input)
  }
  showDepartment(input) {
    return this.db.promise().query('SELECT id FROM department WHERE name = ?', input)
  }
} 

module.exports = new Queries(db)