import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"



const todos = [
    {id: 1, text: 'buy milk', completedAt: new Date()},
   { id: 2, text: 'buy egg', completedAt: new Date('06-07-2001')},
    {id: 3, text: 'buy bread', completedAt: null
    }
]

export class TodosController {
    //*Inyeccion de dependencias
    constructor(){ }
    public getTodos = async(req:Request,res:Response)=>{
      const todos= await prisma.todo.findMany()
        return res.json(todos)
    }

    public getTodoById= async (req:Request,res:Response)=>{
        const id = +req.params.id;

        if (isNaN(id))return res.status(400).json({ERROR: `id is not a number`}) 
        
        const todo = await prisma.todo.findFirst({where:{id:id}})
        
       todo? res.json(todo): res.status(404).json({error:'No encontrado'})
        

    }

    public CreateTodo= async (req:Request,res:Response)=>{
      const [error, createtodoDto] = CreateTodoDto.create(req.body)

      if (error) return res.status(404).json({error})
     
        
        const todo = await prisma.todo.create({data:
             createtodoDto!

        });
    
        res.json(todo)

    };

    public UpdateTodo = async (req:Request, res:Response)=>{

        const id = +req.params.id
        
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body,id})

        if(error) return res.status(404).json({error})


            const {text, completedAt} =req.body;
           
    console.log(updateTodoDto?.values);

            const todo = await prisma.todo.update({where:{
                id:id
             }, data:updateTodoDto!.values});
         if (!todo) return res.status(404).json({Error:'Todo no existe'})
    
           
          
    //         console.log(completedAt);
    // todo.text = text || todo.text;
    // (completedAt === 'null') ? todo.completedAt = null 
    // : todo.completedAt = new Date(completedAt || todo.completedAt)
    
     res.json(todo)
     
    }
    public DeleteTodo = async(req:Request, res: Response)=>{

        const id = +req.params.id;
        
        const todo = await prisma.todo.findFirst({where:{id}});

        const deleted = await prisma.todo.delete({where:{id}});
        
        if(!todo) return res.status(404).json({Error: `No se encontro ningun paramento con el id: ${id}`});

        
        (deleted)
        ? res.json(deleted)
        : res.status(400).json({Error: `Todo with id ${id} not found`})


      
      
        res.json({todo, deleted})
       

    }

   

}