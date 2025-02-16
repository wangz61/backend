import express from "express";
import UsersRouter from "./routes/users";
import RolesRouter from "./routes/roles";
import ProductsRouter from "./routes/productions";
import OrdersRouter from "./routes/orders";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth";
import { authenticate } from "./middlewares/authentication";

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(authenticate);

app.use("/auth", AuthRouter);
app.use("/users", UsersRouter);
app.use("/roles", RolesRouter);
app.use("/products", ProductsRouter);
app.use("/orders", OrdersRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});