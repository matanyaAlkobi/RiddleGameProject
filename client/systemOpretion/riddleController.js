import { createRiddle, askForId, getInputFromUser } from "./uiManager.js";

/**
 * Sends a POST request to create a new riddle using user input.
 */
export async function createRiddleHandler() {
  const newObj = createRiddle();
  const createResponse = await fetch("http://localhost:4545/riddels/create", {
    method: "POST",
    body: JSON.stringify(newObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  console.log(createResponse);
}

/**
 * Fetches and logs all riddles from the server.
 */
export async function viewRiddlesHandler() {
  const allRiddels = await fetch("http://localhost:4545/riddels").then((data) =>
    data.json()
  );
  console.log(allRiddels);
}

/**
 * Prompts for a riddle ID and updated data, then sends a PUT request to update the riddle.
 */
export async function updateRiddleHandler() {
  const inputId = getInputFromUser("enter a id to update: ");
  const newUpdateriddle = createRiddle();
  try {
    const updatedResponse = await fetch(
      `http://localhost:4545/riddels/${inputId}`,
      {
        method: "PUT",
        body: JSON.stringify(newUpdateriddle),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    console.log(updatedResponse);
  } catch (err) {
    console.error("Failed to update riddle:", err.message);
  }
}

/**
 * Prompts for a riddle ID and sends a DELETE request to remove the riddle.
 */
export async function deleteRiddleHandler() {
  const inputId = getInputFromUser("enter a id to delete: ");

  try {
    const deletedResponse = await fetch(
      `http://localhost:4545/riddels/${inputId}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
    console.log(deletedResponse);
  } catch (err) {
    console.error("Failed to delete riddle:", err.message);
  }
}
