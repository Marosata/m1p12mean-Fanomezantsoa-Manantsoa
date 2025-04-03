import { TypeReparation } from "./type-reparation";
import { Vehicule } from "./vehicule";

export interface Reparation {
  _id?: string;
  dateHeureDebut: string;
  dateHeureFin: string;
  tempsReparation: string;
  statusUneReparation: string;
  typeReparation: TypeReparation;
  vehicule: Vehicule;
}
