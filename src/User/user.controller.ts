import { UserService } from "./user.service";
import { IUserControllerContract } from "./user.types";

export const userController: IUserControllerContract = {
    registration: async (req, res) => {
        const dataUser = req.body
        const response = await UserService.registration(dataUser);
        if (response === "User already exist. Try to log in") {
            res.status(400).json({ message: response });
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

