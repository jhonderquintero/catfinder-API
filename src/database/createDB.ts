import dbConnection from './config';
import databaseCreation from '../controllers/database';

dbConnection(); // connect to mongoDB database

databaseCreation(); // insert cats collection in mongoDB database

// This could be execute with "npm run create-db" after build all files into js files