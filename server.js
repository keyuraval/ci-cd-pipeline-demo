const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! This is our CI/CD pipeline demo.with jenkins");
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
