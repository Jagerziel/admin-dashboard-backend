import express from 'express'
import { getProducts , getCustomers , getTransactions } from "../controllers/client.js"


const router = express.Router()

router.get("/products" , getProducts)
router.get("/customers", getCustomers)
router.get("/transactions", getTransactions)

const clientRoutes = router
export default clientRoutes
