const express = require('express')
const app = express()
const host = '0.0.0.0';
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb',
    multipleStatements: true,
};
const util = require('util');
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Espedito')`
connection.query(sql)
connection.end()

var nameList = "";


app.get('/', (req,res) => {
    nameList = "";
    const connection = mysql.createConnection(config)
    const query = util.promisify(connection.query).bind(connection);

    (async () => {
    try {
        const rows = await query('select * from people');
        rows.forEach(function(row) {
          nameList += `<li>${row.name}</li>`;
        });
    } finally {
        connection.end();
        res.send('<h1>Full Cycle Rocks!</h1>' + nameList)
    }
    })()

})

app.listen(port, host);