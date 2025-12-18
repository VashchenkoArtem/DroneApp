import { UserService } from "./user.service";
import { IUserControllerContract } from "./user.types";

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
    },
    login: async (req, res) => {
        const response = await UserService.login(req.body)

        if (typeof response === 'string') {
            if (response === "Wrong credentials. Please, try again") {
                res.status(422).json(response)
            } else if (response === "User not found. Please, register your account") {
                res.status(404).json(response)
            } else {
                res.status(500).json(response)
            }
            return;
        }
        res.status(201).json(response);
    },
    me: async (req, res) => {
    try {
        const userId = res.locals.userId;
        
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const me = await UserService.me(userId);

        if (typeof me === "string") {
            return res.status(404).json({ message: me });
        }

        return res.status(200).json(me);
        
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return; 
    }
    }
};

