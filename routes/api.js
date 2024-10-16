import express from "express";
import { UserController } from "../controllers/UserController.js";
import { PostController } from "../controllers/PostController.js";
import { AuthController } from "../controllers/AuthController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { CategoryController } from "../controllers/CategoryController.js";
import { Uploads } from "../utils/Uploads.js";

const router = express.Router();

const upload = Uploads.uploadFile();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);


router.use(AuthMiddleware.authorization);

//routes inside middleware
router.get("/users", UserController.index);
router.post("/users", UserController.store);
router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);
router.get("/posts", PostController.index);
router.get("/posts/:id", PostController.show);
router.post("/posts", upload.single("image"), PostController.store);
router.put("/posts/:id", PostController.update);
router.delete("/posts/:id", PostController.destroy);
router.get("/categories", CategoryController.index);
router.post("/categories", CategoryController.store);
router.get("/categories/:id", CategoryController.show);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.destroy);

export { router };
