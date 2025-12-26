import nodemailer from 'nodemailer';
import { ENV } from "../config/env";
import { UserRepository } from "./user.repository";
import { IUserServiceContract } from "./user.types";
import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const UserService: IUserServiceContract = {
    registration: async (data) => {
        const user = await UserRepository.findUserByEmail(data.email)

        if (user) {
            return 'User already exist. Try to log in'
        }
        
        const hashedPassword = await hash(data.password, 10)
        
        const dataWithHashedPassword = {
            ...data,
            password: hashedPassword
        }
        

        const createdUser = await UserRepository.createUser(dataWithHashedPassword)
        if (!createdUser) {
            return "Error creating user";
        }
        const token = jwt.sign({id: createdUser.id}, ENV.SECRET_KEY, {
            expiresIn: '7d'
        })

        return {token}
    },
    
    updateUser: async(data, userId) => {
        const updatedUser = await UserRepository.updateUser(userId, data)
        return updatedUser
    },

    login: async (data) => {
        const authUser = await UserRepository.findUserByEmail(data.email)

        if (!authUser) {
            return "User not found. Please, register your account"
        }

        const matchingTokenValue = await compare(data.password, authUser.password);
        if (!matchingTokenValue){
			return "Wrong credentials. Please, try again"
		} 

		const token = sign({ id: authUser.id }, ENV.SECRET_KEY, { expiresIn: "7d" })
		return {token}
    },

    me: async (id) => {
        const foundedUser = await UserRepository.findUserByIdWithoutPassword(id)
        if (!foundedUser){
            return "cannot find user"
        }
        return foundedUser
    },
    sendContactMessage: async (userId, data) => {
        try {
            const user = await UserRepository.findUserByIdWithoutPassword(userId);
            
            if (!user) {
                return "User not found. Please log in again.";
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: ENV.MAIL_USER, // Ваша системна пошта (відправник)
                    pass: ENV.MAIL_PASS  // Пароль додатка
                }
            });
            await transporter.sendMail({
                from: ENV.MAIL_USER,
                to: ENV.ADMIN_EMAIL, // Пошта адміністратора, куди прийде лист
                replyTo: user.email, // ВАЖЛИВО: пошта користувача з БД (для відповіді)
                subject: `Нове повідомлення від ${user.firstName} ${user.lastName}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.5;">
                        <h2>Звернення через контактну форму</h2>
                        <p><b>Від кого:</b> ${user.firstName} ${user.lastName}</p>
                        <p><b>Email користувача (з профілю):</b> <a href="mailto:${user.email}">${user.email}</a></p>
                        <p><b>Телефон (з форми):</b> ${data.phone}</p>
                        <hr />
                        <p><b>Повідомлення:</b></p>
                        <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${data.message}</p>
                    </div>
                `
            });

            return { success: true };
        } catch (error) {
            console.error("Mail service error:", error);
            return "Failed to send email";
        }
    },
    deleteAdress: async (data) => {
        const adress = await UserRepository.deleteAdress(data)
        if (!adress) {
            return 'Adress was not found. Try another adress.'
        }
        return adress
    },

    updateAdress: async(adressId, data) => {
        const updatedAdress = await UserRepository.updateAdress(adressId, data)
        return updatedAdress
    },

    getUserDeliveries: async(userId) => {
        const userDeliveries = await UserRepository.getUserDeliveries(userId)
        return userDeliveries
    },

    getUserDeliveryById: async(id) => {
        const delivery = await UserRepository.getUserDeliveryById(id)

        if (!delivery){
            return "Delivery with this id cannot be found"
        }

        return delivery
    },

    getUserOrders: async(userId) => {
        const userOrders = await UserRepository.getUserOrders(userId)
        return userOrders
    },
    createOrder: async(userId, data) => {
        const newOrder = await UserRepository.createOrder(userId, data)
        return newOrder
    },
    createAdress: async(data, userId) => {
        const adress = await UserRepository.createAdress(data, userId)
        if (!adress) {
            return 'Adress was not found. Try another adress.'
        }
        return adress
    },
    
}
