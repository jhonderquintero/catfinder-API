"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./database/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require("./config/config");
dotenv_1.default.config();
// Initializations
const app = express_1.default(); // Application, personalized type  from express.
// Settings
app.set('port', process.env.PORT);
// DB Connection
config_1.default();
// Middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public'))); // serving static files from public directory
// Routes
app.use('/api/auth', require('./routes/auth')); // user authentication
app.use('/api/cats', require('./routes/cats')); // cats database, filter by category
exports.default = app;
