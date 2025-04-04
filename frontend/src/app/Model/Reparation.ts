import { TypeReparation } from "./TypeReparation";
import { Vehicule } from "./vehicule";

export class Reparation{
    _id!: string;
    dateHeureDebut!: Date;
    dateHeureFin!: Date;
    tempsReparation!: Date;
    statusUneReparation!: boolean;
    typeReparation!: TypeReparation;
    vehicule!:Vehicule;
}