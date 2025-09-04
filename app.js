import "dotenv/config";
import express from "express";
import riddelsRouter from "./routs/routerRiddels.js";
import playerRouter from "./routs/routerPlayer.js";
import userRouter from "./routs/user.route.js";
import { connectToMongo } from "./lib/mongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const server = express();
server.use(cookieParser());

server.use(cors({
  origin: [
    'http://localhost:5175',
    'http://localhost:5174', 
    'http://localhost:5173',
    'http://localhost:3000',
    'https://riddlegameproject.onrender.com'
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Middleware
server.use(express.json());

// All routes starting with /riddels will be handled by riddelsRouter
server.use("/riddels", riddelsRouter);
server.use("/player", playerRouter);
server.use("/user", userRouter);

await connectToMongo();

/**
 * Starts the server and listens on the specified port
 */
server.listen(process.env.SERVER_PORT, () => {
  console.log("server listening... ");
});
