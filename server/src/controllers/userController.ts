import { Request, Response } from "express";
import {
  updateVote,
  updateReverseVote,
  getAllUsers,
} from "../service/dbServices";
import { AuthRequest } from "../utils/authMiddleware";

export const vote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { votedFor } = req.body;
    if (!userId) return;
    const user = await updateVote(userId, votedFor);
    if (!user) {
      res.status(400).json({ message: "You have already voted" });
    } else {
      res.status(201).json({ message: "Your vote has been recorded" + user });
    }
  } catch (error) {
    res.status(400).json("תקלה בהרשמה");
  }
};

export const unvote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { votedFor } = req.body;
    if (!userId) return;
    const user = await updateReverseVote(userId, votedFor);
    res.status(201).json({ message: "Your vote has been removed" + user });
  } catch (error) {
    res.status(400).json("תקלה בהרשמה");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("תקלה בהרשמה");
  }
};
