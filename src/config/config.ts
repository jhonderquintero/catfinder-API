// PORT CONFIG
process.env.PORT = process.env.PORT || '4000';

// ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// DB CONNECTION
let urlDB;
if(process.env.NODE_ENV === 'dev') urlDB = 'mongodb://localhost:27017/catfinderDB';
else  urlDB = 'mongodb+srv://catfinder_user:P3wTUjkqPafO7qFJ@cluster0.h8aqc.mongodb.net/catfinderDB';
process.env.URL_DB = urlDB;

// JSON WEB TOKEN
process.env.TOKEN_TIME = String(60 * 60);
process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret_key';