import express from "express"
import { signin, signup, updateUserProfile, uploadImage, userProfile } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/signup" , signup )

router.post("/signin" , signin)

router.get("/user-profile", verifyToken , userProfile)

router.put("/update-profile" , verifyToken , updateUserProfile )

router.post("/upload-image"  , upload.single("image") , uploadImage )

export default router