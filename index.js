const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/db')

// cfonts for ascii logo
const cfonts = require('cfonts');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const init = () => {
  cfonts.say('Employee|Manager', {font: 'simple3d'});
  inquirer
    .prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: [
            'View All Departments',
            'Add a Department',
            new inquirer.Separator(),
            'View All Roles',
            'Add a Role',
            new inquirer.Separator(),
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',
            new inquirer.Separator(),
        ]
    }]).then(res => {
      switch(res.options) {
        case 'View All Departments':
          return db.viewStuff('department');
        case 'View All Roles':
          return db.viewStuff('role');
        case 'View All Employees':
          return db.viewStuff('employee');
        case 'Add A Department':
          return addDept();
        case 'Add A Role':
          return addRole();
        case 'Add An Employee':
          return addEmployee();
        case 'Update An Employee Role':
          return update();
      }
    })
};

init();