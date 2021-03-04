import app from './app';

// app.get('port') obtain port declared in .env

app.listen(app.get('port'), ()=> console.log('Server running at port ' + app.get('port')));