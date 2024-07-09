
import { UserModel } from "../models/user.js";


export class UserController {
    static async getAll(req, res) {
        const users = await UserModel.getAll();
        res.json(users);
    }
    
    static  async createUser (req, res) {
    try {
        console.log('Request body:', req.body);
        const { user } = req.body;

        if (!user) {
            throw new Error('User data is missing from the request body');
        }
  
        await UserModel.create({ user });
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
    }
    static async login(req,res ) {
        const{email, password }=req.body;
        console.log("-");
        console.log(req.body);
        const user=await UserModel.login({email,password});
        if(!user){
            res.status(401).json("Usuario no encontrado");
        }
        
        return res.json(user);
    }

};

