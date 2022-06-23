
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'ali',
	port:3306
	
});
console.log("DB connected");


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


 const bodyParser = require('body-parser');
 const { resourceUsage } = require('process');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


app.get('/getBook', (req, res)=> {
		res.setHeader("Content-type", "text/html");
		let input = req.query.bookid;

		let output = {status:false, bookdetails:{bookid:100, bookname:"HTML", bookprice:1000}};

        con.query('select * from Book where bookid=?',
		[input],
		(error, rows)=>{
			console.log("in conn");
			if(error){
				console.log("in error");
			}
			else if(rows.length > 0){
				output.status = true;
				output.bookdetails = rows[0]
				console.log(output.bookdetails.bookname);
				
			}
			res.send(output);
		});
		
    	

		

		});



		app.get('/updateBook', (req, res)=> {
			res.setHeader("Content-type", "text/html");
			let input = { bookid : req.query.bookid,
				bookname : req.query.bookname,
				bookprice : req.query.bookprice,
			}
	
			let output = false;
	
			con.query('update book set bookname = ? , bookprice =? where bookid = ?',
			[input.bookname, input.bookprice, input.bookid],
			(error, rows)=>{
				console.log("in conn");
				if(error){
					console.log("in error");
				}
				else if(rows.affectedRows > 0){
					output= true;
					
					
					
				}
				res.send(output);
			});
			
			
	
			
	
			});
	




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});