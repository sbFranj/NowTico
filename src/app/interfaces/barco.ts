import { Salida } from "./salida";
import { Socio } from "./socio";

export interface Barco {
    id_barco:         number;
    numero_matricula: string;
    nombre:           string;
    numero_amarre:    number;
    cuota:            number;
    salidas:          Salida[];
    propietario?: Socio
}


