const mysql = require('mysql2');
require('dotenv').config();
require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employee_db'
    });

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
        GROUP BY role.id
        ORDER BY title ASC`;
    } else if (location === 'employee'){
        queryString = 
        `SELECT employee.id AS 'ID', first_name as 'First Name', last_name as 'Last Name', title AS 'Title', name AS 'Department', salary AS 'Salary', manager_id AS 'Manager'
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY employee.id
        ORDER BY last_name ASC`;
    }
    db.query(queryString, (err, res) => {
        if (err){
            console.log(err)
        } else {
            console.log('\n');
            console.table(res);
        }
    });
};

const addStuff = (stuff) => {
    var queryString = '';
    if (stuff.type === 'Department'){
        queryString = `
        INSERT INTO department (name)
        VALUES ('${stuff.data}')`
    } else if (stuff.type = 'Role'){
        queryString = `INSERT INTO role (title, salary, department_id)
        VALUES (${stuff.title},${stuff.salary},${stuff.department})`
    }
    db.query(queryString, (err, res) => {
        if (err){
            console.log(err)
        } else {
            console.log(`${stuff.type} added`)
        }
    });
}

module.exports = {
    viewStuff,
    addStuff,
};