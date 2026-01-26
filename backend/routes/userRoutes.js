import express from "express";
import { login, register } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToHistory, getUserHistory } from "../controllers/meetController.js";

const router = express.Router();

// router.route("/login").post(login);
// router.route("/register").post(register);
// router.route("/addToActivity").post(authMiddleware);
// router.route("/getAllActivities").get(authMiddleware);

router.post("/login" , login);
router.post("/register" , register);
router.post("/addToActivity" ,authMiddleware, addToHistory);
router.get("/getAllActivities" , authMiddleware , getUserHistory);

//protected route
router.get("/profile" , authMiddleware , (req , res) => {
    res.status(200).json({ message : `Hello , ${req.user.username} . You have accessed a protected route.` });
});

export default router;