import express from 'express'
import path from 'path'
import serveIndex from 'serve-index'

const app = express()

// app.use(express.static(path.join(__dirname, '')))
app.use(express.static(__dirname))
app.use(serveIndex(__dirname))
//app.use(express.errorHandler())

const server = app.listen(8080, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`Server started successfully on http://${host}:${port}`)
})
