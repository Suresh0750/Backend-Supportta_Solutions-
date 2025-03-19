
import { ValidationError } from "@/shared/CustomError";
import { Request, Response, NextFunction } from "express";
import validator from "validator";

export const validateBrand = (req: Request, res: Response, next: NextFunction) => {
    try {
        
    const { brandName, brandLogo, categories } = req.body;

    if (!brandName || !validator.isLength(brandName, { min: 2, max: 50 })) {
        throw new ValidationError("Brand name must be between 2 and 50 characters" )
    }
    if (!brandLogo || !validator.isURL(brandLogo)) {
        throw new ValidationError("Invalid URL for brand logo" )
    }

    if (!Array.isArray(categories) || categories.length === 0 || categories.some(cat => !cat.trim())) {
        throw new ValidationError("At least one valid category is required" )
    }

    next(); 
    } catch (error) {
        next(error)
    }
};
