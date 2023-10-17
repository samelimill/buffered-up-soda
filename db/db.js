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
        `SELECT id AS 'ID', name AS 'Department'
        FROM department
        ORDER BY id ASC`;
    } else if (location === 'role'){
        queryString = 
        `SELECT title AS 'Role', name AS 'Department', salary AS 'Salary'
        FROM role
        LEFT OUTER JOIN department ON role.department_id = department.id
        GROUP BY role.id
        ORDER BY title ASC`;
    } else if (location === 'employee'){
        queryString = 
        `SELECT GROUP_CONCAT(DISTINCT last_name,', ', first_name) AS 'Name', title AS 'Title', name AS 'Department', salary AS 'Salary', manager_id AS 'Manager'
        FROM employee
        LEFT OUTER JOIN role ON employee.role_id = role.id
        LEFT OUTER JOIN department ON role.department_id = department.id
        GROUP BY employee.id
        ORDER BY last_name ASC`;
    }
    console.log(queryString);
    db.query(queryString, (err, res) => {
        if (err){
            console.log(err)
        } else {
            console.log('\n');
            console.table(res);
        }
    });
};

module.exports = {
    viewStuff
};