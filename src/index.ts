import app from './app';

// Run server
app.listen(app.get('port'), () => console.log('Server running at port ' + app.get('port')));