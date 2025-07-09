import express from "express";

import riddelsRouter from "./router.js";


const PORT = 4545;
const server = express();
server.use(express.json())
server.use("/riddels",riddelsRouter)


server.listen(PORT,()=>{
    console.log("server listening... ")
})

