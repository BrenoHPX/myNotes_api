"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userClass = void 0;
const uuid_1 = require("uuid");
const storage_1 = require("../../storage");
class User {
    addUser(req, res) {
        const { email, password } = req.body;
        const newUid = (0, uuid_1.v4)();
        const newUser = {
            email,
            password,
            tasks: [],
            uUid: newUid
        };
        storage_1.usersList.push(newUser);
        return res.status(200).json({
            success: true,
            message: 'Usuário cadastrado!',
            data: newUser
        });
    }
    getUserById(req, res) {
        const { uid } = req.params;
        const findTargetUser = storage_1.usersList.find((f) => f.uUid === uid);
        const targetUserData = {
            uid: findTargetUser === null || findTargetUser === void 0 ? void 0 : findTargetUser.uUid,
            email: findTargetUser === null || findTargetUser === void 0 ? void 0 : findTargetUser.email
        };
        return res.status(200).json({
            success: true,
            message: 'Usuário encontrado!',
            data: targetUserData
        });
    }
    getAllUsers(req, res) {
        return res.status(200).json({
            success: true,
            message: 'Todos os usuários no BD.',
            data: storage_1.usersList
        });
    }
    checkUserLogin(req, res) {
        console.log('api/checkLogInRequest');
        const { email, password } = req.body;
        const findTargetUser = storage_1.usersList.find((f) => f.email === email && f.password === password);
        console.log(findTargetUser);
        if (!findTargetUser) {
            return res.status(400).json({
                success: false,
                message: 'Email e senha não conferem. Tente novamente!',
                data: null
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Usuário encontrado!',
            data: findTargetUser
        });
    }
}
const userClass = new User();
exports.userClass = userClass;
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
