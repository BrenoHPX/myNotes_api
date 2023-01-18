import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { tasksList } from '../../storage'
import { ITask } from '../interfaces/ITask'
import { StandardResponse } from '../interfaces/StandardResponse'

class Task {
	addNewTask(req: Request, res: Response) {
		console.log('api/task/addNewTask')

		const { uUid } = req.params
		const { title, description } = req.body

		const newUid = v4()
		const date = new Date().toUTCString()
		const newTask: ITask = {
			title,
			description,
			createdDate: date,
			updateDate: date,
			tUid: newUid,
			uUid: uUid,
			isArchived: false
		}

		tasksList.push(newTask)

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefa adicionada!',
			data: userTasksList
		} as StandardResponse)
	}

	getTaskById(req: Request, res: Response) {
		console.log('api/task/getTaskById')
		const { uUid, tUid } = req.params

		const targetTask = tasksList.find((f) => f.tUid === tUid)

		return res.status(200).json({
			success: true,
			message: 'Tarefa encontrada!',
			data: targetTask
		} as StandardResponse)
	}

	getAllUserTasks(req: Request, res: Response) {
		console.log('api/task/getAllUserTasks')
		const { uUid } = req.params

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Lista de tarefas!',
			data: userTasksList
		} as StandardResponse)
	}

	editTaskById(req: Request, res: Response) {
		console.log('api/task/editTaskById')
		const { uUid, tUid } = req.params
		const { title, description } = req.body

		const targetTask = tasksList.find((f) => f.tUid === tUid)
		const targetTaskIndex = tasksList.findIndex((f) => f.tUid === tUid)

		const updatedTask: ITask = {
			title,
			description,
			createdDate: targetTask!.createdDate,
			updateDate: new Date().toUTCString(),
			tUid: tUid,
			uUid: uUid,
			isArchived: false
		}

		tasksList.splice(targetTaskIndex!, 1, updatedTask)

		const usersTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefa atualizada!',
			data: usersTasksList
		} as StandardResponse)
	}

	deleteTaskById(req: Request, res: Response) {
		console.log('api/task/deleteTaskById')
		const { uUid, tUid } = req.params

		const targetTaskIndex = tasksList.findIndex((f) => f.tUid === tUid)

		tasksList.splice(targetTaskIndex!, 1)

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Transação deletada!',
			data: userTasksList
		} as StandardResponse)
	}

	archiveTask(req: Request, res: Response) {
		console.log('api/task/archiveTask')
		const { uUid, tUid } = req.params

		const targetTask = tasksList.find((f) => f.tUid === tUid)

		targetTask!.isArchived = true

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefa arquivada!',
			data: userTasksList
		} as StandardResponse)
	}

	unarchiveTask(req: Request, res: Response) {
		console.log('api/task/unarchiveTask')
		const { uUid, tUid } = req.params

		const targetTask = tasksList.find((f) => f.tUid === tUid)

		targetTask!.isArchived = false

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefa arquivada!',
			data: userTasksList
		} as StandardResponse)
	}

	unarchiveAllTasks(req: Request, res: Response) {
		console.log('api/task/unarchiveAllTasks')
		const { uUid } = req.params

		tasksList
			.filter((f) => f.uUid === uUid)
			.map((m) => (m.isArchived = false))

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)
		return res.status(200).json({
			success: true,
			message: 'Tarefas desarquivadas!',
			data: userTasksList
		} as StandardResponse)
	}

	searchTasks(req: Request, res: Response) {
		console.log('api/task/searchTasks')
		const { uUid } = req.params
		const { text } = req.query

		const searchedTasks = tasksList.filter(
			(f) =>
				(f.title
					.toLocaleLowerCase()
					.includes(text!.toString().toLocaleLowerCase()) ||
					f.description
						.toLocaleLowerCase()
						.includes(text!.toString().toLocaleLowerCase())) &&
				f.uUid === uUid &&
				f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefas encontradas por pesquisa de texto!',
			data: searchedTasks
		} as StandardResponse)
	}

	returnArchivedTasks(req: Request, res: Response) {
		console.log('api/task/returnArchivedTasks')
		const { uUid } = req.params

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === true
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefas Arquivadas!',
			data: userTasksList
		} as StandardResponse)
	}
	returnUnarchivedTasks(req: Request, res: Response) {
		console.log('api/task/returnUnarchivedTasks')
		const { uUid } = req.params

		const userTasksList = tasksList.filter(
			(f) => f.uUid === uUid && f.isArchived === false
		)

		return res.status(200).json({
			success: true,
			message: 'Tarefas Desarquivadas!',
			data: userTasksList
		} as StandardResponse)
	}
}

const taskClass = new Task()
export { taskClass }
