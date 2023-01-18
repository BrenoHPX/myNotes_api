"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskClass = void 0;
const uuid_1 = require("uuid");
const storage_1 = require("../../storage");
class Task {
    addNewTask(req, res) {
        console.log('api/task/addNewTask');
        const { uUid } = req.params;
        const { title, description } = req.body;
        const newUid = (0, uuid_1.v4)();
        const date = new Date().toUTCString();
        const newTask = {
            title,
            description,
            createdDate: date,
            updateDate: date,
            tUid: newUid,
            uUid: uUid,
            isArchived: false
        };
        storage_1.tasksList.push(newTask);
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefa adicionada!',
            data: userTasksList
        });
    }
    getTaskById(req, res) {
        console.log('api/task/getTaskById');
        const { uUid, tUid } = req.params;
        const targetTask = storage_1.tasksList.find((f) => f.tUid === tUid);
        return res.status(200).json({
            success: true,
            message: 'Tarefa encontrada!',
            data: targetTask
        });
    }
    getAllUserTasks(req, res) {
        console.log('api/task/getAllUserTasks');
        const { uUid } = req.params;
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Lista de tarefas!',
            data: userTasksList
        });
    }
    editTaskById(req, res) {
        console.log('api/task/editTaskById');
        const { uUid, tUid } = req.params;
        const { title, description } = req.body;
        const targetTask = storage_1.tasksList.find((f) => f.tUid === tUid);
        const targetTaskIndex = storage_1.tasksList.findIndex((f) => f.tUid === tUid);
        const updatedTask = {
            title,
            description,
            createdDate: targetTask.createdDate,
            updateDate: new Date().toUTCString(),
            tUid: tUid,
            uUid: uUid,
            isArchived: false
        };
        storage_1.tasksList.splice(targetTaskIndex, 1, updatedTask);
        const usersTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefa atualizada!',
            data: usersTasksList
        });
    }
    deleteTaskById(req, res) {
        console.log('api/task/deleteTaskById');
        const { uUid, tUid } = req.params;
        const targetTaskIndex = storage_1.tasksList.findIndex((f) => f.tUid === tUid);
        storage_1.tasksList.splice(targetTaskIndex, 1);
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Transação deletada!',
            data: userTasksList
        });
    }
    archiveTask(req, res) {
        console.log('api/task/archiveTask');
        const { uUid, tUid } = req.params;
        const targetTask = storage_1.tasksList.find((f) => f.tUid === tUid);
        targetTask.isArchived = true;
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefa arquivada!',
            data: userTasksList
        });
    }
    unarchiveTask(req, res) {
        console.log('api/task/unarchiveTask');
        const { uUid, tUid } = req.params;
        const targetTask = storage_1.tasksList.find((f) => f.tUid === tUid);
        targetTask.isArchived = false;
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefa arquivada!',
            data: userTasksList
        });
    }
    unarchiveAllTasks(req, res) {
        console.log('api/task/unarchiveAllTasks');
        const { uUid } = req.params;
        storage_1.tasksList
            .filter((f) => f.uUid === uUid)
            .map((m) => (m.isArchived = false));
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefas desarquivadas!',
            data: userTasksList
        });
    }
    searchTasks(req, res) {
        console.log('api/task/searchTasks');
        const { uUid } = req.params;
        const { text } = req.query;
        const searchedTasks = storage_1.tasksList.filter((f) => (f.title
            .toLocaleLowerCase()
            .includes(text.toString().toLocaleLowerCase()) ||
            f.description
                .toLocaleLowerCase()
                .includes(text.toString().toLocaleLowerCase())) &&
            f.uUid === uUid &&
            f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefas encontradas por pesquisa de texto!',
            data: searchedTasks
        });
    }
    returnArchivedTasks(req, res) {
        console.log('api/task/returnArchivedTasks');
        const { uUid } = req.params;
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === true);
        return res.status(200).json({
            success: true,
            message: 'Tarefas Arquivadas!',
            data: userTasksList
        });
    }
    returnUnarchivedTasks(req, res) {
        console.log('api/task/returnUnarchivedTasks');
        const { uUid } = req.params;
        const userTasksList = storage_1.tasksList.filter((f) => f.uUid === uUid && f.isArchived === false);
        return res.status(200).json({
            success: true,
            message: 'Tarefas Desarquivadas!',
            data: userTasksList
        });
    }
}
const taskClass = new Task();
exports.taskClass = taskClass;
