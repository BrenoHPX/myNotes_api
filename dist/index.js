"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
let express = require('express');
let cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes_1.default);
const port = 8081;
app.listen(port, () => console.log('Server is running...'));
