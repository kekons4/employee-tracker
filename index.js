//Imports
const mysql = require("mysql");
const inquirer = require("inquirer");
const employee = require("./class/employee");
const role = require("./class/role");
const department = require("./class/department");

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'Paladinware#!1',
    database: 'employee_tracker',
});

const viewAllEmp = () => {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, results) => {
        console.log(results);
    })
}

const main = () => {
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
            if (response.choice === "View All Employees") {
                viewAllEmp();
            } else if (response.choice === "View Employees by Department") {
                viewEmpDep();
            } else if (response.choice === "View Employees by Role") {
                viewEmpRole();
            } else if (response.choice === "Add Employee") {
                addEmp();
            } else if (response.choice === "Remove Employee") {
                remEmp();
            } else if (response.choice === "Update Employee Role") {
                updEmpRole();
            } else if (response.choice === "Update Employee Manager") {
                updEmpMan();
            } else {
                console.log("ERROR in choice try again ...");
                main();
            }
        })
}

// upon connection go to main function
connection.connect(err => {
    if (err) throw err;
    main();
})