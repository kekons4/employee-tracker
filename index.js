//Imports
const mysql = require("mysql");
const inquirer = require("inquirer");

// Establish connection with database
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

// View all employees
const viewAllEmp = () => {
    // Query database and display rows
    const query = "SELECT * FROM employee";
    connection.query(query, (err, results) => {
        console.table(results);
    });
    main();
}

// View Employees by Role
const viewEmpRole = () => {
    // Ask Question
    inquirer.prompt([{
        type: "list",
        choices: [
            "1 Software Developer", new inquirer.Separator(),
            "2 Recruiter", new inquirer.Separator(),
            "3 Business Analyst", new inquirer.Separator(),
            "4 Operations Manager", new inquirer.Separator(),
            "5 Executive Accountant", new inquirer.Separator(),
            "6 Senior Software Developer", new inquirer.Separator()
        ],
        message: "Choose which role you want to see",
        name: "choice"
    }])
    .then(response => {
        // Query Database and display rows
        const query = `SELECT * FROM employee where role_id = ${Number.parseInt(response.choice.charAt(0))}`;
        connection.query(query, (err, results) => {
            console.table(results);
        })
        main();
    })
}

// View Employee by department
const viewEmpDep = () => {
    inquirer.prompt([{
        type: "list",
        choices: [
            "1 Information Technologies", new inquirer.Separator(),
            "2 Human Resources", new inquirer.Separator(),
            "3 Administration", new inquirer.Separator(),
            "4 Operations", new inquirer.Separator(),
            "5 Accounting", new inquirer.Separator()
        ],
        message: "Select a Department:",
        name: "choice"
    }])
    .then(response => {
        // Query the Database and display rows
        const query = `select * from employee as e left join role as r on e.role_id = r.id where r.id = ${Number.parseInt(response.choice.charAt(0))}`;
        connection.query(query, (err, results) => {
            console.table(results);
        })
        main();
    })
}

// Add employee to database
const addEmp = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter First Name:",
            name: "fname"
        },
        {
            type: "input",
            message: "Enter Last Name:",
            name: "lname"
        },
        {
            type: "list",
            choices: [
                "1 Software Developer", new inquirer.Separator(),
                "2 Recruiter", new inquirer.Separator(),
                "3 Business Analyst", new inquirer.Separator(),
                "4 Operations Manager", new inquirer.Separator(),
                "5 Executive Accountant", new inquirer.Separator(),
                "6 Senior Software Developer", new inquirer.Separator()
            ],
            message: "Which role is this employee",
            name: "role"
        },
        {
            type: "list",
            choices: [
                "1 Jerry Thomas", new inquirer.Separator(),
                "3 Delian Maxoff", new inquirer.Separator(),
                "5 Clide Hill", new inquirer.Separator(),
                "7 Elliot Stop", new inquirer.Separator(),
                "9 Keon Pourboghrat", new inquirer.Separator(),
                "None", new inquirer.Separator()
            ],
            message: "Who is this employees Manager?",
            name: "manager"
        }
    ])
    .then(response => {
        const parsedRole = response.role.split(" ");
        const parsedManager = response.manager.split(" ");
        const query = `insert into employee(first_name, last_name, role_id, manager_id)values("${response.fname}", "${response.lname}", ${Number.parseInt(parsedRole)}, ${Number.parseInt(parsedManager)})`;
        connection.query(query, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log("\nSuccessfully added Employee");
            }
        });
        main();
    })
}

// Add a department to db
const addDep = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Department?",
            name: "name"
        }
    ])
    .then(response => {
        const query = `insert into department (name) values("${response.name}")`;
        connection.query(query, (err, results) => {
            if(err) throw err;
            console.log(results);
            main();
        })
    })
}

// Add Roles
const addRole = () => {
    const query = `select * from department;`;
    connection.query(query, (err, results) => {
        const departments = [];
        for(let i = 0; i < results.length; i++) {
            departments.push(`${results[i].id} ${results[i].name}`);
        }
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the Role?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the salary?",
                name: "salary"
            },
            {
                type: "list",
                choices: [...departments],
                message: "Choice which department it belongs to:",
                name: "department"
            }
        ])
        .then(response => {
            const id = response.department.split(" ")[0];
            console.log(id);
            const queryTwo = `insert into role (title, salary, department_id) values("${response.name}", ${Number.parseFloat(response.salary)}, ${Number.parseInt(id)})`;
            connection.query(queryTwo, (err, results) => {
                if(err) throw err;
                console.log(results);
                main();
            })
        })
    })
}

