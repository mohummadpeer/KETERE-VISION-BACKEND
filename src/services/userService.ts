import { db } from "../db";
import bcrypt from "bcrypt";
import { User } from "../types/User";

export async function createUser(user: User) {
  const {
    nom,
    prenom,
    email,
    adresse,
    complement_adresse,
    code_postal,
    ville,
    telephone,
    password,
  } = user;

  const passwordHash = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (
      nom, prenom, email, adresse, complement_adresse, 
      code_postal, ville, telephone, password_hash
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id, nom, prenom, email, created_at;
  `;

  const values = [
    nom,
    prenom,
    email.toLowerCase(),
    adresse,
    complement_adresse || null,
    code_postal,
    ville,
    telephone,
    passwordHash,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
}
