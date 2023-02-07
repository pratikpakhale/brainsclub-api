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

//connect to db and start server
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server started on port ${3000}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
