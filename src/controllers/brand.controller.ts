import BrandService from "../services/brand.services";
import { SuccessResponse } from "../shared/ApiResponse";
import { ValidationError } from "../shared/CustomError";
import { HttpStatus } from "../shared/HttpStatusCode";
import {Request,Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../shared/CustomeRequest";



export default class BrandController{
    private brandService : BrandService
    constructor(brandService:BrandService){
        this.brandService = brandService
    }
    async createBrand(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try{
            await this.brandService.createBrand({...req.body,brandLogo:req?.file})
            SuccessResponse(res,HttpStatus.Success,"New brand added successfully")
        }catch(error){
            console.error(error)
            next(error)
        }
    }
    async getBrand(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            if(!req.params.categories) throw new ValidationError('categories is missing')
            const brandData = await this.brandService.getBrand(req.params.categories)
            SuccessResponse(res,HttpStatus.Success,"Successfully retrieved brand details",brandData)
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}   
