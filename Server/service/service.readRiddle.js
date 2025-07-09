import loadRiddleDatabase from "../DAL/CurdRiddels/read.js";

// export const allRiddels = await loadRiddleDatabase();

async function ggg(new){
    const allRiddels = await loadRiddleDatabase();
    if (!allRiddels) res.status(500).send("server internal erorr");
    allRiddels.push(new);
    writefile
    res.status(201).send("")
}