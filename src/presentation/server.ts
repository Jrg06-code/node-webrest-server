import express, { Router, response } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string
    private readonly routes:Router;

    constructor (option:Options){
        const {port, routes ,public_path='public'}=option;
        this.port=port;
        this.public_path=public_path;
        this.routes=routes;
    }

    async start(){

        //* Middlewares
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended:true}))  //*x-www-form-urlencoded
    

        //* Public Folder
        this.app.use(express.static(this.public_path))

        //*Routes
       
        this.app.use(this.routes)
        //*SPA
        this.app.get('*',(req,res)=>{
            const pathFile = path.join(__dirname,`../../${this.public_path}/index.html`)
            res.sendFile(pathFile)
           
            
        })
        this.app.listen(this.port, ()=> {
            console.log('Server running on port 3000');
        })
    }
}