import { Utilisateur } from "./utilisateur";

export interface Vehicule {
  _id?: string;
  nom: string;
  type: string;
  image?: string;
  immatriculation: string;
  dateDebut: string;
  dateHeureFin?: string;
  totalTempsReparation?: string;
  totalPrixReparation?: number;
  status: string;
  utilisateur: Utilisateur;
}
