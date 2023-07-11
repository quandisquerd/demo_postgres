var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'product_database',
    user: 'root',
    password: 'admin',

})
module.exports=connection