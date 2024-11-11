import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./dal/dal";
import authrouter from "./routes/authRoutes";
import userrouter from "./routes/userRoutes";
import candidateouter from "./routes/candidateRoute";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
connectToDatabase();

app.use("/auth", authrouter);
app.use("/users", userrouter);
app.use("/admin", candidateouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is runing on port" + PORT);
});
