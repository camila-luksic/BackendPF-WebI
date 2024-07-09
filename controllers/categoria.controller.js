import { CategoriaModel } from "../models/categoria";

export class CategoriaController {
    static async getAll(req, res) {
        const cursos = await CategoriaModel.getAll();
        res.json(cursos);
    }
    static async createCategoria(req, res) {
        try {
            const cat = req.body;
            if (!cat) {
                throw new Error('Curso data is missing from the request body');
            }
            const catId = await CategoriaModel.create(cat);
            res.json({
                message: 'Curso creado exitosamente'
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: error.message });
        }
    }

    static async updateCategoria(req,res){
     try{
         const{id}=req.params;
         console.log('Request body:', req.body);
         const { cat } = req.body;
         if (!cat) {
            throw new Error(' data is missing from the request body');
        }
         await CategoriaModel.updateCategoria(id,{ cat });
         res.status(201).send({ message: 'Curso updated successfully' });
        }catch (error) {
            console.error(error);
            res.status(400).send({ error: error.message });
        }
    }
    static async deleteCategoria(req,res){
        try{
            const{id}=req.params;
            console.log(id);
            
            await CategoriaModel.deleteCategoria(id);
            res.status(201).send({ message: ' deleted successfully' });
           }catch (error) {
               console.error(error);
               res.status(400).send({ error: error.message });
           }
       } 
    }
