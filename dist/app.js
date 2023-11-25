"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./modules/user/user.routes");
const app = (0, express_1.default)();
// const port = 3000;
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//app routes
app.use('/api/users/', user_routes_1.UserRoutes);
const getAController = (req, res) => {
    res.status(200).json({
        status: 'success ok',
        message: 'Welcome to the user and Order management server',
    });
};
app.get('/', getAController);
exports.default = app;
