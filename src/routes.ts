import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.route("/test").get(async (req, res, next) => {
  res.status(200).json({
    data: "THE TEST WORKED",
    success: true,
  });
});

export default router;
