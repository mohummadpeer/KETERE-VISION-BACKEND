"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const result = await db_1.db.query("SELECT NOW() as time");
        res.json({
            message: "Neon PostgreSQL connected ✔",
            server_time: result.rows[0].time,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Database test error" });
    }
});
exports.default = router;
