import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { router } from "./routes/api.js";
import { AppConfig } from "./config/app.js";
import cors from "cors";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) ;

app.use(cookieParser());

app.use("/api/v1/", router);

const port = AppConfig.getAppPortConfig();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
