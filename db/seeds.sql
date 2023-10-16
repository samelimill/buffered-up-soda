INSERT INTO department (name)
VALUES (Sales),
       (Finance),
       (Engineering),
       (Maintenance),
       (Legal);

INSERT INTO role (title, salary)
VALUES (Salesperson, 100000),
       (Account Manager, 200000),
       (Engineer, 300000),
       (Janitor, 400000),
       (Lawyer, 500000);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("The Great Gatsby", true, 1),
       ("Huckleberry Finn", true, 3),
       ("100 Years of Solitude", false, 5),
       ("Things Fall Apart", false, 1),
       ("Crime and Punishment", true, 2),
       ("Moby Dick", true, 4),
       ("Decameron", false, 1);