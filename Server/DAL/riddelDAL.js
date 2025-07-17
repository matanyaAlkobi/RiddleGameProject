import { client, collection, connectToMongo } from "../lib/mongoDB.js";
import chalk from "chalk";
import { ObjectId } from "mongodb";

/**
 * Fetches all riddles from the database.
 *
 * @async
 * @function fetchAllRiddles
 * @returns {Promise<Array>} An array of riddle documents from the database.
 * @throws {Error} If the database connection or fetch fails.
 */
export default async function loadDataFromDatabase() {
  try {
    const data = await collection.find().toArray();
    return data;
  } catch (err) {
    console.error("Failed to load DB: " + err.message);
    throw err;
  } finally {
    await client.close();
  }
}

/**
 * Inserts a new riddle document into the database.
 *
 * @async
 * @function createRiddle
 * @param {Object} report - An object representing the riddle data to be inserted.
 * @returns {Promise<ObjectId>} The ObjectId of the newly created riddle document.
 * @throws {Error} Throws an error if the insertion operation fails.
 */

export async function createRiddle(report) {
  try {
    const createResult = await collection.insertOne({ report });
    console.log(
      chalk.green(
        "The new data has been successfully entered into the database."
      )
    );

    return createResult.insertedId;
  } catch (err) {
    console.error("Failed to create a riddle:", err);
    throw err;
  } finally {
    await client.close();
  }
}

/**
 * Deletes a riddle document by its ID.
 *
 * @param {string} id - The string representation of the MongoDB ObjectId.
 * @returns {Promise<boolean>} True if a document was deleted, false otherwise.
 */
export async function deleteRiddleById(id) {
  try {

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount === 1;
  } catch (err) {
    console.error("Failed to delete riddle:", err);
    throw err;
  } finally {
    await client.close();
  }
}




/**
 * Updates specific fields of a riddle document in the database by its ID.
 *
 * @async
 * @function updateRiddleById
 * @param {string} id - The string representation of the MongoDB ObjectId.
 * @param {Object} updatedFields - An object containing the fields and their new values to update.
 * @returns {Promise<boolean>} Returns true if the document was successfully updated; otherwise, false.
 * @throws {Error} Throws an error if the update operation fails.
 */

export async function updateRiddleById(id, updatedFields) {
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields }
    );

    return result.modifiedCount === 1;
  } catch (err) {
    console.error("Failed to update riddle:", err);
    throw err;
  } finally {
    await client.close();
  }
}
