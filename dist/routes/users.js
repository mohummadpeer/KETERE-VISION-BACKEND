"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("../services/userService");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    try {
        const user = req.body;
        // Vérif simple
        if (!user.email || !user.password) {
            return res.status(400).json({ error: "Email et mot de passe obligatoires" });
        }
        const newUser = await (0, userService_1.createUser)(user);
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user: newUser,
        });
    }
    catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
exports.default = router;
