import User, { IUser } from "../models/userModel";
import Candidate,  { ICandidate } from "../models/CandidateModel";
import { Types } from "mongoose";

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const newUser = await User.create(user);
  return newUser;
};
export const findUserByName = async (
  username: string
): Promise<IUser | null> => {
  const user = await User.findOne({ username: username });
  return user;
};
export const getAllUsers = async (): Promise<IUser[] | null> => {
  return await User.find().select("-password");
};

export const getAllCandidate = async (): Promise<ICandidate[] | null> => {
    return await Candidate.find()
  };

export const updateVote = async (id: Types.ObjectId,votedfor: Types.ObjectId): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (user?.hasVoted) {
    return null;
  }
  const userupdated = await User.findByIdAndUpdate(id, { votedfor: votedfor , hasVoted : true });
  const candidate = await Candidate.findByIdAndUpdate(votedfor , {$inc: {votes : 1}},{new : true})
  console.log("Updated candidate:", candidate);
  return userupdated
};

export const updateReverseVote = async (id: Types.ObjectId,votedfor: Types.ObjectId): Promise<IUser | null> => {
    const user = await User.findById(id);
    if (!user?.hasVoted) {
      return null;
    }
    const userupdated = User.findByIdAndUpdate(id, { votedfor: null , hasVoted : false });
    const candidate = await Candidate.findByIdAndUpdate(votedfor , {$inc: {votes : -1}})
    return userupdated;
  };