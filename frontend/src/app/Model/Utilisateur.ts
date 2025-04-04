import { Role } from "./Role";
export class Utilisateur{
    id!: string;
    nom!: string;
    email!: string;
    mot_de_passe!: string;
    roles!: Role;
}