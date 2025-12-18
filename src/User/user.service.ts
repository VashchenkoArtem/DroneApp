import { ENV } from "../config/env";
import { UserRepository } from "./user.repository";
import { IUserServiceContract } from "./user.types";
import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'

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
        const token = sign({id: createdUser.id}, ENV.SECRET_KEY, {
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
    }
    
}
