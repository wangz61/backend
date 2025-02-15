import express from "express";
import UsersRouter from "./routes/users";

const PORT = 4000;
const app = express();

app.use("/users", UsersRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});