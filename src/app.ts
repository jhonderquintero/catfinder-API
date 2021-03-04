import express, {Application, Response, Request, NextFunction} from 'express';
import dbConnection from './database/config';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import './config/config';
dotenv.config();

// Initializations
const app: Application = express(); // Application, personalized type  from express.

// Settings
app.set('port', process.env.PORT);

// DB Connection
dbConnection();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname , '../public'))); // serving static files from public directory

// Routes
app.use('/api/auth', require('./routes/auth')); // user authentication
app.use('/api/cats', require('./routes/cats')); // cats database, filter by category

export default app;