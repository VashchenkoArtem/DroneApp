import express from "express"
import type { Express } from "express"
import productsRouter from './Products/products.router'
import categoriesRouter from './Categories/categories.router'
import userRouter from "./User/user.router"

const HOST: string = "127.0.0.1"
const PORT: number = 8000
const app: Express = express()

app.use(express.json())
app.use(productsRouter)
app.use(categoriesRouter)
app.use(userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server: http://${HOST}:${PORT}`)
})