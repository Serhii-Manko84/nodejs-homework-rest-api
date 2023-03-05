const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const payload = { id: "63fda16173ceef73ef9ac37f" };
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

try {
  const id = jwt.verify(token, SECRET_KEY);
  console.log(id);
} catch (error) {
  error.status = 401;
  console.log(error.status);
  console.log(error.message);
}

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
