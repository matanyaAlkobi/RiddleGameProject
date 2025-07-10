import fs from "fs/promises";


/**
 * Reads a JSON-formatted text file from the given path,
 * parses its content, and returns the parsed data.
 *
 * @returns {Promise<any>} Parsed JSON data from the file, or error message if failed.
 */
export default async function loadDataFromDatabase(dbPath) {
    try {
        const data = await fs.readFile(dbPath, "utf-8")

        return JSON.parse(data)
    }
    catch (err) {
        console.error("Failed to load DB: " + err.message);
        throw err;
    }
}

// export const riddles = await loadRiddleDatabase()
// console.log(riddles)


