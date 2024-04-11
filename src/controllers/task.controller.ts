import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTasks = async (request: AuthRequest, response: Response) => {
    try{
        const userId = request.user 
        const tasks = await Task.find({
            user: userId
        })
        response.send(tasks);
    } catch(error){
        response.send({error: "something went wrong getAllTasks"})
        console.log("error in getAllTasks", error);
        throw(error);
    }
}


export const createTask = async (request: AuthRequest, response: Response) => {
    try{
        const  userId = request.user
        const { name, categoryId, date }: ITask = request.body
        const task = await Task.create({
            name,
            categoryId,
            date,
            user: userId
       })
       response.send(task)
    } catch(error){
        console.log("error in createTask", error);
        response.send({error: "something went wrong createTask"})
        throw(error);
    }
}

export const toggleTaskStatus = async (request: AuthRequest, response: Response) => {
    try{
        const  { isCompleted } = request.body
        const { id } = request.params

        const task = await Task.updateOne(
            {
                _id: id,
            },
            {
                isCompleted,
            }
        )
        response.send(task)
    } catch(error){
        console.log("error in toggleTaskStatus", error);
        response.send({error: "something went wrong toggleTaskStatus"})
        throw(error);
    }
}

export const updateTask = async (request: AuthRequest, response: Response) => {
    try{
        const { name, categoryId }: ITask = request.body
        const { id } = request.params

        const task = await Task.updateOne(
            
        )
        
        response.send({message: "Task status updated"})
    } catch(error){
        console.log("error in updateTask", error);
        response.send({error: "something went wrong updateTask"})
        throw(error);
    }
}

export const getAllTasksByCategory = async (request: AuthRequest, response: Response) => {
    try{
        const userId = request.user
        const { id } = request.params
        const tasks = await Task.find({
            user: userId,
            categoryId: id,
        })
        response.send({ tasks, message: "Task status updated" });
    } catch(error){
        console.log("error in getAllTasksByCategory", error);
        response.send({error: "something went wrong getAllTasksByCategory"})
        throw(error);
    }
}

export const getAllCompletedTasks = async (request: AuthRequest, response: Response) => {
    try{
        const userId = request.user
        const tasks = await Task.find({
            user: userId,
            isCompleted: true,
        })
        response.send({ tasks, message: "These tasks are completed" });
    } catch(error){
        console.log("error in getAllCompletedTasks", error);
        response.send({error: "something went wrong getAllCompletedTasks"})
        throw(error);
    }
}

export const getTasksForToday = async (request: AuthRequest, response: Response) => {
    try{
        const userId = request.user
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const tasks = await Task.find({
            user: userId,
            date: formattedDate
        })
       response.send(tasks);
    } catch(error){
        console.log("error in getTasksForToday", error);
        response.send({error: "something went wrong with getTasksForToday"})
        throw(error);
    }
}

export const deleteTask = async (request: AuthRequest, response: Response) => {
    try {
      const { id } = request.params
      await Task.deleteOne({
        _id: id,
      })
      response.send({ message: "Task deleted" })
    } catch (error) {
      console.log("error in deleteTask", error)
      response.send({ error: "Error while deleting task" })
      throw error
    }
}
  
export const editTask = async (request: AuthRequest, response: Response) => {
    try {
      const { _id, categoryId, date, name }: ITask = request.body
      await Task.updateOne(
        {
          _id,
        },
        {
          $set: {
            name,
            categoryId,
            date,
          },
        }
      )
      response.send({ message: "Task updated successfully" })
    } catch (error) {
      console.log("error in editTask", error)
      response.send({ error: " Error while updating the task" })
      throw error
    }
}