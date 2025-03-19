
import { Router } from "express";
import { brandController } from "@/DIP/brand.dip";
const brandRouter = Router()

brandRouter.post('/create',brandController.createBrend.bind(brandController))


export default brandRouter