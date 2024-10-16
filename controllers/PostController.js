import { prisma } from "../database/prisma.js";
import { Auth } from "../services/Auth.js";
import { Storage } from "../services/Storage.js";

class PostController {
  static async index(req, res) {
    const authorId = Auth.user(req).id;
    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: Number(authorId),
        },
        include: {
          User: true,
          category: true,
        },
      });
      posts.forEach((post) => {
        post.image = Storage.getUrl(post.image);
      });
      return res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async store(req, res) {

    const authorId = Auth.user(req).id ;
    const file = req.file;

    if (!req.body.title || !req.body.content || !req.body.category_id) {
      return res.status(422).json({
        message: "Title, category and content are required",
      });
    }
    let uploadedFile = null;
    if (file) {
      uploadedFile = await Storage.put(file, 'posts');
    }

    try {
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          categoryId: Number(req.body.category_id),
          image: file ? uploadedFile.Key : null,
          authorId: Number(authorId),
        },
      });

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async show(req, res) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(req.params.id),
          authorId: Auth.user(req).id,
        },
      });

      if (!post) return res.sendStatus(404);

      post.image = Storage.getUrl(post.image);

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async update(req, res) {
    const file = req.file;

    if (!req.body.title || !req.body.content || !req.body.category_id) {
      return res.status(422).json({
        message: "Title, category and content are required",
      });
    }
    let uploadedFile = null;
    if (file) {
      uploadedFile = await Storage.put(file, 'posts');
    }

    try {
      const post = await prisma.post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          image: file ? uploadedFile.Key : null,
          categoryId: Number(req.body.category_id),
        },
      });

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async destroy(req, res) {
    try {
      await prisma.post.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
}

export { PostController };
