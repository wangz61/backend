import { Router } from "express";
import { createOrder, deleteOrder, listOrders, updateOrder, getOrderById } from "../controllers/orders";
import { authorize } from "../middlewares/authorization";
import PERMISSIONS from "../constants";

const router = Router();

router.get("/", authorize([PERMISSIONS.ORDERS.VIEW]), listOrders);

router.post("/", authorize([PERMISSIONS.ORDERS.CREATE]), createOrder);

router.put("/update/:id", authorize([PERMISSIONS.ORDERS.EDIT]), updateOrder);

router.delete("/delete/:id", authorize([PERMISSIONS.ORDERS.DELETE]), deleteOrder);

router.get("/:id", authorize([PERMISSIONS.ORDERS.VIEW]), getOrderById);

export default router;