// Remove an Employee
const remEmp = async() => {
    const queryOne = `select id, first_name, last_name from employee;`;
    connection.query(queryOne, (err, results) => {
        // fullNames = [...results];
        // for(let i = 0; i < results.length; i++) {
        //     fullNames.push(`${results[i].id} ${results.fname} ${results.lname}`);
        // }
        // console.table(fullNames);
        const fullNames = [];
        for(let i = 0; i < results.length; i++) {
            fullNames.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
        inquirer.prompt([
            {
                type: "list",
                choices: [...fullNames],
                message: "Which Employee will be removed?",
                name: "choice"
            }
        ])
        .then(response => {
            const id = response.choice.split(" ");
            const queryTwo = `delete from employee where id = ${Number.parseInt(id[0])}`;
            connection.query(queryTwo, (err, results) => {
                if (err) throw err;
                console.log("\nSuccessfully Removed Employee");
            })
            main();
        })
    });
}

// Updates the Employees Role
const updEmpRole= () => {
    const queryOne = `select id, first_name, last_name from employee;`;
    connection.query(queryOne, (err, results) => {
        const fullNames = [];
        for(let i = 0; i < results.length; i++) {
            fullNames.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
        inquirer.prompt([
            {
                type: "list",
                choices: [...fullNames],
                message: "Pick the Employee:",
                name: "choice"
            },
            {
                type: "list",
                choices: [1,2,3,4,5,6],
                message: "Pick which role to update for Employee:",
                name: "role"
            }
        ])
        .then(response => {
            const id = response.choice.split(" ");
            const queryTwo = `update employee set role_id = ${response.role} where id = ${Number.parseInt(id)}`;
            connection.query(queryTwo, (err, results) => {
                if (err) throw err;
                console.log("Successfully Updated Employees Role");
            })
            main();
        });
    });
}

// Updates Manager status
const updEmpMan = () => {
    const queryOne = `select id, first_name, last_name from employee;`;
    connection.query(queryOne, (err, results) => {
        const fullNames = [];
        for(let i = 0; i < results.length; i++) {
            fullNames.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
        inquirer.prompt([
            {
                type: "list",
                choices: [...fullNames],
                message: "Pick the Employee:",
                name: "choice"
            },
            {
                type: "list",
                choices: [1,2,3,4,5,6,"null"],
                message: "Pick which Manager to update for Employee:",
                name: "role"
            }
        ])
        .then(response => {
            const id = response.choice.split(" ");
            const queryTwo = `update employee set manager_id = ${response.role} where id = ${Number.parseInt(id)}`;
            connection.query(queryTwo, (err, results) => {
                if (err) throw err;
                console.log("\nSuccessfully Updated Employees Role");
            })
            main();
        });
    });
}

// This is the main function where the user is given choices
const main = () => {
    // Ask for users input
    inquirer.prompt([{
            type: "list",
            choices: [
                "View All Employees", new inquirer.Separator(),
                "View Employees by Department", new inquirer.Separator(),
                "View Employees by Role", new inquirer.Separator(),
                "Add Employee", new inquirer.Separator(),
                "Add Department", new inquirer.Separator(),
                "Add Role", new inquirer.Separator(),
                "Remove Employee", new inquirer.Separator(),
                "Update Employee Role", new inquirer.Separator(),
                "Update Employee Manager", new inquirer.Separator(),
                "Exit", new inquirer.Separator()
            ],
            message: "What would you like to do?",
            name: "choice"
        }])
        .then(response => {
            // display all employees
            if (response.choice === "View All Employees") {
                viewAllEmp();
            // display employees by department
            } else if (response.choice === "View Employees by Department") {
                viewEmpDep();
            // display employees by their role
            } else if (response.choice === "View Employees by Role") {
                viewEmpRole();
            // add employee
            } else if (response.choice === "Add Employee") {
                addEmp();
            // Add a Department
            } else if (response.choice === "Add Department") {
                addDep();
            // Add a Role
            } else if (response.choice === "Add Role") {
                addRole();
            // remove an employee
            }else if (response.choice === "Remove Employee") {
                remEmp();
            // Update an employees role
            } else if (response.choice === "Update Employee Role") {
                updEmpRole();
            // Update employees manager status
            } else if (response.choice === "Update Employee Manager") {
                updEmpMan();
            // Exit program
            } else if(response.choice === "Exit") {
                connection.end();
                process.exit(0);
            }
            // Handles invalid input
            else {
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