import express from 'express'
import { getProducts } from "../controllers/client.js"

const router = express.Router()

router.get("/products" , getProducts)

const clientRoutes = router
export default clientRoutes
