var mysql = require('mysql')
var inquirer = requ('inquirer')

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "welcome123",
    database: "bamzon"

})

function start() {

    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");

        askChoices()

    })
}

function askChoices() {
    inquirer.prompt([

        {
            type: "list",
            name: "select",
            message: "Select Action from Choices",
            choices:["View Product Sales by Department","Create New Department"]

        }

    ]).then(function(answers){



    })
}