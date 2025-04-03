import { Vehicule } from "./vehicule";

export interface Paiement {
  _id?: string;
  datePaiement: string;
  vehicule: Vehicule;
}
