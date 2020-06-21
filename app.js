const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs') 
const app = express()
const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db'
});

// ターミナル上で表示される
// con.connect(function(err) {
// if (err) throw err;
//     console.log('Connected');    
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// 設定
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// ブラウザ上で表示される

// 入力フォーム：bodyのpost送信読み込み（html/form.html）
// app.get('/', (req, res) => 
//     res.sendFile(path.join(__dirname, 'html/form.html')))

// app.post('/', (req, res) => res.send(req.body))

// app.post('/', (req, res) => {
// 	const sql = "INSERT INTO users SET ?"

// 	con.query(sql,req.body,function(err, result, fields){
// 		if (err) throw err;
// 		console.log(result);
// 		res.send('登録が完了しました');

// 	});
// });

// データリスト表示：index.ejs読み込み
app.get('/', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index',{users : result});
	});
});

// deleteコマンド
app.get('/delete/:id',(req,res)=>{
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});