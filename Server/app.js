import "dotenv/config";
import express from "express";
import riddelsRouter from "./routs/routerRiddels.js";
import playerRouter from "./routs/routerPlayer.js";
import { connectToMongo } from "./lib/mongoDB.js";

const PORT = 4545;
const server = express();

// Middleware to parse incoming JSON requests
server.use(express.json());

// All routes starting with /riddels will be handled by riddelsRouter
server.use("/riddels", riddelsRouter);
server.use("/player", playerRouter);

await connectToMongo()

/**
 * Starts the server and listens on the specified port
 */
server.listen(process.env.SERVER_PORT, () => {
  console.log("server listening... ");
});
