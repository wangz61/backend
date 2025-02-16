import { Router } from "express";
import { createRole, deleteRole, listRoles, updateRole } from "../controllers/roles";
import { authorize } from "../middlewares/authorization";
import PERMISSIONS from "../constants";

const router = Router();

router.get("/", authorize([PERMISSIONS.ROLES.VIEW]), listRoles);

router.post("/", authorize([PERMISSIONS.ROLES.CREATE]), createRole);

router.put("/update/:id", authorize([PERMISSIONS.ROLES.EDIT]), updateRole);

router.delete("/delete/:id", authorize([PERMISSIONS.ROLES.DELETE]), deleteRole);

export default router;

