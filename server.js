const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
require('console.table');
// cfonts for ascii logo
const cfonts = require('cfonts');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employee_db'
    });

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const init = () => {
  cfonts.say('Employee|Manager', {font: 'simple3d'});
  routePrompt();
};


const routePrompt = () => {
  inquirer
  .prompt([{
      type: 'list',
      message: 'What would you like to do?',
      name: 'options',
      choices: [
          'View All Employees',
          'Add an Employee',
          'Update an Employee Role',
          new inquirer.Separator(),
          'View All Departments',
          'Add a Department',
          new inquirer.Separator(),
          'View All Roles',
          'Add a Role',
          new inquirer.Separator(),
          'Quit',
          new inquirer.Separator(),
      ]
  }]).then(res => {
    switch(res.options) {
      case 'View All Departments':
        return viewStuff('department');
      case 'Add a Department':
        return addDept();
      case 'View All Roles':
        return viewStuff('role');
      case 'Add a Role':
        return addRole();
      case 'View All Employees':
        return viewStuff('employee');
      case 'Add an Employee':
        return addEmployee();
      case 'Update an Employee Role':
        return update();
      case 'Quit':
        return process.exit() ;
    }
  })
};

const viewStuff = (location) => {
  var queryString = ``;
  if (location === 'department'){
      queryString = 
      `SELECT department.id AS 'ID', name AS 'Department'
      FROM department
      ORDER BY id ASC`;
  } else if (location === 'role'){
      queryString = 
      `SELECT role.id AS 'ID', title AS 'Role', name AS 'Department', salary AS 'Salary'
      FROM role
      LEFT OUTER JOIN department ON role.department_id = department.id
      ORDER BY name ASC`;
  } else if (location === 'employee'){
      queryString = 
      `SELECT e1.id AS 'ID', e1.first_name as 'First Name', e1.last_name as 'Last Name', title AS 'Title', name AS 'Department', salary AS 'Salary', GROUP_CONCAT(DISTINCT e2.first_name,' ', e2.last_name) AS 'Manager'
      FROM employee e1
      LEFT JOIN role ON e1.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee e2 ON e1.manager_id = e2.id
      GROUP BY e1.id
      ORDER BY e1.last_name ASC`;
  }
  db.query(queryString, (err, res) => {
      if (err){
          console.log(err)
      } else {
          console.log('\n');
          console.table(res);
          routePrompt()
      }
  });
};

const addDept = () => {
  inquirer
    .prompt([{
      type: 'input',
      message: 'What is the name of the department you would like to add?',
      name: 'departmentInput',
    }])
    .then(res => {
      db.query(`INSERT INTO department (name) VALUES ('${res.departmentInput}');`, (err, res) => {
        if (err){
            console.log(err)
        } else {
            console.log('Department Added!');
            routePrompt();
        }}
      )
    })
  };

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the title of the role you would like to add?',
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'Please enter the ID of the department to which this role belongs: ',
        name: 'roleDept',
      },
      {
        type: 'input',
        message: 'What is the salary of this role?',
        name: 'roleSal',
      }
    ]).then(res => {
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.roleName}',${res.roleSal},${res.roleDept});`, (err, res) => {
        if (err){
            console.log(err)
        } else {
            console.log('Role added!');
            routePrompt();
        }}
      )
    })
  };

const addEmployee = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'empFirstName',
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'empLastName',
    },
    {
      type: 'input',
      message: "Please enter the ID of the employee's role:",
      name: 'empRoleID',
    },
    {
      type: 'input',
      message: "Please enter the ID of the employee's manager:",
      name: 'empMangID',
    }
  ]).then(res => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.empFirstName}','${res.empLastName}',${res.empRoleID},${res.empMangID});`, (err, res) => {
        if (err){
          console.log(err)
        } else {
          console.log('Employee added!');
          routePrompt();
        }}
      )
    })
  };

const update = () => {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Please enter the ID of the employee to be updated:",
      name: "empID",
    },
    {
      type: "input",
      message: "Please enter the ID of this employee's new role:",
      name: 'empRoleID',
    },
  ]).then(res => {
    db.query(`UPDATE employee SET role_id =${res.empRoleID} WHERE id=${res.empID};`, (err, res) => {
      if (err){
        console.log(err)
      } else {
        console.log('Employee updated!');
        routePrompt();
      }}
    )
  })
};

init();
