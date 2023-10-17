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
      ]
  }]).then(res => {
    switch(res.options) {
      case 'View All Departments':
        return indexView('department');
      case 'Add a Department':
        
        console.log('hey')
        return addDept();
      case 'View All Roles':
        return indexView('role');
      case 'Add a Role':
        return addRole();
      case 'View All Employees':
        return indexView('employee');
      case 'Add an Employee':
        return addEmployee();
      case 'Update an Employee Role':
        return update();
    }
  })
};

const indexView = (location) => {
  db.viewStuff(location);
  routePrompt();
}

const addDept = () => {
  inquirer
    .prompt([{
      type: 'input',
      message: 'What is the name of the department you would like to add?',
      name: 'departmentInput',
    }])
    .then(res => {
      const addDeptData = {type:'Department',data:res.departmentInput}
      db.addStuff(addDeptData);
    })
};

const addRole = () => {
  inquirer
    .prompt([
      
    ])
}
init();
