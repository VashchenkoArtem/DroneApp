import nodemailer from 'nodemailer';
import { ENV } from "../config/env";
import { UserRepository } from "./user.repository";
import { IUserServiceContract, UserWithoutPassword } from "./user.types";
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
        const authUser = await UserRepository.findUserByEmail(data.email);
        if (!authUser) return "User not found. Please, register your account";

        const isMatch = await compare(data.password, authUser.password);
        if (!isMatch) return "Wrong credentials. Please, try again";

        const token = sign({ id: authUser.id }, ENV.SECRET_KEY, { expiresIn: "7d" });
        
        const { password, ...userProfile } = authUser;
        return { 
            token, 
            user: userProfile as UserWithoutPassword 
        };
    },

    me: async (id) => {
        const foundedUser = await UserRepository.findUserByIdWithoutPassword(id)
        if (!foundedUser){
            return "cannot find user"
        }
        return foundedUser
    },
    sendContactMessage: async (data) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: ENV.MAIL_USER,
                pass: ENV.MAIL_PASS 
            }
        });
        await transporter.sendMail({
            from: ENV.MAIL_USER,
            to: ENV.ADMIN_EMAIL,
            replyTo: data.email,
            subject: `Нове повідомлення від ${data.userName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Звернення через контактну форму</h2>
                    <p><b>Від кого:</b> ${data.userName}</p>
                    <p><b>Email користувача (з профілю):</b> <a href="mailto:${data.email}">${data.email}</a></p>
                    <p><b>Телефон (з профілю):</b> ${data.phoneNumber}</p>
                    <hr />
                    <p><b>Повідомлення:</b></p>
                    <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${data.message}</p>
                </div>
            `
        });

        return { success: true };
    },
    deleteAdress: async (id: number) => {
        const adress = await UserRepository.deleteAdress(id);
        if (!adress) {
            return 'Adress was not found. Try another adress.';
        }
        return adress;
    },

    updateAdress: async (addressId: number, data) => {
        return await UserRepository.updateAdress(addressId, data);
    },

    getUserDeliveries: async(userId) => {
        const userDeliveries = await UserRepository.getUserDeliveries(userId);
        return userDeliveries;
    },

    getUserDeliveryById: async(id) => {
        const delivery = await UserRepository.getUserDeliveryById(id);
        if (!delivery) {
            return 'Delivery was not found. Try another delivery.';
        }
        return delivery;
    },

    getUserOrders: async(email) => {
        const orders = await UserRepository.getUserOrders(email)
        return orders
    },
    createOrder: async(userId, data) => {
        const newOrder = await UserRepository.createOrder(userId, data)
        return newOrder
    },
    createAdress: async(data, userId) => {
        const adress = await UserRepository.createAdress(data, userId);
        return adress || 'Adress could not be created';
    },
    
    sendCodeToEmail: async (data) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: ENV.MAIL_USER,
                pass: ENV.MAIL_PASS 
            }
        });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await transporter.sendMail({
            from: ENV.MAIL_USER,
            to: data.email,
            replyTo: data.email,
            subject: `Reset password code`,
            html: `
            <h1>Your password reset code:</h1>
            <a style="color: blue;">http://127.0.0.1:8000/users/recovery-password?code=${code}</a>
            `
        });
        return "Code sent to email successfully. Please, check your inbox.";
    },
    checkAndResetPassword: async (data, codeFromEmail) => {
        console.log(data.code, codeFromEmail);
        if (data.code != codeFromEmail) {
            return "Invalid code. Please try again.";
        }
        const hashedPassword = await hash(data.password, 10);
        await UserRepository.checkAndResetPassword(data.email, hashedPassword);
        return "Password has been successfully updated.";
    }
}
