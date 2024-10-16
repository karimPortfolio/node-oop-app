import { prisma } from "../database/prisma.js";


class UserController {

    static async index(req, res) {
        try
        {
            const users = await prisma.user.findMany();
            return res.status(200).json(users);
        }
        catch(err)
        {
            console.log(err);
            return res.sendStatus(400);
        }
    }

    static async store(req, res) {
        if (!req.body.name || !req.body.email)
        {
            return res.status(422).json({
                message: "Name and email are required"
            });
        }
       try
       {
          const user = await prisma.user.create({
            data: {
              name: req.body.name,
              email: req.body.email
            }
          });
          return res.status(200).json(user);
       }
       catch(err)
       {
           console.log(err);
           return res.sendStatus(400);
       }
    }

    static async show(req, res) {
       try
       {
           const user = await prisma.user.findUnique({
               where: {
                   id: Number(req.params.id)
               },
               include:{
                   Post: true,
                   categories: true
               }
           });
           if (!user)
           {
               return res.sendStatus(404);
           }
           return res.status(200).json(user);
       }
       catch(err)
       {
           console.log(err);
           return res.sendStatus(400);
       }
    }

    static async update(req, res) {
        if (!req.body.name || !req.body.email)
        {
            return res.status(422).json({
                message: "Name and email are required"
            });
        }
        try
        {
            const user = await prisma.user.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    name: req.body.name,
                    email: req.body.email
                }
            });
            return res.status(200).json(user);
        }
        catch(err)
        {
            console.log(err);
            return res.sendStatus(400);
        }
    }

    static async destroy(req, res) {
        try
        {
            await prisma.user.delete({
                where: {
                    id: Number(req.params.id)
                }
            });
            return res.status(200).json("User deleted with success");
        }
        catch (err)
        {
            console.log(err);
            return res.sendStatus(400);
        }   
    }

}



export { UserController };
