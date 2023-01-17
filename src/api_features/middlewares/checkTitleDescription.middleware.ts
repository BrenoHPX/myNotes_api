import { NextFunction, Request, Response } from 'express'
import { StandardResponse } from '../interfaces/StandardResponse'

export const checkTitleDescriptionMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, description } = req.body
	if (!title || !description) {
		return res.status(400).json({
			success: false,
			message: `Requisição incompleta. Favor enviar: title e description no body da requisição.`
		} as StandardResponse)
	}
	next()
}
