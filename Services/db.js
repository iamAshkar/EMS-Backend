// to connect node with MongoDB
// we need to install mongoose - npm i mongoose

// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Connect Node.js with mongoose
mongoose.connect('mongodb://localhost:27017/ems');

// Create model and schema
// Model - collection (employees)
// Schema - fields (id: string, name: string, age: string, designation: string, salary: string)

const EmployeeSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: String,
    designation: String,
    salary: String
});

// Create Employee model based on the schema
const Employee = mongoose.model('Employee', EmployeeSchema);

// Export the Employee model
module.exports = {
    Employee
};
