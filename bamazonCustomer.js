var mysql = require("mysql");
var inquirer = require('inquirer');
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function showCost(answers) {
    connection.query(`SELECT price FROM products WHERE item_id = ${answers.item_id}`, function (error, results, fields) {
        if (error) throw error;
        var cost = parseFloat(results[0].price) * parseFloat(answers.quantity)
        console.log("Total Purchase Price: $" + parseFloat(cost).toFixed(2));
        connection.end();
    });
}

function placeOrder(answers, current_quantity) {
    var new_quantity = parseInt(current_quantity) - parseInt(answers.quantity);
    connection.query(`UPDATE products SET ? WHERE item_id = ${answers.item_id};`,
    [
        {
            stock_quantity: new_quantity
        }
    ],
    function (error, results, fields) {
        if (error) throw error;
        showCost(answers);
    });
}

function checkQuantity(answers) {
    connection.query(`SELECT stock_quantity FROM products WHERE item_id = ${answers.item_id};`, function (error, results, fields) {
        if (error) throw error;
        var isValidAmount = (parseInt(answers.quantity) <= parseInt(results[0].stock_quantity) ? true : false);

        if (isValidAmount) {
            placeOrder(answers, results[0].stock_quantity)
        }
        else {
            console.log("Insufficient quantity on hand!");
            console.log("Exiting, please try again...");
            connection.end();
        }

      });
}

function askInitialQuestion() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: "Please enter the item_id of the product you would like to buy:"
        },
        {
            type: 'input',
            name: 'quantity',
            message: "Please enter the quantity amount:"
        }
    ]).then(answers => {
        checkQuantity(answers);
    });
}
  
function displayStart() { 
    connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      console.table(results);
      askInitialQuestion();
    });
}

displayStart();