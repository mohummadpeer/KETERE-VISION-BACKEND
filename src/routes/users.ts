import { Router } from "express";
import { createUser } from "../services/userService";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = req.body;

    // Vérif simple
    if (!user.email || !user.password) {
      return res.status(400).json({ error: "Email et mot de passe obligatoires" });
    }

    const newUser = await createUser(user);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: newUser,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
