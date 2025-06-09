
import express from "express"
import { connectDB } from "./config/mongo"
import { BooksRoutes } from "./routes/BooksRoutes"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
// función para configurar las petición post
// permite capturar el json enviado en req.body
app.use(express.json())

app.use("/api/books", BooksRoutes)

app.use("", (req, res) => {
  res.status(404).json({ success: false, message: "not found resource" })
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})