module.exports = function(app){

	app.get('/person/current', (req, res) => person.select(connection, 174989, person => res.json(person)));

	app.post('/person/save', (req, res) =>
		person.update(connection, req.body.uid, {'first_name': req.body.firstName},
			updated => updated ? res.json({success: "success"}) : person.insert(connection, {first_name: req.body.firstName}, () => res.json({success: "success"}))));
};