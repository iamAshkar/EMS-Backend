//1 import express
const express = require('express')

//2 import cors
const cors = require('cors')

const logic = require('./Services/logic')

//3 create a backend app using express
const emsServer = express()//Creates an Express application. The express() function is a top-level function exported by the express module.

//4 connect from port using cors
emsServer.use(cors({
    origin: 'http://localhost:5173'
}))

//5 convert json data into js
emsServer.use(express.json())//Returns middleware that only parses json 

//6 create a port for backend
emsServer.listen(8000, () => {
    console.log('emserver listerning on the port 8000');
})

//http://localhost:8000
emsServer.get('/', (req, res) => {
    res.send('hellow')
})


emsServer.get('/api/get-all-employee', (req, res) => {
    logic.getEmployees().then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});


//http://localhost:8000/api/view-employee/58769
emsServer.get(`/api/view-employee/:id`, (req, res) => {
    logic.viewEmployee(req.params.id)
        .then((response) => {
            res.status(response.statusCode).json(response);
        })
})

//http://localhost:8000/api/add-employee

emsServer.post(`/api/add-employee`, (req, res) => {
    logic.addEmployee(req.body.id, req.body.name, req.body.age, req.body.designation, req.body.salary).then((response) => {
        res.status(response.statusCode).json(response);
    })
})

//http://localhost:8000/api/delete-employee/2

emsServer.delete('/api/delete-employee/:id', (req, res) => {

    logic.deleteEmployee(req.params.id).then((response) => {
        res.status(response.statusCode).json(response);
    });
});

//http://localhost:8000/api/update-employee/3
emsServer.post('/api/update-employee/:id', (req, res) => {
    logic.updateEmployee(req.params.id, req.body.name, req.body.age, req.body.designation, req.body.salary).then((response) => {
        res.status(response.statusCode).json(response);
    })
})
