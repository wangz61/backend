import { Router } from "express";
import { createUser, deleteUser, listUsers, getUser, updateUser } from "../controllers/users";
import { authorize } from "../middlewares/authorization";
import PERMISSIONS from "../constants";

const router = Router();

router.post("/", authorize([PERMISSIONS.USERS.CREATE]), createUser);

router.delete("/delete", authorize([PERMISSIONS.USERS.DELETE]), deleteUser);

router.get("/", authorize([PERMISSIONS.USERS.VIEW]), listUsers);

router.get("/:id", authorize([PERMISSIONS.USERS.VIEW]), getUser);

router.put("/update", authorize([PERMISSIONS.USERS.EDIT]), updateUser);

export default router;
