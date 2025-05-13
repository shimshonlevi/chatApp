import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.use('/api/auth',userRoutes,() => {console.log("hello");
})

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err.message)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})