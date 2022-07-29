-- Show all departments
-- SELECT * FROM department;

-- Add a department
-- USE office_db;
-- INSERT INTO department (name)
--   VALUES("Pizza");



-- const question = [
--   {
--     type: "list",
--     message: "Which department?"
--     -- choices: function();
--   }
-- ]

-- Show all roles
-- SELECT
--   role.id,
--   role.title,
--   department.name AS department,
--   role.salary
-- FROM
--   department
-- JOIN role ON
--   role.department_id = department.id;

-- Add a role
-- USE office_db;
-- INSERT INTO role (title, salary, department_id)
-- "cheese" is a response to the question, 15000 is a response, 6 is based off choices read from  department 
-- VALUES ("Cheese", 15000, 6);

-- -- Show all employees
-- SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e JOIN role r ON r.id = e.role_id JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON e.manager_id = m.id;

-- Add an employee

-- Update an employee


-- Quit
