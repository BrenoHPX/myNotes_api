"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailPasswordMiddleware = void 0;
const checkEmailPasswordMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Você deve informar email e password no corpo da requisição!',
            data: null
        });
    }
    next();
};
exports.checkEmailPasswordMiddleware = checkEmailPasswordMiddleware;
