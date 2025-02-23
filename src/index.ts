import express from "express";
import UsersRouter from "./routes/users";
import RolesRouter from "./routes/roles";
import ProductionsRouter from "./routes/productions";
import OrdersRouter from "./routes/orders";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth";
import { authenticate } from "./middlewares/authentication";
import cors from "cors";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authenticate);


app.use("/users", UsersRouter);
app.use("/roles", RolesRouter);
app.use("/auth", AuthRouter);
app.use("/productions", ProductionsRouter);
app.use("/orders", OrdersRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});