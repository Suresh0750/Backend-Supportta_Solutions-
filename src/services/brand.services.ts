import { IBrand } from "@/models/brand.model";
import BrandRepository from "@/repositories/entities/userRepository/brand.repository";



export default class BrandService{
    private brandRepository : BrandRepository
    constructor(brandRepository: BrandRepository){
        this.brandRepository = brandRepository
    }
    async createBrand(data:IBrand){
        try {
            await this.brandRepository.exec(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}