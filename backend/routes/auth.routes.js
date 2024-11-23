import express from "express";

const router = express.Router();

router.get("/signin", (req, res) => {
  res.send("Login Route...");
});

router.get("/signup", (req, res) => {
  res.send("Register Route...");
});
router.get("/logout", (req, res) => {
  res.send("Logout Route...");
});

export default router;
