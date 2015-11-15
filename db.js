var mysql = require('mysql');
var pool  = mysql.createPool(
	{
	  host            	: 'localhost',
	  database			: 'wordpress',
	  user				: 'root',
	  password        	: '',
	  connectionLimit 	: 10
	}
);

module.exports = pool;