import express from "express";

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  res.status(200).json({
    data: "THE TEST WORKED!!!!",
    success: true,
  });
});

router.route("/").post(async (req, res, next) => {
  res.status(200).json({
    data: "THE TEST WORKED!!!!",
    success: true,
  });
});

export default router;
