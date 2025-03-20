import { Router } from "express";
import { productController } from "@/DIP/product.dip";
import authenticateToken from "@/middleware/authenticateToken";
import { authorizeRole } from "@/middleware/roleMiddleware";
import { Role } from "@/utils/constants";
import { upload } from "@/middleware/multer";
import { validateProduct } from "@/middleware/productValidation";
const productRouter = Router()


productRouter.post('/create',authenticateToken,authorizeRole([Role.User]),upload.single('image'),validateProduct,productController.exec.bind(productController))
productRouter.put('/update',authenticateToken,authorizeRole([Role.User]),upload.single('image'),productController.update.bind(productController))
productRouter.delete('/delete/:productId',authenticateToken,authorizeRole([Role.User]),productController.delete.bind(productController))
productRouter.get('/filter',authenticateToken,authorizeRole([Role.User]),productController.fetch.bind(productController))


export default productRouter;