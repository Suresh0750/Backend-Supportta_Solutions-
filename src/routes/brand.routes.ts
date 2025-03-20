
import { Router } from "express";
import { brandController } from "../DIP/brand.dip";
import authenticateToken from "../middleware/authenticateToken";
import { authorizeRole } from "../middleware/roleMiddleware";
import { Role } from "../utils/constants";
import { validateBrand } from "../middleware/validators/brandValidation";
import { upload } from "../middleware/multer";



const brandRouter = Router()

brandRouter.post('/create',authenticateToken,authorizeRole([Role.User]),upload.single('brandLogo'),validateBrand,brandController.createBrand.bind(brandController))
brandRouter.get('/list/:categories',authenticateToken,authorizeRole([Role.User]),brandController.getBrand.bind(brandController))


export default brandRouter