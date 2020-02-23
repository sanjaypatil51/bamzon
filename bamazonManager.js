var mysql = require("mysql")
var inquirer = require('inquirer');

var productId = []

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "welcome123",
    database: "bamzon"
});


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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "exit"],
            message: "Select from Choices"

        }
    ]).then(function (answers) {
        //console.log("test")

        switch (answers.select) {
            case "View Products for Sale":
                viewAllProduct()
                break
            case "View Low Inventory":
                viewLowInventory()
                break
            case "Add to Inventory":
                addToInventory()
                break
            case "Add New Product":
                addNewProduct()
                break
            case "exit":
                connection.end()
                break
        }
    })
}


function viewAllProduct() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res)
        console.log("Item id||Product Name||Department Name||Price||Stock Quantity")
        for (i in res) {
            console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity)
        }
        askChoices()

    })

}

function viewLowInventory() {

    connection.query("SELECT * from products where stock_quantity<=5", function (err, res) {

        if (err) throw err

        console.log("Item id||Product Name||Department Name||Price||Stock Quantity")
        for (i in res) {
            console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity)
        }
        askChoices()

    })
}

start()