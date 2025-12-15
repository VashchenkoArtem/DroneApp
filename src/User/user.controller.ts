import { UserService } from "./user.service"
import { IUserControllerContract } from "./user.types"


export const userController: IUserControllerContract = {
    registration: async (req, res) => {
        const response = await UserService.registration(req.body)
        if (response === "User already exist. Try to log in"){
            res.status(401).json(response)
        }
        res.status(201).json(response)
    }
}