INSERT INTO department (name)
VALUES ("Apparel"),
       ("Basketball"),
       ("Plumbing"),
       ("Entertainment"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Men's Clothing", 30000, 1),
       ("Children's Clothing", 10000, 1),
       ("Women's Clothing", 60000, 1),
       ("Apparel Manager", 5000000, 1),
       ("Center", 15000000, 2),
       ("Guard", 30000000, 2),
       ("Forward", 20000000, 2),
       ("Basketball Manager", 10000000, 2),
       ("Toilet Repair", 60000, 3),
       ("Sink Man", 40000, 3),
       ("Jacuzzi Specialist", 70000, 3),
       ("Plumbing Manager", 2000000, 3),
       ("Ken Burns' Personal Assistant", 8000000, 4),
       ("Late Night Talk Show Host", 2000000, 4),
       ("Stage Director", 90000, 4),
       ("Entertainment Manager", 3000000, 4),
       ("Public Defender", 100000, 5),
       ("True Crime Interviewee", 500000, 5),
       ("District Attorney", 2000000, 5),
       ("Legal Manager", 12000000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Taylor", 4, NULL),
       ("James 'Tiny'", "Taylor Jr.", 3, 1),
       ("Jaymes", "Shmaylor", 12, NULL),
       ("Jaime", "Taylore", 10, 3),
       ("Taylor", "James", 8, NULL),
       ("Mahmoud", "Abdul-Rauf", 6, 5),
       ("Ken", "Burns", 16, NULL),
       ("Hakeem", "Olajuwon", 5, 5);

