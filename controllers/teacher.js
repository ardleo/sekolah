exports.setup = function(app, db) {
	app.post('/api/teacher', function(req, res) {
		// create new teacher
		
    });
	app.get('/api/teacher/:username', function(req, res) {
		db.sequelize.query('select * from test').then(function(projects){
			res.send(projects);
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