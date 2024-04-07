import {Router} from 'express';
import { TodosController } from './controller';


export class TodosRoutes {

    static get routes():Router{

        const router = Router();
       const todoController= new TodosController();

        router.get('/', (req,res) => todoController.getTodos(req,res) )
        router.get('/:id', (req,res) => todoController.getTodoById(req,res) )
        router.post('/', (req,res) => todoController.CreateTodo(req,res) )
        router.put('/:id', (req,res) => todoController.UpdateTodo(req,res) )
        router.delete('/:id', (req,res) => todoController.DeleteTodo(req,res) )
        
        return router
    }
}