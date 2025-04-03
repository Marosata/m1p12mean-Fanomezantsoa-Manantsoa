import { Role } from "./role";

export interface Utilisateur {
    _id?: string;
    nom: string;
    email: string;
    mot_de_passe?: string;
    roles?: Role[];  
  }
  