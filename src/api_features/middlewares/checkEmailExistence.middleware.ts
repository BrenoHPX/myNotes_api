import { NextFunction, Request, Response } from 'express'
import { StandardResponse } from '../interfaces/StandardResponse'
import { usersList } from '../../storage'

export const checkEmailExistenceMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body

	const checkEmail = usersList.some((s) => s.email === email)

	if (checkEmail) {
		return res.status(400).json({
			success: false,
			message: 'Este email já existe.',
			data: null
		} as StandardResponse)
	}

	next()
}
