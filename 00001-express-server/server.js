import express from 'express';

const app = express();

/**
 * Middleware for read the data from the frontend
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// store all the notes here
const notes = []

// checking server is running or not and api's too.
app.get("/", (req, res) => {
    return res.json({
        message: "Api is alive",
    })
})


/**
 * @param GET /api/notes
 * fetched all notes
 */
app.get("/api/notes", (req, res) => {
    return res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

/**
 * @param POST /api/notes
 * created a new note
 */
app.post("/api/notes", (req, res) => {

    const { title, description } = req.body

    let newNote = {
        title, description
    }
    notes.push(newNote)

    return res.status(201).json({
        message: "Note created successfully",
        note: newNote
    })
})

/**
 * @param PATCH /api/notes/:id
 * updated particular note
 */
app.patch("/api/notes/:id", (req, res) => {

    const { id } = req.params
    const { title, description } = req.body

    if (!notes[id]) {
        return res.status(404).json({
            message: "Note not found"
        })
    }

    notes[id].title = title

    return res.status(200).json({
        message: "Note updated successfully",
        note: notes[id]
    })
})
 
/**
 * @param DELETE /api/notes/:id
 * deleted particular note
 */
app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params

    if (!notes[id]) {
        return res.status(404).json({
            message: "Note not found"
        })
    }

    notes.splice(Number(id), 1)

    return res.status(200).json({
        message: "Note deleted successfully",
    })

})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})