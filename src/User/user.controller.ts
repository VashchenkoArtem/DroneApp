import { UserService } from "./user.service"
import { IUserControllerContract } from "./user.types"


export const userController: IUserControllerContract = {
    registration: async (req, res) => {
        const response = await UserService.registration(req.body)
        if (response === "User already exist. Try to log in"){
            res.status(401).json(response)
        }
        res.status(201).json(response)
    },
    updateUser: async (req, res) => {
        const userId = Number(req.params.id)
        const updatedData = req.body
        if (!updatedData){
            res.status(422).json("Please, enter a fields, which you want to update");
            return;
        }
        const response = await UserService.updateUser(updatedData, userId)
        res.status(200).json(response)
    }
}