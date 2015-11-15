exports.setup = function(app,db) {
	app.post('/student', function(req, res) {
		// create new student
        res.end(req.params.username);
    });
	app.get('/student/:username', function(req, res) {
		db.sequelize.query('select * from wp_posts').then(function(projects){
			res.send(projects);
		});
    });
	app.delete('/student/:username', function(req, res) {
		// delete specific student
        res.end(req.params.username);
    });
	app.put('/student/:username', function(req, res) {
		// update specific student
        res.end(req.params.username);
    });
};