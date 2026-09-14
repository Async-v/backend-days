import express from 'express';
import noteModel from '../models/notes.model.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.status(200).json({
        status: "ok",
        message: "Api is healthy"
    })
})

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    return res.status(201).json({
        message: "note created successfully",
        data: {
            note
        }
    })
})


app.get('/api/notes', async (req, res) => {

    const notes = await noteModel.find()

    return res.status(200).json({
        message: "notes fetched successfully",
        data: {
            notes
        }
    })
})


app.patch('/api/notes/:_id', async (req, res) => {
    const { _id } = req.params
    const { title, description } = req.body

    let existNote = await noteModel.find({_id})
    const note = await noteModel.findOneAndUpdate(
        {
            _id
        },
        {
            title: existNote.title || title,
            description: existNote.description || description
        },
        { new: true}
    )

    return res.status(200).json({
        message: "note updated successfully",
        data: {
            note
        }
    })
})

app.delete('/api/notes/:_id', async(req, res) => {
    const { _id } = req.params

    await noteModel.findByIdAndDelete(_id)

    res.status(204).json({
        message: "note deleted successfully"
    })
})

export default app