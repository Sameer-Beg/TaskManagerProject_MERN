import express from "express"
import { adminOnly, verifyToken } from "../utils/VerifyUser.js";
import { getUsers } from "../controller/user.controller.js";

const router = express.Router();

// User mangment route
router.get("/get-users" , verifyToken , adminOnly , getUsers)

export default router
