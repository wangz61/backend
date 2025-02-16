import { Router } from "express";
import { createProduction, deleteProduction, listProductions, updateProduction } from "../controllers/productions";
import { authorize } from "../middlewares/authorization";
import PERMISSIONS from "../constants";

const router = Router();

router.get("/", authorize([PERMISSIONS.PRODUCTS.VIEW]), listProductions);

router.post("/", authorize([PERMISSIONS.PRODUCTS.CREATE]), createProduction);

router.put("/update/:id", authorize([PERMISSIONS.PRODUCTS.EDIT]), updateProduction);

router.delete("/delete/:id", authorize([PERMISSIONS.PRODUCTS.DELETE]), deleteProduction);

export default router;

