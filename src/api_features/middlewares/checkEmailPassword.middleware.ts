import { NextFunction, Request, Response } from 'express'
import { StandardResponse } from '../interfaces/StandardResponse'
import { usersList } from '../../storage'

export const checkEmailPasswordMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message:
				'Você deve informar email e password no corpo da requisição!',
			data: null
		} as StandardResponse)
	}

	next()
}
