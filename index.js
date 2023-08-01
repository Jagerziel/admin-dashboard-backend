import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import generalRoutes from './routes/general.js'
import clientRoutes from './routes/client.js'
import salesRoutes from './routes/sales.js'
import managementRoutes from './routes/management.js'

// Data Imports
import User from "./models/User.js"
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import { dataUser , dataProduct , dataProductStat , dataTransaction }from "./data/index.js"

// CONFIGURATIONS
// Congigure Env File
dotenv.config()

// Use Instance of Express
const app = express()
app.use(express.json())
// Use for implementing CORS - needed to make API calls from another server
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" } ))
// Use Morgan - Morgan is another HTTP request logger middleware for Node. js. It simplifies the process of logging requests to your application.
app.use(morgan("common"))
// Use Body Parser - Express body-parser is an npm module used to process data sent in an HTTP request body. It provides four express middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: false } ))
// Use CORS to allow cross origin requests
app.use(cors())

// ROUTES
app.use("/client", clientRoutes) //Client Facing Routes
app.use("/general", generalRoutes) // Gets the Users and the Dashboard
app.use("/management", managementRoutes) //Management Routes 
app.use("/sales", salesRoutes) // Sales Routes

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))  

        /* ONLY ADD DATA ONE TIME - WILL CAUSE ERRORS WITH MULTIPLE DB INJECTIONS - WATCH AUTO SAVE!!!!*/
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)
        // Transaction.insertMany(dataTransaction)
        // User.insertMany(dataUser)
    })
    .catch((error) => console.log(`${error} did not connect`))


