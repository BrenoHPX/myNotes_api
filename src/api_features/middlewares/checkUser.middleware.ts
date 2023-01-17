import { NextFunction, Request, Response } from 'express'
import { StandardResponse } from '../interfaces/StandardResponse'
import { usersList } from '../../storage'

export const checkUserMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { uUid } = req.params
	const targetUser = usersList.find((f) => f.uUid === uUid)
	if (!targetUser) {
		return res.status(418).json({
			success: false,
			message: 'Usuário não encontrado!'
		} as StandardResponse)
	}
	next()
}
