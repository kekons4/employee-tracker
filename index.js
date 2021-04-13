//Imports
const mysql = require("mysql");
const inquirer = require("inquirer");
const employee = require("./class/employee");
const role = require("./class/role");
const department = require("./class/department");

inquirer.prompt([{
        type: "list",
        choices: [
            "View All Employees", new inquirer.Separator(),
            "View Employees by Department", new inquirer.Separator(),
            "View Employees by Role", new inquirer.Separator(),
            "Add Employee", new inquirer.Separator(),
            "Remove Employee", new inquirer.Separator(),
            "Update Employee Role", new inquirer.Separator(),
            "Update Employee Manager", new inquirer.Separator()
        ],
        message: "What would you like to do?",
        name: "choice"
    }])
    .then(response => {
        console.log(response.choice);
    })