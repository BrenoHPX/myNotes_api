"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserMiddleware = void 0;
const storage_1 = require("../../storage");
const checkUserMiddleware = (req, res, next) => {
    const { uUid } = req.params;
    const targetUser = storage_1.usersList.find((f) => f.uUid === uUid);
    if (!targetUser) {
        return res.status(418).json({
            success: false,
            message: 'Usuário não encontrado!'
        });
    }
    next();
};
exports.checkUserMiddleware = checkUserMiddleware;
