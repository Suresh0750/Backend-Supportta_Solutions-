import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { ValidationError } from "@/shared/CustomError";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('product validations')
        const { productName, description, price, category, brand, productImage, addedBy } = req.body;

    if (!productName || productName.length < 2 || productName.length > 100) {
        throw new ValidationError("Product name must be between 2 and 100 characters")
    }

    if (!description || description.length < 10) {
        throw new ValidationError("Description must be at least 10 characters long")
    }


    if (!price || isNaN(price) || price <= 0) {
        throw new ValidationError("Price must be a positive number")
    }


    if (!category || category.trim() === "") {
        throw new ValidationError("Category is required")
    }


    if (!brand || !validator.isLength(brand, { min: 2, max: 50 })) {
        throw new ValidationError("Invalid brand ID")
    }

    
    if (productImage && !validator.isURL(productImage)) {
        throw new ValidationError("Invalid image URL")
    }

 
    if (!validator.isMongoId(addedBy)) {
        throw new ValidationError("Invalid addedBy user ID")
    }

    next();
    } catch (error) {
    next(error)
    }
};
