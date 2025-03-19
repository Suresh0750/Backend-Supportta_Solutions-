import BrandService from "@/services/brand.services";
import {Request,Response, NextFunction } from "express";



export default class BrandController{
    private brandService : BrandService
    constructor(brandService:BrandService){
        this.brandService = brandService
    }
    async createBrend(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            await this.brandService.createBrand(req.body)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}