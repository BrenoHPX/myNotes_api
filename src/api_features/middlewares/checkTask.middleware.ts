import { NextFunction, Request, Response } from 'express'
import { StandardResponse } from '../interfaces/StandardResponse'
import { tasksList } from '../../storage'

export const checkTaskMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { tUid } = req.params
	const targetTask = tasksList.find((f) => f.tUid === tUid)

	if (!targetTask) {
		return res.status(400).json({
			success: false,
			message: 'Tarefa não encontrada!',
			data: null
		} as StandardResponse)
	}
	next()
}
