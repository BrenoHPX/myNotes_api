"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTaskMiddleware = void 0;
const storage_1 = require("../../storage");
const checkTaskMiddleware = (req, res, next) => {
    const { tUid } = req.params;
    const targetTask = storage_1.tasksList.find((f) => f.tUid === tUid);
    if (!targetTask) {
        return res.status(400).json({
            success: false,
            message: 'Tarefa não encontrada!',
            data: null
        });
    }
    next();
};
exports.checkTaskMiddleware = checkTaskMiddleware;
