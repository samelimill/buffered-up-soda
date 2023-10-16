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
        queryString = `SELECT id AS 'ID', name AS 'Department'
        FROM department
        ORDER BY id ASC`;
    } else if (location === 'role'){
        queryString = "
        "
    }
    db.query(queryString, (err, res) => {
        console.log('\n');
        console.table(res);
    });
};

module.exports = {
    viewStuff
};