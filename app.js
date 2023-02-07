const express = require('express')
const app = express()

const mongoose = require('mongoose')
const Log = require('./log')

require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(require('cors')())

app.use(express.json())

app.post('/log', (req, res) => {
  try {
    const log = new Log(req.body)
    log.save()
    res.send(log)
  } catch (err) {
    res.send(err)
  }
})

// start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Connected to database')
    })
    .catch(err => {
      console.log(err)
    })
})
