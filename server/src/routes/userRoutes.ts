import express from "express";
import { vote, unvote, getUsers } from "../controllers/userController";
import { authMiddleware } from "../utils/authMiddleware";
const voterouter = express.Router();

voterouter.post("/vote", authMiddleware, vote);
voterouter.post("/unvote", authMiddleware, unvote);
voterouter.get("/getUsers", getUsers);

export default voterouter;
