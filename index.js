var express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const client = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 3001, // Cổng mặc định của PostgreSQL là 5432
    database: 'product_database',
});

app.get('/', function (req, res) {
    let sql = 'SELECT* FROM productcat'
    client.query(sql, function (err, resols) {
        if (err) throw err;
        const data = (resols.rows)
        return res.json(data)
    })

})
app.post('/add', function (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    let sql = `INSERT INTO CAT (name, price) VALUES('${name}', ${price}) RETURNING *`
 
    client.query(sql, function (err, resols) {
        if (err){
            return res.json({message: 'Them khong thanh cong'})
        }
        const data = (resols.rows[0])
        return res.json({
            message: 'Them thanh cong',
            data
        })
    })

})
app.delete('/product/:id', function (req, res) {
    const id = req.params.id
    let sql = `DELETE FROM CAT WHERE id = '${id}'`
    client.query(sql, function (err,resols) {
        if(err) {
            return res.json({message:'Xoa that bai'})
        }
        return res.json({message:'Xoa thanh cong'})
    })
})
app.listen(3000, () => {
    console.log('listening on port 3000');
    client.connect((err) => {
        if (err) {
            console.error('Lỗi kết nối:', err);
            return;
        }
        console.log('okok');
        // Kết nối thành công, thực hiện các truy vấn ở đây
    });
})