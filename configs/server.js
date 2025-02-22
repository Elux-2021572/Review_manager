"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";   
import { dbConnection } from "./mongo.js";
import  apiLimiter from "../src/middlewares/rate-limit-validator.js";
<<<<<<< Updated upstream
=======
import authRoutes from "../src/auth/auth.router.js"
import userRoutes from "../src/user/user.router.js"
import categoryRoutes from "../src/category/categoty.router.js"
import postRoutes from "../src/post/post.router.js"

>>>>>>> Stashed changes

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

const routes = (app) => {
<<<<<<< Updated upstream
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
=======
    app.use("/reviewManager/v1/auth",authRoutes)
    app.use("/reviewManager/v1/user",userRoutes)
    app.use("/reviewManager/v1/category",categoryRoutes)
    app.use("/reviewManager/v1/post",postRoutes)
>>>>>>> Stashed changes
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3001; 
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};