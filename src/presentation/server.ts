import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string

    constructor (option:Options){
        const {port, public_path='public'}=option;
        this.port=port;
        this.public_path=public_path;
    }

    async start(){

        //* Middlewares
        this.app.use(express.static(this.public_path))

        //* Public Folder

        this.app.get('*',(req,res)=>{
            const pathFile = path.join(__dirname,`../../${this.public_path}/index.html`)
            res.sendFile(pathFile)
           
            
        })
        this.app.listen(this.port, ()=> {
            console.log('Server running on port 3000');
        })
    }
}