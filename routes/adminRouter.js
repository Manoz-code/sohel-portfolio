import express from "express";
import { loginAdmin } from "../controller/adminController.js";
import { updateContent ,getContent} from "../controller/contentUpdate.js";
import { protect } from "../middleware/authmiddleware.js";


const router = express.Router();

router.post("/login", loginAdmin);
router.get("/getContent", getContent)
router.put("/updateContent",protect,updateContent);

export default router