import { IProduct } from "@/models/Product.model";
import BrandRepository from "@/repositories/entities/userRepository/brand.repository";
import ProductRepository from "@/repositories/entities/userRepository/product.repository";
import UserRepository from "@/repositories/entities/userRepository/user.repository";
import { AuthorizationError, ValidationError } from "@/shared/CustomError";
import mongoose,{ Types } from "mongoose";




export default class ProductService {
    private productRepository: ProductRepository
    private brandRepository : BrandRepository
    private userRepository : UserRepository
    constructor (productRepository:ProductRepository,brandRepository:BrandRepository,userRepository : UserRepository){
        this.productRepository = productRepository
        this.brandRepository = brandRepository
        this.userRepository = userRepository
    }
    async create(data:IProduct):Promise<void>{
        try {
           
            const existBrand = await this.brandRepository.findOne('BrandModel',{brandName:data.brand})
            if(!existBrand) throw  new ValidationError(`Brand dosn't exist`)  // * check brand exist or not
            console.log(existBrand,'exitBrand')
            if(!existBrand.categories.includes(data.category)) throw new ValidationError(`Category dosn't exist`)
            console.log(data,'Product')
            data.addedBy = new Types.ObjectId(data.addedBy)
            await this.productRepository.createData('ProductModel',data)

        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async update(data:IProduct,userId:string) : Promise<void>{
        try {
            if(String(data.addedBy)!==userId) throw new AuthorizationError('You are not authorized to update this product.')
            await this.productRepository.updateById('ProductModel',String(data._id),data) 
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async delete(productId:string,userId:string) : Promise<void>{
        try {
            const productData = await this.productRepository.findById('ProductModel',productId)
            if(!productData) throw new ValidationError(`Product doesn't exist`)
            if(String(productData?.addedBy) !==userId) throw new AuthorizationError('You are not authorized to delete this product.')
            await this.productRepository.deleteById('ProductModel',productId)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
  async list({
    price = 0,
    productName = '',
    order = 'acc',
    brand = '',
    category = '',
    userId = ''
}: {
    price: number;
    productName: string;
    order: 'acc' | 'des';
    brand: string;
    category: string;
    userId: string;
}) {
    try {
        let matchStage: { [key: string]: any } = {};
        const userData = await this.userRepository.findById('UserModel', userId);
        const blockUsers: Types.ObjectId[] = userData?.blockedUsers || [];

        // **Filtering Conditions**
        if (price) {
            matchStage.price = price;
        }
        if (productName) {
            matchStage.productName = { $regex: new RegExp(productName, 'i') }; // Case-insensitive search
        }
        if (brand) {
            matchStage.brand = new Types.ObjectId(brand);
        }
        if (category) {
            matchStage.category = category;
        }

        // *Blocking Users
        matchStage.addedBy = { $nin: blockUsers };

        // *Sorting Stage
        let sortStage: { [key: string]: 1 | -1 } = {};
        if (order === 'acc') {
            sortStage.price = 1;
        } else if (order === 'des') {
            sortStage.price = -1; 
        }

        // *Aggregation Pipeline
        const pipeline = [
            { $match: matchStage }, 
            { $sort: sortStage }
        ];

        return await this.productRepository.aggregate('ProductModel', pipeline);
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }

    }
}

