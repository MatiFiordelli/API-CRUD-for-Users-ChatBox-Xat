import cors from 'cors'
import express from 'express'
import { connectMongoDB } from './MongoDB/Connection/index.js'
import { 
    insertUser, 
    deleteUser, 
    renameUser, 
    getUsersList 
} from "./MongoDB/Controllers/index.js"

await connectMongoDB()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res)=>{
    res.send('Welcome')
})

app.post('/renameUser', async(req, res) => renameUser(req, res))

app.post('/deleteUser', async(req, res) => deleteUser(req, res))

app.post('/insertUser', async(req, res) => insertUser(req, res))

app.get('/getUsersList', async(req, res) => getUsersList(req, res))

app.options('/', (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.sendStatus(200)
})

app.listen(PORT, () => console.log('Server running'))