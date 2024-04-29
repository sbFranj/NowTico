import { Barco } from "./barco";

export interface Salida {
    id:      number;
    fecha:   Date;
    destino: string;
    dni:     string;
    barco:   Barco;
}