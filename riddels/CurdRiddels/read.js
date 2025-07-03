import fs from "fs/promises";

/**
 * Reads a JSON-formatted text file from the given path,
 * parses its content, and returns the parsed data.
 *
 * @returns {Promise<any>} Parsed JSON data from the file, or error message if failed.
 */
export default async function loadRiddleDatabase() {
    try {
        const riddelsData = await fs.readFile("./riddels/riddelsDB/db.txt", "utf-8")

        return JSON.parse(riddelsData)
    }
    catch (err) {
        return err.message;
    }
}

// export const riddles = await readFile()


