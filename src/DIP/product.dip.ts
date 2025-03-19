
import ProductController from "@/controllers/product.controller";
import ProductRepository from "@/repositories/entities/userRepository/product.repository";
import ProductService from "@/services/product.services";
import BrandRepository from "@/repositories/entities/userRepository/brand.repository";
import UserRepository from "@/repositories/entities/userRepository/user.repository";


const productRepository = new ProductRepository()
const brandRepository = new BrandRepository()
const userRepository = new UserRepository()
const productService = new ProductService(productRepository,brandRepository,userRepository)
const productController = new ProductController(productService)

export {productController}