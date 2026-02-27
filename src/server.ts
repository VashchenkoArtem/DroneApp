import express from "express"
import type { Express } from "express"
import { Request, Response } from 'express';
import productsRouter from './Products/products.router'
import categoriesRouter from './Categories/categories.router'
import userRouter from "./User/user.router"
import cors  from "cors"
import fs from 'fs';



interface NPCity {
    Description: string;
    Ref: string;
}

interface NPResponse<T> {
    success: boolean;
    data: T[];
    errors?: string[];
}

interface Warehouse {
    Description: string;
    Ref: string;
    TypeOfWarehouse: string;
}


const HOST: string = "127.0.0.1"
const PORT: number = 8000
const app: Express = express()

app.use((req, res, next) => {
    console.log(`Отримано запит: ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(productsRouter)
app.use(categoriesRouter)
app.use(userRouter)

app.post('/api/np-proxy', async (req, res) => {
    try {
        const { modelName, calledMethod, methodProperties } = req.body;
        
        const bodyToSend = {
            apiKey: "33233be18be816540f8826ef5cf78813",
            modelName,
            calledMethod,
            methodProperties: {
                CityRef: methodProperties.CityRef
            }
        };

        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyToSend)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера" });
    }
});

const allCitiesData: NPCity[] = JSON.parse(fs.readFileSync('cities.json', 'utf8')).data;

app.get('/api/cities', (req: Request, res: Response) => {
    const searchQuery = (req.query.search as string || "").toLowerCase();
    
    if (!fs.existsSync('cities.json')) {
        return res.status(404).json({ success: false, message: "Файл міст не знайдено" });
    }

    const rawData = fs.readFileSync('cities.json', 'utf8');
    const cities: NPCity[] = JSON.parse(rawData).data;
    
    const filtered = cities
        .filter((city) => city.Description.toLowerCase().includes(searchQuery))
        .slice(0, 20);

    return res.json({ success: true, data: filtered });
});

app.get('/api/warehouses', async (req: Request, res: Response) => {
    const cityRef = req.query.cityRef as string;
    console.log("Запит до НП для міста:", cityRef);

    if (!cityRef) {
        return res.status(400).json({ error: "Не вказано cityRef" });
    }

    try {
        const methodProperties: { CityRef: string } = {
            CityRef: cityRef
        };

        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                apiKey: "33233be18be816540f8826ef5cf78813",
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: methodProperties
            })
        });

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: "Помилка сервера при отриманні відділень" });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server: http://${HOST}:${PORT}`)
})