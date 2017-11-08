var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "card",
  password: "0E8k1P6k"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
