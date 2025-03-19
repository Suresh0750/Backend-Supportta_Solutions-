

import BrandRepository from "@/repositories/entities/userRepository/brand.repository";
import BrandService from "@/services/brand.services";
import BrandController from "@/controllers/brand.controller";

const brandRepository = new BrandRepository()
const brandService = new BrandService(brandRepository)
const brandController = new BrandController(brandService)


export {brandController}
