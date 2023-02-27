import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import os from 'os'

const downloadsFolder = path.join(os.homedir(), 'Downloads');
const server = express()
server.use(cors())

server.get('/songs', (req, res) => {
  fs.readdir(downloadsFolder, (err, files) => {
    let finderedSongs = files.filter(file => path.extname(file) == '.mp3')
    res.send(finderedSongs)
  })
})

server.get('/songs/:id', (req, res) => {
  let id = req.params.id
  res.sendFile(downloadsFolder + '/' + id)
})

server.listen(8080)
