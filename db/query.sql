-- Show all departments
-- SELECT * FROM department;

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


-- -- Show all employees
SELECT 
  e.id,
  e.first_name,
  e.last_name,
  r.title,
  d.name,
  r.salary,
  CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee e
JOIN role r ON 
  r.id = e.role_id
JOIN department d ON
  d.id = r.department_id
LEFT JOIN employee m ON
  e.manager_id = m.id;
  