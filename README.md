<h1 align="center" id="title">Employee Manager</h1>
<div align="center">

![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/samelimill/buffered-up-soda)
![Express badge](https://img.shields.io/badge/express-green?logo=express)
![Node badge](https://img.shields.io/badge/node-yellow?logo=node.js)
![MySQL badge](https://img.shields.io/badge/mysql-orange?logo=mysql)

Keep track of employees, roles, and departments with this CLI.
</div>

## Objectives
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
## Usage and Installation
For this CLI, after downloading the repository and installing Node.js, the user will need to open the MySQL Shell and run the following commands: 
```
SOURCE db/schema.sql;
SOURCE db/seeds.sql;
```
After this, the user will be able to launch the CLI by typing:
```
node server
```

## Demo
A demo video of the CLI can be found [here](https://drive.google.com/file/d/1PL36BzQ39mrIrEKzzlKYe4rklLtNyd1C/view).