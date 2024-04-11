import express, { Request, Response } from "express";
import { connectedToDatabase } from "./db";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors());

const PORT = 1337;

require('dotenv').config();

connectedToDatabase();

app.get("/ping", (request: Request, response: Response) => {
    response.send("Pong");
})

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is up and running");
});


