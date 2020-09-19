// start with node index.js

const express = require('express')
const sqlite3 = require('sqlite3')
const app = express()
const port = 3000

// sqlite stuff
let db;
//db.close()

// Express stuff

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/config/:configparam', (req, res) => {
    if (req.params.configparam === "dbconnect") {
        db = new sqlite3.Database('./gdve.sqlite3', (err) => {
            if (err) {
                console.error(err.message);
            }
            res.send('DB GdvE connected.')
        });
    } else if (req.params.configparam === "dbdisconnect") {
        db.close()
        res.send('DB closed.')
    } else {
        res.send('Unknown command.')
    }
})
app.get('/downloads/:dlid', (req, res) => {
    db.all(`SELECT * FROM downloads`, [], (err, rows) => {
        if (err) {
            throw err
        }
        res.json(rows.find(x => x.id === req.params.dlid).filename)
    })
})

app.post('/', (req, res) => {
    res.send('Ok, das war ein POST!')
})

app.put('/', (req, res) => {
    res.send('Ok, das war ein PUT!')
})

app.delete('/', (req, res) => {
    res.send('Ok, das war ein DELETE!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
