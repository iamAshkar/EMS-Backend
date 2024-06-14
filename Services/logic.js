// Import db.js file
const { response } = require('express');
const db = require('./db');

// Define the functions
// 1. GET all employees from the database (mongodb)
const getEmployees = () => {
    return db.Employee.find().then(
        (result) => { // All employees details
            if (result && result.length > 0) {
                return {
                    statusCode: 200,
                    employees: result
                };
            } else {
                return {
                    statusCode: 404,
                    message: "No Data Found"
                };
            }
        }
    );
};

// 2. View an employee by ID from the database (mongodb)
const viewEmployee = (id) => {
    return db.Employee.findOne({id}).then(
        (result) => { // Single employee details
            if (result) {
                return {
                    statusCode: 200,
                    employee: result
                };
            } else {
                return {
                    statusCode: 404,
                    message: "Employee not found"
                };
            }
        }
    );
};



// 3. add a new emplyee to the database

const addEmployee=(id,name,age,designation,salary)=>{
    //check if the employee id already exists
    return db.Employee.findOne({id}).then((result)=>{
        if (result) {
            return{
                statusCode:401,
                message:'Employee already exists'
            }
        }
        else{
            //otherwise save the employee details
            const employeeData = new db.Employee({id,name,age,designation,salary})
            //save the employee details
            employeeData.save()
            //send response back to the client
            return{
                statusCode:200,
                message:'Employee added succesfully'
            }
        }
    })
}

// 4. delete a employee

const deleteEmployee = (id) => {
    return db.Employee.deleteOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                message: 'Employee deleted successfully'
            };
        } else {
            return {
                statusCode: 404,
                message: 'Employee not found'
            };
        }
    })
};

//4. update the employee detilas
const updateEmployee =(id,name,age,designation,salary)=>{
    return db.Employee.findOne({id}).then((response)=>{   //response = oold employee detilas
        if (response) {
            //assign the new employee details into db
            response.id =id;
            response.name=name;
            response.age=age;
            response.designation=designation;
            response.salary=salary;
            //to save in databse
            response.save()
            return{
                statusCode:200,
                message:"Employee updated succesfully"
            }
            }else{
                return{
                    statusCode:404,
                    message: 'Employee not found'
                }
        }
    })
}

module.exports = {
    getEmployees,
    viewEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee
};
