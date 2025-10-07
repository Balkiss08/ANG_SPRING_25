import { Marque } from "./marque.model";
import { Image } from "./image.model";

export class Pc {
    idPc!: number
    nomPc!: string;
    processeur!: string;
    ram!: number;
    disqueDur!: number;
    prixPc!: number;
    marque!: Marque;
    image!: Image;
    imageStr!: string;
    images!: Image[];
    imagePath?: string;
}
