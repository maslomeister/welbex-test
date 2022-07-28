const express = require("express");
const cors = require("cors");

const { pool, createTableQuery, createTestData } = require("./db/db");
const server = express();
server.use(cors());
server.options("*", cors());
const port = 5000;

pool.query("select * from data", async (err) => {
  if (err) {
    await pool.query(createTableQuery);
    await createTestData();
    console.log("Table is successfully created");
  }
});

server.use(require("./routes"));

server.listen(port, () =>
  console.log(`Server is up at http://localhost:${port}`)
);
