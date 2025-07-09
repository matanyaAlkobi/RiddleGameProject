import express from "express"
import loadRiddleDatabase from "./DAL/CurdRiddels/read.js"
import { createMenager } from "./service/service.createRiddle.js"

const router = express.Router();


export default router;


router.get('/', async (req, res) => {
    const riddles = await loadRiddleDatabase();

    res.json(riddles)
})

router.post('/create', async (req, res) => {
        const { id, name, taskDescription, correctAnswer, difficulty } = req.body;

    if (
        typeof name !== "string" || name.trim() === "" ||
        typeof taskDescription !== "string" || taskDescription.trim() === "" ||
        typeof correctAnswer !== "string" || correctAnswer.trim() === "" ||
        !["easy", "medium", "hard"].includes(difficulty)
    ) {
        return res.status(400).json({ error: "Invalid riddle data" });
    }
    await createMenager(req.body);
    res.status(201).json({ message: "Riddle saved successfully!", riddle: req.body });

})



