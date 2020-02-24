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
        selectItems();
    })
}

function selectItems() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Product id||Product Name||Price/unit\n")
        for (i in res) {
            productId.push(res[i].item_id)
            console.log(res[i].item_id+"||"+res[i].product_name+"||"+res[i].price)
            //localStorage.setItem(res[i].item_id,res[i].stock_quanitity)
        }
        //console.log(productId)
        //connection.end()
        askConsumer()
    });

}

function askConsumer() {
    inquirer.prompt([

        {
            type: "list",
            name: "select",
            message: "Please select ID of product to buy:",
            choices:productId
        },

        {
            type: "input",
            name: "quantity",
            message: "How many you want to Buy:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true
                }
                else {
                    return false
                }
            }
        }

    ]).then(function (answers) {
        var stockQuantity
        var productSales

        connection.query("select product_name,stock_quantity,price,product_sales from products where item_id= ? ", [parseFloat(answers.select)], function (err, res) {
            if (err) {
                throw err
            }
            //console.log("---" + res[0].stock_quantity)
            stockQuantity = res[0].stock_quantity



            if (answers.quantity > stockQuantity) {
                console.log("Purchaase quantity is more than available quanitty, order cancelled")
                connection.end()

            }
            else {
                stockQuantity = stockQuantity - parseFloat(answers.quantity)
                productSales = res[0].product_sales + parseFloat(answers.quantity) * res[0].price

                connection.query("update products set ? where ?",
                    [
                        {
                            stock_quantity: stockQuantity,
                            product_sales: productSales
                        },
                        {
                            item_id: answers.select
                        }
                    ], function (err, resUpdate) {

                        if (err) {
                            throw err
                        }
                        var totalPrice = res[0].price * answers.quantity
                        //console.log(totalPrice)
                        console.log("Order Detail\n" + "Item Purchased|" + "Quantity Purchased|" + "Price Per Unit|" + "Total Amount\n")
                        console.log(res[0].product_name + "|" + answers.quantity + "|" + res[0].price + "|" + totalPrice)

                        //connection.end()
                        repeat()

                    })

            }

        })
    })
}

function repeat() {

    inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "Want to buy more product?",
            choices: ["Yes", "No"]
        }

    ]).then(function (answers) {

        switch (answers.select) {
            case "Yes":
                askConsumer()
                break
            case "No":
                connection.end()
                break

        }
    })
}
start()