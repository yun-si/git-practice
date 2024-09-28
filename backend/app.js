require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 3000; // default 3000
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
