"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("../controllers/database"));
// This script could be execute with "npm run create-db" after build all files into js files
config_1.default(); // connect to mongoDB database
database_1.default(); // insert cats collection in mongoDB database
