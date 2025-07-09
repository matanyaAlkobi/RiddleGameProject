import {createRiddle,askForRiddleId} from "./uiManager.js"
export async function createRiddleHandler() {
    const newObj = createRiddle();
    const response = await fetch("http://localhost:4545/riddels/create", {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
            "Content-Type": "application/json"
        }

    }).then(data => data.json())
    console.log(response)
}


export async function viewRiddlesHandler() {
    const allRiddels = await fetch("http://localhost:4545/riddels")
        .then(data => data.json())
    console.log(allRiddels)
}

export  async function updateRiddleHandler(){
    const inputId = askForRiddleId();
                const newUpdateriddle = createRiddle()
                try{
                const updated = await fetch(`http://localhost:4545/riddels/update/${inputId}`,{
                        method: "PUT",
                        body: JSON.stringify(newUpdateriddle),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(res => res.json())
                    console.log(updated)
                }
                catch(err){
                            console.error("Failed to update riddle:", err.message);
                }
}

