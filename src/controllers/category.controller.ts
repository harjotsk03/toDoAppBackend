import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Category from "../models/category-model";
import { ICategory } from "../types";

export const getAllCetegories = async (request: AuthRequest, response: Response) => {
    try{
        const { user } = request

        const categories = await Category.find({
            user: user,
        })
        return response.send(categories);
    } catch(error){
        response.send({error: "something went wrong createCategory"})
        console.log("error in getAllCategories", error);
        throw(error);
    }
}

export const createCategory = async (request: AuthRequest, response: Response) => {
    try{
       const { color, icon, isEditable, name }: ICategory = request.body
       const { user } = request

       const category = await Category.create({
        isEditable,
        color,
        icon,
        name,
        user
       })
       response.send(category)
    } catch(error){
        console.log("error in createCategory", error);
        response.send({error: "something went wrong createCategory"})
        throw(error);
    }
}

export const deleteCategory = async (request: AuthRequest, response: Response) => {
    try{
       const { id } = request.params;
       await Category.deleteMany({ _id: id});
       response.send({ message: "category deleted" });
    } catch(error){
        console.log("error in deleteCategory", error);
        response.send({error: "something went wrong with deleting a category"})
        throw(error);
    }
}

export const updateCategory = async (request: AuthRequest, response: Response) => {
    try{
       const { _id, color, icon, isEditable, name }: ICategory = request.body
       await Category.updateOne({
            _id,
        },
        {
            $set: {
                name, 
                color,
                icon,
                isEditable,
            },
        }
       )
       response.send({ message: "category updated successfully" });
    } catch(error){
        console.log("error in deleteCategory", error);
        response.send({error: "something went wrong with updating a category"})
        throw(error);
    }
}

