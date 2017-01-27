// Divide all of your modules in different files and
// require them here
module.exports = function(app, settings){
	require('./main')(app, settings);
	require('./home')(app, settings);
	require('./users')(app, settings);
	require('./dico')(app, settings);
	require('./mot')(app, settings);
	require('./areteType')(app, settings);
};
