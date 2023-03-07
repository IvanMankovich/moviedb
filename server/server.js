require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const UserRouter = require("./controllers/User");
const TodoRouter = require("./controllers/Todo");
const { createContext } = require("./controllers/middleware");

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(createContext);

app.get("/", (req, res) => {
  res.send("health check");
});
app.use("/user", UserRouter);
app.use("/todos", TodoRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
