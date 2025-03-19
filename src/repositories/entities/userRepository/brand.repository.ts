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
        } catch (error) {
            console.error(error)
            throw error
        }
    }   
} 