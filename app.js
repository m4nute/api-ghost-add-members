const express = require("express")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(
  cors({
    origin: "*",
    methods: "POST",
  })
)
app.use(express.json())
const PORT = 3000

app.post("/add/members", async (req, res) => {
  try {
    const GhostAdminAPI = require("@tryghost/admin-api")

    const api = new GhostAdminAPI({
      url: "https://manus-trial-project.ghost.io",
      version: "v5.0",
      key: process.env.ADMIN_API_KEY,
    })
    const email = req.body.email
    const member = await api.members.add({ email })
    res.status(200).json({ message: "Member added successfully" })
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error", message: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
