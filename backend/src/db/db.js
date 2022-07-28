const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const createTableQuery = `
CREATE TABLE data (
    id SERIAL,
    date timestamp,
    name varchar,
    amount numeric,
    distance numeric
);
`;

const pool = new Pool({
  host: isProduction ? "db" : "localhost",
  user: "docker",
  database: "docker",
  password: "password",
});

const createTestData = async () => {
  console.log("Create test data");
  const now = new Date();
  console.log(now);

  for (let i = 0; i < 100; i++) {
    await pool.query(
      "INSERT INTO data (date,name,amount,distance) VALUES($1,$2,$3,$4)",
      [
        now,
        (Math.random() + 1).toString(36).substring(7),
        Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 100 * Math.pow(10, 2)) / Math.pow(10, 2),
      ]
    );
  }
};

module.exports = {
  pool,
  createTableQuery,
  createTestData,
};
