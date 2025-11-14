import { Router } from "express";
import { db } from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() as time");
    res.json({
      message: "Neon PostgreSQL connected ✔",
      server_time: result.rows[0].time,
    });
  } catch (error) {
    res.status(500).json({ error: "Database test error" });
  }
});

export default router;
