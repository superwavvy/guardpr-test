const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123', // hardcoded credential
    database: 'users'
});

app.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    // SQL injection vulnerability
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.query(query, (err, results) => {
        if (err) return res.send('Error');
        res.send(results.length > 0 ? 'Logged in!' : 'Failed');
    });
});

app.listen(3000);
