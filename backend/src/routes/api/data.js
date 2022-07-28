const router = require("express").Router();
const { pool } = require("../../db/db");

router.get("/", async function (req, res) {
  const maxRowsPerPage = 10;
  let offset = 0;
  let field = "id";
  let condition = "";
  let value = "";

  if (typeof req.query.offset !== "undefined") {
    offset = Number(req.query.offset);
  }

  if (typeof req.query.field !== "undefined") {
    if (
      !(
        req.query.field === "name" ||
        req.query.field === "amount" ||
        req.query.field === "distance"
      )
    ) {
      return res.status(400).json({ message: "Wrong field" });
    }
    field = req.query.field;
  }

  if (
    typeof req.query.field !== "undefined" &&
    typeof req.query.condition !== "undefined" &&
    typeof req.query.value !== "undefined"
  ) {
    if (
      !(
        req.query.condition === "bigger" ||
        req.query.condition === "smaller" ||
        req.query.condition === "equals" ||
        req.query.condition === "contains"
      )
    ) {
      return res.status(400).json({ message: "Wrong filter condition" });
    }

    condition = req.query.condition;
    value = req.query.value;
  }

  let query = "SELECT * FROM data";
  if (condition && (field === "amount" || field === "distance")) {
    let operation = "";
    value = Number(value);
    switch (condition) {
      case "smaller":
        operation = ` WHERE ${field} < ${value} ORDER BY ${field} DESC`;
        break;
      case "bigger":
        operation = ` WHERE ${field} > ${value} ORDER BY ${field} ASC`;
        break;
      case "equals":
        operation = ` WHERE ${field} = ${value} ORDER BY ${field}`;
        break;
      default:
        operation = "";
    }
    query += operation;
  }

  if (condition === "contains") {
    if (field === "name") {
      query += ` WHERE ${field} LIKE '${value}%'`;
    } else {
      return res
        .status(400)
        .json({ message: "Condition contains only allowed name field" });
    }
  }

  try {
    const getAllRows = (await pool.query(query)).rowCount;
    const pages =
      getAllRows > 0 ? Math.floor((getAllRows - 1) / maxRowsPerPage) : 1;

    query += ` OFFSET ${offset} ROWS LIMIT ${maxRowsPerPage}`;

    const result = await pool.query(query);

    return res.status(200).json({ data: result.rows, pages });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
        message: "unexpected internal server error",
      });
    }
  }

  return res.status(200).json({ error: "true" });
});

module.exports = router;
