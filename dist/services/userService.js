"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(user) {
    const { nom, prenom, email, adresse, complement_adresse, code_postal, ville, telephone, password, } = user;
    const passwordHash = await bcrypt_1.default.hash(password, 10);
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
    const result = await db_1.db.query(query, values);
    return result.rows[0];
}
