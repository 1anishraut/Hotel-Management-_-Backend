require("dotenv").config(); // ✅ Load dotenv first
const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const http = require("http");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const User = require("./Models/user");
const { log } = require("console");
const { json } = require("stream/consumers");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // ✅ To handle JSON requests too

// Connect to DB
connectDB();



// Example route
app.get("/users", async (req, res) => {
  try {
    const allDbUsers = await User.find({});
    const html = `
  <ul>
  ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
  </ul>
  `;
    res.send(html);
  } catch (error) {
    res.status(404).json(error.message)
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const allDbUsers = await User.find({});
    const html = `
  <ul>
  ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
  </ul>
  `;
    res.send(html);
  } catch (error) {
    res.status(404).json(error.message)
  }
});

app.get("/api/users/:id", async (req, res) => {
  const id = await User.findById(req.params.id) 
  console.log(id);
  return res.json(id);
});

app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;
    console.log("Request body:", body);

    await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      emailId: body.emailId,
    });

    res.status(201).json({ message: "User Data Added" });
  } catch (err) {
    console.error("Error inserting user:", err.message);
    res.status(500).json({ error: "Failed to add user" });
  }
});
app.patch("/api/users/:id", async (req, res)=>{
  const newData = req.body
  console.log(newData);
  
  const user = await User.findByIdAndUpdate(req.params.id, {firstName: newData.firstName})
  return res.json(user)
})

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({status: "User Deleted"})
});

// Create HTTP server with express app
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
