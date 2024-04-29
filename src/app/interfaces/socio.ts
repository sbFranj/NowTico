import { Barco } from "./barco";

export interface Socio {
    id_socio: number;
    nombre:   string;
    apellido: string;
    dni:      string;
    barcos:   Barco[];
}