INSERT INTO department (name)
VALUES ('Sales'),
       ('Finance'),
       ('Engineering'),
       ('Maintenance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 100000, 1),
       ('Account Manager', 200000, 1),
       ('Engineer', 300000, 2),
       ('Janitor', 400000, 3),
       ('Lawyer', 500000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Hughes', 3, null),
       ('Jim', 'Ritchet', 2, 1),
       ('Diane', 'Podalis', 5, 2),
       ('Fannie', 'Weems', 1, 3),
       ('Owen', 'Wilson', 4, 4);

        
