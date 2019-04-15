import express from "express";
import tests from "./tests";
const router = express.Router();

router.use("/tests", tests);
// router.use("");
export default router;
