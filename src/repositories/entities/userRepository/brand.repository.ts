import CommonBaseRepository from "../../../repositories/baseRepositories/commonBaseRepository";

import BrandModel, { IBrand } from "../../../models/brand.model";
import { ConflictError } from "../../../shared/CustomError";


export default class BrandRepository extends CommonBaseRepository<{BrandModel : IBrand}>{
    constructor(){
        super({
            BrandModel : BrandModel
        })
    }
    async exec(data:IBrand) : Promise<void>{
        try {
            await this.createData('BrandModel',data)
        } catch (error:any) {
            if(error?.code === 11000){
                throw new ConflictError('Brand Name should be unique')
           }else throw error
        }
    }   
    async fecthBrand(categories:string) : Promise<IBrand[] | undefined>{
        try {
            const query = {categories :{$in:[categories]}}
            return await this.findAll('BrandModel',query)
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }
} 