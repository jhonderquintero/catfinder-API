// PORT CONFIG
process.env.PORT = process.env.PORT || '4000';

// ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// DB CONNECTION
let urlDB;
if(process.env.NODE_ENV === 'dev') urlDB = 'mongodb://localhost:27017/catfinderDB';
else  urlDB = 'mongodb+srv://<USER_NAME>:<USER_KEY>.mongodb.net/catfinderDB'; // change this with your db info
process.env.URL_DB = urlDB;

// JSON WEB TOKEN
process.env.TOKEN_TIME = String(60 * 60);
process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
