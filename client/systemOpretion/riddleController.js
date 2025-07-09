import { createRiddle, askForRiddleId } from "./uiManager.js"
export async function createRiddleHandler() {
    const newObj = createRiddle();
    const createResponse = await fetch("http://localhost:4545/riddels/create", {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
            "Content-Type": "application/json"
        }

    }).then(data => data.json())
    console.log(createResponse)
}


export async function viewRiddlesHandler() {
    const allRiddels = await fetch("http://localhost:4545/riddels")
        .then(data => data.json())
    console.log(allRiddels)
}

export async function updateRiddleHandler() {
    const inputId = askForRiddleId();
    const newUpdateriddle = createRiddle()
    try {
        const updatedResponse = await fetch(`http://localhost:4545/riddels/${inputId}`, {
            method: "PUT",
            body: JSON.stringify(newUpdateriddle),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
        console.log(updatedResponse)
    }
    catch (err) {
        console.error("Failed to update riddle:", err.message);
    }
}

export async function deleteRiddleHandler() {
    const inputId = askForRiddleId();
    try{
        const deletedResponse = await fetch(`http://localhost:4545/riddels/${inputId}`,{
            method: "DELETE",
        })
        .then(res => res.json());
        console.log(deletedResponse)
    }
    catch(err){
        console.error("Failed to delete riddle:", err.message)
    }
    
}

