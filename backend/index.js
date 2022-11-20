const express = require('express')
const cookie = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./db')
const path = require('path')
const app = express()
const PORT = process.env.port || 5000
const multer = require('multer')
const authRouter = require('./routes/auth')
const cors = require('cors')
connectDB(process.env.MONGO_URI)



// middleware
app.use(cors())
app.use(express.json())
app.use(cookie())

app.use('/images', express.static(path.join(__dirname, './public/images')))

// multer -- middleware for handling multipart form/data
const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null , './public/images')
  },
  filename : (req, file, cb) => {
    cb(null, req.body.name)
  }

})

const upload = multer({storage : storage})

app.post('/api/upload', upload.single('file') ,(req, res) => {
  try {
    res.status(201).json("File uploaded successfully!")
  } catch (err) {
    res.status(500).json(err)
  }
})

app.use('/api/user', authRouter)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})