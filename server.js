const express = require('express');
const app = express();
const port = 3000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World! This is our CI/CD pipeline demo.with jenkins,This is test for Anjali..");
});

