var mysql = require('mysql')
var inquirer = require('inquirer')

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
            choices: ["View Product Sales by Department", "Create New Department", "exit"]

        }

    ]).then(function (answers) {

        switch (answers.select) {
            case "View Product Sales by Department":
                viewProducetSales()
                break
            case "Create New Department":
                createDepartment()
                break
            case "exit":
                connection.end()
        }

    })
}

function viewProducetSales() {

    var query = "select a.department_name dept,sum(b.product_sales) sales,a.over_head_costs costs from department a " +
        "inner join products b on b.department_name=a.department_name " +
        "group by b.department_name, a.over_head_costs"
    connection.query(query, function (err, res) {
        if (err) throw err

        console.log("Department||Over Head Costs||Total Sales||Profit")
        for (i in res) {

            var profit = res[i].sales - res[i].costs
            console.log(res[i].dept + "||" + res[i].costs + "||" + res[i].sales + "||" + profit)
        }
        askChoices()
    })

}

function createDepartment() {

    var department = []

    connection.query("select department_name,over_head_costs from department", function (err, res) {
        if (err) throw err
        console.log("Existing Departments||Over Head Costs\n")
        for (i in res) {
            department.push(res[i].department_name)
            console.log(res[i].department_name + "||" + res[i].over_head_costs)
        }


        inquirer.prompt([
            {
                type: "input",
                name: "deptName",
                message: "Enter Department Name:",
                validate: function (value) {
                    if (department.includes(value)) {
                        console.log("\nDepartment Exist, enter new department")
                        return false
                    } return true

                }
            },
            {
                type: "input",
                name: "cost",
                message: "Enter Over Head Costs for this Department:",
                validate: function (value) {

                    if (isNaN(value) == false) {
                        return true
                    } return false
                }
            }

        ]).then(function (answers) {
            connection.query("INSERT INTO department SET ?", [
                {
                    department_name: answers.deptName,
                    over_head_costs: parseFloat(answers.cost)

                }
            ], function (err, res) {
                if (err) throw err

                console.log("Department Added")
                askChoices()

            })

        })

    })
}

start()