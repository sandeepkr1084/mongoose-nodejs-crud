const express = require('express');
require('./config');

const app = express();

const employee = require('./employee');

app.use(express.json());

app.post('/add', (req, res) => {
    let data = new employee({name: req.body.name, email: req.body.email});

    data.save().then(result => {
        res.status(200).send(JSON.stringify(result));
    })
})

app.get('/getAll', (req, res) => {
    employee.find().then(result => {
        res.status(200).send(JSON.stringify(result));
    })
});

app.get('/get', (req, res) => {
    employee.find({_id: req.query.id}).then(result => {
        res.status(200).send(JSON.stringify(result));
    })
})

app.delete('/delete', (req, res) => {
    employee.deleteOne({_id: req.query.id}).then(result => {
        res.status(200).send(JSON.stringify(result));
    })
})

app.put('/update', (req, res) => {
    employee.updateOne({_id: req.query.id}, {$set: req.body}).then(result => {
        res.status(200).send(JSON.stringify(result));
    })
})

app.get('/search/:search_key', (req, res) => {
    employee.find({
        "$or": [
            {"name": {$regex: req.params.search_key}},
            {"email": {$regex: req.params.search_key}}
        ]
    }).then(result => {
        res.send(result);
    })
})

app.listen(5000);
