"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classes_1 = require("./api_features/classes");
const middlewares_1 = require("./api_features/middlewares");
const router = (0, express_1.Router)();
//----------------------USERS---------------------------------------------
router.post('/users', middlewares_1.checkEmailPasswordMiddleware, middlewares_1.checkEmailExistenceMiddleware, (req, res) => {
    classes_1.userClass.addUser(req, res);
});
router.get('/users/:uUid', middlewares_1.checkUserMiddleware, (req, res) => {
    classes_1.userClass.getUserById(req, res);
});
router.get('/users', (req, res) => {
    classes_1.userClass.getAllUsers(req, res);
});
router.post('/users/logIn', (req, res) => {
    classes_1.userClass.checkUserLogin(req, res);
});
//----------------------TASKS---------------------------------------------
router.post('/users/:uUid/task', middlewares_1.checkUserMiddleware, middlewares_1.checkTitleDescriptionMiddleware, (req, res) => {
    classes_1.taskClass.addNewTask(req, res);
});
router.get('/users/:uUid/task/:tUid', middlewares_1.checkUserMiddleware, middlewares_1.checkTaskMiddleware, (req, res) => {
    classes_1.taskClass.getTaskById(req, res);
});
router.get('/user/:uUid/tasks', middlewares_1.checkUserMiddleware, (req, res) => {
    classes_1.taskClass.getAllUserTasks(req, res);
});
router.put('/users/:uUid/task/:tUid', middlewares_1.checkUserMiddleware, middlewares_1.checkTaskMiddleware, middlewares_1.checkTitleDescriptionMiddleware, (req, res) => {
    classes_1.taskClass.editTaskById(req, res);
});
router.delete('/users/:uUid/task/:tUid', middlewares_1.checkUserMiddleware, middlewares_1.checkTaskMiddleware, (req, res) => {
    classes_1.taskClass.deleteTaskById(req, res);
});
router.put('/users/:uUid/archiveTask/:tUid', middlewares_1.checkUserMiddleware, middlewares_1.checkTaskMiddleware, (req, res) => {
    classes_1.taskClass.archiveTask(req, res);
});
router.put('/users/:uUid/unarchiveTask/:tUid', middlewares_1.checkUserMiddleware, middlewares_1.checkTaskMiddleware, (req, res) => {
    classes_1.taskClass.unarchiveTask(req, res);
});
router.put('/users/:uUid/unarchiveTasks', middlewares_1.checkUserMiddleware, (req, res) => {
    classes_1.taskClass.unarchiveAllTasks(req, res);
});
router.put('/users/:uUid/searchTextinTasks', middlewares_1.checkUserMiddleware, (req, res) => {
    classes_1.taskClass.searchTasks(req, res);
});
router.put('/users/:uUid/showArchivedTasks', middlewares_1.checkUserMiddleware, (req, res) => {
    classes_1.taskClass.returnArchivedTasks(req, res);
});
router.put('/users/:uUid/showUnarchivedTasks', middlewares_1.checkUserMiddleware, (req, res) => {
    classes_1.taskClass.returnUnarchivedTasks(req, res);
});
exports.default = router;
