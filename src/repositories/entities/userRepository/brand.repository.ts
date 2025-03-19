import CommonBaseRepository from "@/repositories/baseRepositories/commonBaseRepository";

import BrandModel, { IBrand } from "@/models/brand.model";


export default class BrandRepository extends CommonBaseRepository<{BrandModel : IBrand}>{
    constructor(){
        super({
            BrandModel : BrandModel
        })
    }
    async exec(data:IBrand) : Promise<void>{
        try {
            await this.createData('BrandModel',data)
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }   
    async fecthBrand(categories:string) : Promise<IBrand[] | undefined>{
        try {
            const query = {$in:[categories]}
            return await this.findAll('BrandModel',query)
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }
} 