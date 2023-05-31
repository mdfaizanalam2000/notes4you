const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());

require('./db/connection');
const port = 80;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})