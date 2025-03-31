import { Utilisateur } from "./Utilisateur";

export class Vehicule {
    _id!: string;
    nom!: string;
    type!: string;
    image!: string;
    immatriculation!: string;
    dateDebut!: Date;
    DateHeureDebut!: Date;
    DateHeureFin!: Date;
    totalTempsReparation!: Date;
    totalPrixReparation!: string;
    status!: string;
    utilisateurId!: any;
    utilisateur!: Utilisateur;
}
