import { Router, Request, Response } from 'express'
import { userClass, taskClass } from './api_features/classes'
import {
	checkTitleDescriptionMiddleware,
	checkUserMiddleware,
	checkTaskMiddleware,
	checkEmailPasswordMiddleware,
	checkEmailExistenceMiddleware
} from './api_features/middlewares'

const router = Router()

//----------------------USERS---------------------------------------------

router.post(
	'/users',
	checkEmailPasswordMiddleware,
	checkEmailExistenceMiddleware,
	(req: Request, res: Response) => {
		userClass.addUser(req, res)
	}
)

router.get(
	'/users/:uUid',
	checkUserMiddleware,
	(req: Request, res: Response) => {
		userClass.getUserById(req, res)
	}
)

router.get('/users', (req: Request, res: Response) => {
	userClass.getAllUsers(req, res)
})

router.post('/users/logIn', (req: Request, res: Response) => {
	userClass.checkUserLogin(req, res)
})

//----------------------TASKS---------------------------------------------

router.post(
	'/users/:uUid/task',
	checkUserMiddleware,
	checkTitleDescriptionMiddleware,
	(req: Request, res: Response) => {
		taskClass.addNewTask(req, res)
	}
)

router.get(
	'/users/:uUid/task/:tUid',
	checkUserMiddleware,
	checkTaskMiddleware,
	(req: Request, res: Response) => {
		taskClass.getTaskById(req, res)
	}
)

router.get(
	'/user/:uUid/tasks',
	checkUserMiddleware,
	(req: Request, res: Response) => {
		taskClass.getAllUserTasks(req, res)
	}
)

router.put(
	'/users/:uUid/task/:tUid',
	checkUserMiddleware,
	checkTaskMiddleware,
	checkTitleDescriptionMiddleware,
	(req: Request, res: Response) => {
		taskClass.editTaskById(req, res)
	}
)

router.delete(
	'/users/:uUid/task/:tUid',
	checkUserMiddleware,
	checkTaskMiddleware,
	(req: Request, res: Response) => {
		taskClass.deleteTaskById(req, res)
	}
)

router.put(
	'/users/:uUid/archiveTask/:tUid',
	checkUserMiddleware,
	checkTaskMiddleware,
	(req: Request, res: Response) => {
		taskClass.archiveTask(req, res)
	}
)

router.put(
	'/users/:uUid/archiveTask/:tUid',
	checkUserMiddleware,
	checkTaskMiddleware,
	(req: Request, res: Response) => {
		taskClass.unarchiveTask(req, res)
	}
)

router.put(
	'/users/:uUid/unarchiveTasks',
	checkUserMiddleware,
	(req: Request, res: Response) => {
		taskClass.unarchiveAllTasks(req, res)
	}
)

router.put(
	'/users/:uUid/searchTextinTasks',
	checkUserMiddleware,
	(req: Request, res: Response) => {
		taskClass.searchTasks(req, res)
	}
)

router.put(
	'/users/:uUid/showArchivedTasks',
	checkUserMiddleware,
	(req: Request, res: Response) => {
		taskClass.returnArchivedTasks(req, res)
	}
)

export default router
