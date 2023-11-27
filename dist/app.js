"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const app = (0, express_1.default)();
//parser middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the user and Order management server',
    });
});
app.use('/api/users', user_routes_1.default);
// not found -- 404
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: '404! Route Not found.',
    });
});
exports.default = app;
