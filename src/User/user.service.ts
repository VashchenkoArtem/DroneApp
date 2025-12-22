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

    createAdress: async(data, userId) => {
        const adress = await UserRepository.createAdress(data, userId)
        if (!adress) {
            return 'Adress was not found. Try another adress.'
        }
        return adress
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

    
    
}
