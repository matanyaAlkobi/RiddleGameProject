import fs from "fs/promises";


/**
 * Reads and parses JSON data from a file.
 *
 * @param {string} dbPath - Path to the JSON database file
 * @returns {Promise<any>} Parsed JSON content from the file
 * @throws Throws an error if reading or parsing fails
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




