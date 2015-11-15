exports.setup = function(app, pool) {
	app.post('/api/teacher', function(req, res) {
		// create new teacher
		
    });
	app.get('/api/teacher/:username', function(req, res) {
		
		pool.getConnection(function(err, connection) {
		  // Use the connection 
		  connection.query( 'SELECT * FROM wp_users', function(err, rows) {
			if (!err){
				res.send(rows);
				connection.release();
			}
		  });
		});
    });
	app.delete('/api/teacher/:username', function(req, res) {
		// delete specific teacher
        res.end(req.params.username);
    });
	app.put('/api/teacher/:username', function(req, res) {
		// update specific teacher
        res.end(req.params.username);
    });
};