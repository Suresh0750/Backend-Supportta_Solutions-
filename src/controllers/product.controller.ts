import ProductService from "../services/product.services";
import { SuccessResponse } from "../shared/ApiResponse";
import { AuthenticatedRequest } from "../shared/CustomeRequest";
import { AuthenticationError } from "../shared/CustomError";
import { HttpStatus } from "../shared/HttpStatusCode";
import { NextFunction,Response} from "express";



export default class ProductController{
    private productService : ProductService
    constructor(productService:ProductService){
        this.productService = productService
    }
    async exec(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            await this.productService.create(req.body)
            SuccessResponse(res,HttpStatus.Success,"New Product added successfully")
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
    async update(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            const {user} : any = req.user
            if (!user?._id) {
                throw new AuthenticationError("Unauthorized: You must be logged in to perform this action.");
            }
            await this.productService.update(req.body,String(user?._id),req?.file)
            SuccessResponse(res,HttpStatus.Success,"Product updated successfully")
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
    async delete(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            const {user} : any = req.user
            if (!user?._id) {
                throw new AuthenticationError("Unauthorized: You must be logged in to perform this action.");
            }
            await this.productService.delete(req.params.productId,user._id)
            SuccessResponse(res,HttpStatus.Success,"brand deleted successfully")
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
    async fetch(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            const {user} : any = req.user

            if (!user?._id) {
                throw new AuthenticationError("Unauthorized: You must be logged in to perform this action.");
            }

            const productDetails = await this.productService.list({
                price: Number(req.query.price) || 0, 
                productName: String(req.query.productName || ''), 
                order: req.query.order === 'des' ? 'des' : 'acc', 
                brand: String(req.query.brand || ''), 
                category: String(req.query.category || ''), 
                userId: String(user?._id)
            });

            SuccessResponse(res,HttpStatus.Success,"Product fetched successfully",productDetails)
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}