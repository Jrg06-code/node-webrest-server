import { Request, Response } from "express"



const todos = [
    {id: 1, text: 'buy milk', completedAt: new Date()},
   { id: 2, text: 'buy egg', completedAt: new Date('06-07-2001')},
    {id: 3, text: 'buy bread', completedAt: null
    }
]

export class TodosController {
    //*Inyeccion de dependencias
    constructor(){ }
    public getTodos = (req:Request,res:Response)=>{
        return res.json(todos)
    }

    public getTodoById= (req:Request,res:Response)=>{
        const id = +req.params.id;

        if (isNaN(id))return res.status(400).json({ERROR: `id is not a number`}) 
        
        const todo = todos.find(todo =>todo.id === id)
        
       todo? res.json(todo): res.status(404).json({error:'No encontrado'})
        

    }

    public CreateTodo=(req:Request,res:Response)=>{
      const {text} = req.body
      if (!text) return res.status(400).json({Error:'Text is required'})
    
        const newTodo ={id:todos.length+1, text: text, completedAt:null}
    todos.push(newTodo)
    res.json(newTodo)

    }

    public UpdateTodo = (req:Request, res:Response)=>{

        const id = +req.params.id
        console.log(id);
        if (isNaN(id))return res.status(400).json({ERROR: `id is not a number`}) 

         const todo = todos.find(todo =>todo.id===id);
         if (!todo) return res.status(404).json({Error:'Todo no existe'})
    
            const {text, completedAt} =req.body;
          
            console.log(completedAt);
    todo.text = text || todo.text;
    (completedAt === 'null') ? todo.completedAt = null 
    : todo.completedAt = new Date(completedAt || todo.completedAt)
    
     res.json(todo)
     
    }
    public DeleteTodo = (req:Request, res: Response)=>{

        const id = +req.params.id;
        

        const todo = todos.find(todo => todo.id ===id)
        if(!todo) return res.status(404).json({Error: `No se encontro ningun paramento con el id: ${id}`})


      todos.splice(todos.indexOf(todo),1)
      
        res.json(`${todo.text} eliminado correctamente`)
       

    }

   

}