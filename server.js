const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

app = use(express);

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

inquirer
    .prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee'
        ]
    }]);