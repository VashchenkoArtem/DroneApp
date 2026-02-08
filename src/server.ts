import express from "express"
import type { Express } from "express"
import productsRouter from './Products/products.router'
import categoriesRouter from './categories/categories.router'
import userRouter from "./User/user.router"
import cors  from "cors"

const HOST: string = "127.0.0.1"
const PORT: number = 8000
const app: Express = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(productsRouter)
app.use(categoriesRouter)
app.use(userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server: http://${HOST}:${PORT}`)
})