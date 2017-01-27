module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		dicoRouter = express.Router();

	dicoRouter.get('/', function(req, res, next){
		res.render('index.html');
	});

	app.use('/dico',dicoRouter);
};