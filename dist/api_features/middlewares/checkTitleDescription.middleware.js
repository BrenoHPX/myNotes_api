"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTitleDescriptionMiddleware = void 0;
const checkTitleDescriptionMiddleware = (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: `Requisição incompleta. Favor enviar: title e description no body da requisição.`
        });
    }
    next();
};
exports.checkTitleDescriptionMiddleware = checkTitleDescriptionMiddleware;
