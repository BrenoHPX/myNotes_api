"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailExistenceMiddleware = void 0;
const storage_1 = require("../../storage");
const checkEmailExistenceMiddleware = (req, res, next) => {
    const { email } = req.body;
    const checkEmail = storage_1.usersList.some((s) => s.email === email);
    if (checkEmail) {
        return res.status(400).json({
            success: false,
            message: 'Este email já existe.',
            data: null
        });
    }
    next();
};
exports.checkEmailExistenceMiddleware = checkEmailExistenceMiddleware;
