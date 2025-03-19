import { Model, Document, FilterQuery, Query, UpdateQuery } from "mongoose";

import bcrypt from "bcryptjs";
import { ConflictError } from "@/shared/CustomError";

export default class CommonBaseRepository<TModels extends Record<string, Document>> {

    protected models: { [K in keyof TModels]: Model<TModels[K]> };

    constructor(models: { [K in keyof TModels]: Model<TModels[K]> }) {
        this.models = models;
    }

    findById<K extends keyof TModels>(modelName: K, id: string): Query<TModels[K] | null, TModels[K]> {
        try {
            const model = this.models[modelName];
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
        
            return model.findById(id);
        } catch (error) {
            console.error(error)
            throw error
        }
       
    }

    createData<K extends keyof TModels>(modelName: K, data: Partial<TModels[K]>): Promise<TModels[K]> {
        try {
            const model = this.models[modelName];
        if (!model) throw new Error(`Model ${String(modelName)} not found`);
    
        return model.create(data);
        } catch (error:unknown) {
             throw error
        }
        
    }

    findOne<K extends keyof TModels>(modelName: K, query: FilterQuery<TModels[K]>): Query<TModels[K] | null, TModels[K]> {
        try {     
            const model = this.models[modelName];
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
        
            return model.findOne(query);
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    findAll<K extends keyof TModels>(modelName: K, query?: FilterQuery<TModels[K]>): Query<TModels[K][], TModels[K]> {
        const model = this.models[modelName];
        try {
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
    
            let queryBuilder = model.find(query || {})
            return queryBuilder;
        } catch (error) {
            console.error(error)
            throw error
        }

    }

    updateById<K extends keyof TModels>(modelName: K, id: string, data: UpdateQuery<TModels[K]>): Promise<TModels[K] | null> {
        try {      
            const model = this.models[modelName];
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
        
            return model.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            console.error(error)
            throw error
        }
        
    }

    deleteById<K extends keyof TModels>(modelName: K, id: string): Promise<TModels[K] | null> {
        try {
            const model = this.models[modelName];
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
        
            return model.findByIdAndDelete(id).exec();
        } catch (error) {
            console.error(error)
            throw error
        }

    }

    updateMany<K extends keyof TModels>(modelName: K, query: FilterQuery<TModels[K]>, data: UpdateQuery<TModels[K]>): Promise<{ modifiedCount: number }> {
        try {     
            const model = this.models[modelName];
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
    
            return model.updateMany(query, data).exec();
        } catch (error) {
            console.error(error)
            throw error
        }

    }

    deleteMany<K extends keyof TModels>(modelName: K, query: FilterQuery<TModels[K]>): Promise<{ deletedCount: number }> {
        try {
            const model = this.models[modelName];
            
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
    
            return model.deleteMany(query).exec();
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    aggregate<K extends keyof TModels>(modelName: K, pipeline: any[]): Promise<any[]> {
        try {
            const model = this.models[modelName];
            if (!model) throw new Error(`Model ${String(modelName)} not found`);
        
            return model.aggregate(pipeline).exec();
        } catch (error) {
            console.error(error)
            throw error
        }

    }
    

}