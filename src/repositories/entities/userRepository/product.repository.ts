import ProductModel, { IProduct } from "../../../models/Product.model";
import CommonBaseRepository from "../../../repositories/baseRepositories/commonBaseRepository";



export default class ProductRepository extends CommonBaseRepository<{ProductModel:IProduct}>{
    constructor(){
        super({
            ProductModel : ProductModel
        })
    }
    async exec(data:IProduct) : Promise<void>{
        try {
            await this.createData('ProductModel',data)
        } catch (error:unknown) {
            console.error(error)
            throw error
        }
    }

}