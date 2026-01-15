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
        res.status(200).json(response);
    },
    me: async (req, res) => {
        const userId = res.locals.userId;
        
        if (!userId) {
            res.status(401).json("Unauthorized");
        }

        const me = await UserService.me(userId);

        if (typeof me === "string") {
            res.status(404).json(me);
        }

        res.status(200).json(me);
        
    },
    createAdress: async (req, res) => {
        const userId = res.locals.userId;
        const body = req.body;
        const response = await UserService.createAdress(body, userId)
        res.status(201).json(response)
    },

    deleteAdress: async (req, res) => {
        const adressId = Number(req.params.addressId);
        console.log(req.params.addressId)
        const deletedAdress = await UserService.deleteAdress(adressId)

        if (!deletedAdress) {
            res.status(400).json('There was an error while deleting an adress')
        }
        res.status(200).json(deletedAdress)
    },

    updateAdress: async(req, res) => {
        const body = req.body;
        const adressId = Number(req.params.adressId)

        const updateAdress = await UserService.updateAdress(adressId, body)
        res.status(200).json(updateAdress)
    },

    getUserDeliveries: async(req, res) => {
        const userId = Number(req.params.userId)    
        if (Number.isNaN(userId)) {
            res.status(401).json("Please, enter id correctly")
            return;
        }
        const userDeliveries = await UserService.getUserDeliveries(userId);

        if (!userDeliveries) {
            res.status(404).json('User does not have any deliveries. Create one.');
        }

        res.status(200).json(userDeliveries);
    },

    getUserDeliveryById: async(req, res) => {
        const deliveryId = Number(req.params.adressId)
        
        const delivery = await UserService.getUserDeliveryById(deliveryId)
        
        if (!delivery) {
            res.status(404).json('User does not have orders yet')
        }

        res.status(200).json(delivery)
    },

    getUserOrders: async(req, res) => {
        const userId = Number(req.params.userId)    

        if (Number.isNaN(userId)) {
            res.status(401).json("Please, enter id correctly")
            return
        }

        const userOrders = await UserService.getUserOrders(userId)

        if (!userOrders) {
            res.status(404).json('User does not have any orders. Order something.')
        }

        res.status(200).json(userOrders)
    }
};