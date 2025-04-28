const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Your MySQL user
    password: 'Hrushi@2003',        // Your MySQL password
    database: 'EventInfo' // Ensure this DB exists
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'EventRegForm.html'));
});

app.post('/submit', (req, res) => {
    const { name, dob,gender,phone,email,source2,sourceOther,tickets,payment,agreement,signature,dateSigned} = req.body;
    const sql = 'INSERT INTO partispant_data (name,dob,gender,phone,email,source2,sourceOther,tickets,payment,agreement,signatur,dateSigned) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, [name,dob,gender,phone,email,source2,sourceOther,tickets,payment,agreement,signature,dateSigned], (err, result) => {
        if (err) throw err;
        res.send('your record added successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM partispant_data';
    db.query(sql, (err, results) => {
        if (err) throw err;

        // Build a simple HTML table
        let html = `
            <h2>All Students</h2>
            <table border="1" cellpadding="8" cellspacing="0">
                <tr>
                    <th>Name</th>
                    <th>Dob/th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>source2</th>
                    <th>sourceOther</th>
                    <th>tickets</th>
                    <th>payment</th>
                    <th>agreement</th>
                    <th>signature</th>
                    <th>dateSigned</th>
                </tr>
        `;

        results.forEach(row => {
            html += `
                <tr>
                    <td>${row.name}</td>
                    <td>${row.dob}</td>
                    <td>${row.gender}</td>
                    <td>${row.phone}</td>
                    <td>${row.email}</td>
                    <td>${row.source2}</td>
                    <td>${row.sourceOther}</td>
                    <td>${row.tickets}</td>
                    <td>${row.payment}</td>
                    <td>${row.agreement}</td>
                    <td>${row.signature}</td>
                    <td>${row.dateSigned}</td>
                </tr>
            `;
        });

        html += '</table><br><a href="/">Back to Form</a>';
        res.send(html);
    });
});
