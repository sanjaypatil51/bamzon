var mysql = require("mysql")
var inquirer = require('inquirer');



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

function addToInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res)
        console.log("Item id||Product Name||Department Name||Price||Stock Quantity")
        var itemID = []
        for (i in res) {
            itemID.push(res[i].item_id)
            console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity)
        }
        inquirer.prompt([
            {
                name: "id",
                type: "list",
                message: "select it id",
                choices: itemID
            },
            {
                name: "newQty",
                type: "input",
                message: "Enter Quantity to be added",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;

                }

            }
        ]).then(function (answers) {

            //console.log("new qty :" + answers.newQty)
            //console.log("id:" + answers.id)
            var origQty

            connection.query("SELECT stock_quantity from products where item_id= ? ", [parseInt(answers.id)], function (err, res) {
                if (err) throw err
                origQty = res[0].stock_quantity

                //console.log("orig qty :" + origQty)

                connection.query("update products set? where?", [
                    {
                        stock_quantity: origQty + parseFloat(answers.newQty)

                    },
                    {
                        item_id: parseInt(answers.id)
                    }
                ], function (err, res) {
                    if (err) throw err

                })
                askChoices()

            })

        })


    })
}


function addNewProduct() {

    var department = []

    connection.query("select department_name from department", function (err, res) {
        if (err) throw err
        for (i in res) {
            department.push(res[i].department_name)
        }

    })

    inquirer.prompt([
        {
            name: "productName",
            type: "imput",
            message: "Enter Product Name"
        },
        {
            name: "deptName",
            type: "list",
            message: "Enter Department Name",
            choices: department
        },
        {
            name: "price",
            type: "imput",
            message: "Enter Product Price/unit",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true
                } return false
            }
        },
        {
            name: "stockQty",
            type: "imput",
            message: "Enter Product Stock Quantyty",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true
                } return false
            }
        }


    ]).then(function (answers) {

        connection.query("INSERT INTO products SET?", [
            {
                product_name: answers.productName,
                department_name: answers.deptName,
                price: parseFloat(answers.price),
                stock_quantity: parseFloat(answers.stockQty)
            }
        ], function (err, res) {

            if (err) throw err
            askChoices()


        })
    })
}

start()