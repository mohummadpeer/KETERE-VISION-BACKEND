export interface User {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  complement_adresse?: string;
  code_postal: string;
  ville: string;
  telephone: string;
  password: string; // mot de passe brut reçu -> hashé ensuite
}
