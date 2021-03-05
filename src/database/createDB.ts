import dbConnection from './config';
import databaseCreation from '../controllers/database';

// This script could be execute with "npm run create-db" after build all files into js files

dbConnection(); // connect to mongoDB database

databaseCreation(); // insert cats collection in mongoDB database