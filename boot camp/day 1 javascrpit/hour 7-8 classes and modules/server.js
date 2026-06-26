import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hospital Management System</h1><p>Server is running successfully!</p>");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});