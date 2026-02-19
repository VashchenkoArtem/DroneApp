import { UserService } from "./user.service";
import { IUserControllerContract } from "./user.types";

export const userController: IUserControllerContract = {
    registration: async (req, res) => {
        const response = await UserService.registration(req.body)
        if (response === "User already exist. Try to log in"){
            res.status(401).json(response)
            return;
        }
        res.status(201).json(response)
    },
    updateUser: async (req, res) => {
        const userId = res.locals.userId;
        console.log(userId)
        const updatedData = req.body
        if (!updatedData){
            res.status(422).json("Please, enter a fields, which you want to update");
            return;
        }
        const response = await UserService.updateUser(updatedData, userId)
        res.status(200).json(response)
    },
    login: async (req, res) => {
        const response = await UserService.login(req.body);

        if (typeof response === 'string') {
            const status = response.includes("not found") ? 404 : 422;
            res.status(status).json(response);
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
    sendContactMessage: async (req, res) => {
        const body = req.body;

        const response = await UserService.sendContactMessage(body);

        if (typeof response === "string") {
            res.status(500).json(response);
            return;
        }

        res.status(200).json(response);
    },
    deleteAdress: async (req, res) => {
        const addressId = Number(req.params.addressId);
        const deletedAdress = await UserService.deleteAdress(addressId);

        if (!deletedAdress) {
            return res.status(400).json('There was an error while deleting an adress');
        }
        return res.status(200).json(deletedAdress);
    },

    updateAdress: async (req, res) => {
        try {
            const { addressId } = req.params; 
            const data = req.body;

            if (!addressId) {
                return res.status(400).json("Address ID is required");
            }

            const response = await UserService.updateAdress(Number(addressId), data);
            
            if (!response) {
                return res.status(400).json('Error while updating address');
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json("Internal Server Error");
        }
    },

    getUserDeliveries: async(req, res) => {
        const userId = Number(req.params.userId);    
        if (Number.isNaN(userId)) {
            return res.status(401).json("Please, enter id correctly");
        }
        const userDeliveries = await UserService.getUserDeliveries(userId);

        if (!userDeliveries) {
            return res.status(404).json('User does not have any deliveries. Create one.');
        }

        return res.status(200).json(userDeliveries);
    },

    getUserDeliveryById: async(req, res) => {
        const deliveryId = Number(req.params.addressId);
        const delivery = await UserService.getUserDeliveryById(deliveryId);
        
        if (!delivery || typeof delivery === 'string') {
            return res.status(400).json('There was an error while getting an adress');
        }

        return res.status(200).json(delivery);
    },

    getUserOrders: async (req, res) => {
        const email = req.params.email;

        if (!email) {
            res.status(400).json("Email is required");
            return;
        }

        const orders = await UserService.getUserOrders(email);

        if (!orders || (Array.isArray(orders) && orders.length === 0)) {
            res.status(404).json("No orders found for this email");
            return;
        }

        res.status(200).json(orders);
    },
    createOrder: async (req, res) => {
        const userId = res.locals.userId;
        const body = req.body;
        const response = await UserService.createOrder(userId, body)
        res.status(201).json(response)
    },
    createAdress: async (req, res) => {
        const userId = res.locals.userId;
        const body = req.body;
        const response = await UserService.createAdress(body, userId);
        return res.status(201).json(response);
    },
    sendCodeToEmail: async (req, res) => {
        const body = req.body
        const response = await UserService.sendCodeToEmail(body)
        res.status(200).json(response)
    },
    checkAndResetPassword: async (req, res) => {
        const codeFromEmail = req.query.code;
        const body = req.body
        const response = await UserService.checkAndResetPassword(body, codeFromEmail)
        res.status(200).json(response)
    }
};