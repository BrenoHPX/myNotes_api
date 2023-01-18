import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { usersList } from '../../storage'
import { StandardResponse } from '../interfaces/StandardResponse'
import IUser from '../interfaces/IUser'

class User {
	addUser(req: Request, res: Response) {
		const { email, password } = req.body

		const newUid = v4()
		const newUser = {
			email,
			password,
			tasks: [],
			uUid: newUid
		} as IUser

		usersList.push(newUser)

		return res.status(200).json({
			success: true,
			message: 'Usuário cadastrado!',
			data: newUser
		} as StandardResponse)
	}

	getUserById(req: Request, res: Response) {
		const { uid } = req.params

		const findTargetUser = usersList.find((f) => f.uUid === uid)

		const targetUserData = {
			uid: findTargetUser?.uUid,
			email: findTargetUser?.email
		}

		return res.status(200).json({
			success: true,
			message: 'Usuário encontrado!',
			data: targetUserData
		} as StandardResponse)
	}

	getAllUsers(req: Request, res: Response) {
		return res.status(200).json({
			success: true,
			message: 'Todos os usuários no BD.',
			data: usersList
		})
	}

	checkUserLogin(req: Request, res: Response) {
		console.log('api/checkLogInRequest')

		const { email, password } = req.body

		const findTargetUser = usersList.find(
			(f) => f.email === email && f.password === password
		)

		console.log(findTargetUser)

		if (!findTargetUser) {
			return res.status(400).json({
				success: false,
				message: 'Email e senha não conferem. Tente novamente!',
				data: null
			} as StandardResponse)
		}

		return res.status(200).json({
			success: true,
			message: 'Usuário encontrado!',
			data: findTargetUser
		} as StandardResponse)
	}
}

const userClass = new User()
export { userClass }

// if (name) {
// 	const filteredByName = usersDB.filter((f) =>
// 		f.name.toLowerCase().includes(name.toString().toLowerCase())
// 	)
// 	return res.status(400).json({
// 		success: true,
// 		message: 'Usuários filtrados pelo nome.',
// 		data: filteredByName.map((m) => {
// 			return {
// 				name: m.name,
// 				cpf: m.cpf,
// 				email: m.email,
// 				age: m.age,
// 				uid: m.uid
// 			}
// 		})
// 	} as StandardResponse)
// }

// editUserById(req: Request, res: Response) {}
// deleteUserById(req: Request, res: Response) {}
