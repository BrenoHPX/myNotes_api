import { ITask } from './ITask'

export default interface IUser {
	email: string
	password: string
	tasks: ITask[]
	uUid: string
}
