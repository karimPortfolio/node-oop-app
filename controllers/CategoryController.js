import { prisma } from "../database/prisma.js";
import { Auth } from "../services/Auth.js";

class CategoryController {
  static async index(req, res) {
    try {
      const categories = await prisma.category.findMany({
        include: {
            user: true,
        }
      });
      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const category = await prisma.category.findUnique({
        where: {
          id: Number(id),
        },
        include: {
            user: true,
            posts: true
        }
      });

      return res.status(200).json(category);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(422).json({
        message: "Name is required",
      });
    }

    try {
      const category = await prisma.category.create({
        data: {
          name,
          createdBy: Auth.user(req).id
        },
      });

      return res.status(201).json(category);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(422).json({
        message: "Name is required",
      });
    }

    try {
      const category = await prisma.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          updatedBy: Auth.user(req).id
        },
      });

      return res.status(200).json(category);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      await prisma.category.delete({
        where: {
          id: Number(id),
        },
      });

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
}

export { CategoryController };
