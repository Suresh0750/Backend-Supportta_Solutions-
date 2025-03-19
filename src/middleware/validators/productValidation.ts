import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { ValidationError } from "@/shared/CustomError"; 

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productName, description, price, category, brand, addedBy } = req.body;

        
        if (!productName || !validator.isLength(productName, { min: 3, max: 100 })) {
            throw new ValidationError("Product name must be between 3 and 100 characters", 400);
        }

      
        if (description && !validator.isLength(description, { max: 500 })) {
            throw new ValidationError("Description must be at most 500 characters", 400);
        }

        if (!price || !validator.isNumeric(price.toString()) || parseFloat(price) <= 0) {
            throw new ValidationError("Price must be a positive number", 400);
        }

        if (!category || !validator.isLength(category, { min: 3, max: 50 })) {
            throw new ValidationError("Category must be between 3 and 50 characters", 400);
        }

        if (!brand || !validator.isLength(brand, { min: 2, max: 50 })) {
            throw new ValidationError("Brand must be between 2 and 50 characters", 400);
        }

        if (!req.file) throw new ValidationError("Product Image is required");
    

        if (!addedBy || !validator.isMongoId(addedBy)) {
            throw new ValidationError("addedBy must be a valid MongoDB ObjectId", 400);
        }

        next(); 

    } catch (error) {
        next(error);
    }
};
