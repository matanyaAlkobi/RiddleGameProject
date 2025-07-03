import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../riddelsDB/db.txt");


/**
 * Reads a JSON-formatted text file from the given path,
 * parses its content, and returns the parsed data.
 *
 * @returns {Promise<any>} Parsed JSON data from the file, or error message if failed.
 */
export default async function loadRiddleDatabase() {
    try {
        const riddelsData = await fs.readFile(dbPath, "utf-8")

        return JSON.parse(riddelsData)
    }
    catch (err) {
        throw new Error("Failed to load riddles: " + err.message);
    }
}

// export const riddles = await loadRiddleDatabase()
// console.log(riddles)


