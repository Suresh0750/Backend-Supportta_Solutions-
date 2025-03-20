import { IBrand } from "../models/brand.model";
import BrandRepository from "../repositories/entities/userRepository/brand.repository";
import { uploadToCloudinary } from "../utils/cloudinaryHelper";



export default class BrandService{
    private brandRepository : BrandRepository
    constructor(brandRepository: BrandRepository){
        this.brandRepository = brandRepository
    }
    async createBrand(data:IBrand):Promise<void>{
        try {
            const brandLogo = await uploadToCloudinary(data?.brandLogo as  Express.Multer.File)
            data.brandLogo = brandLogo
            await this.brandRepository.exec(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getBrand(categories:string):Promise<IBrand[]|undefined>{
        try {
            return await this.brandRepository.fecthBrand(categories)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}