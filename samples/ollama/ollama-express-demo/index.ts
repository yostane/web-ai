import { Ollama } from 'ollama'
import express from "express"
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))

const ollama = new Ollama({ host: 'http://localhost:11434' })

app.post("/chat", async (req, res) => {
    const question = req.body.question
    try {
        const response = await ollama.chat({
            model: 'gemma3',
            messages: [{ role: 'user', content: question }],
        })
        res.json({ answer: response.message.content })
    } catch (error) {
        res.status(500).json({ error: 'Error generating response' })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})