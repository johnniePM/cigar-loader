
type RingType= `${number} cm`|`${number} mm`

export type QRcode64 = { length: 64 } & string;

export interface IBrand{
    id?:number;
    name:string;
    origin:string
}
export interface IHumidor{
    id?:number;
    name:string;
    total_capacity:string
}


export interface ICigar{
    id?:number;
    name:string;
    brand:IBrand;
    length:number;
    smoking_time:number;
    ring:RingType;
}

export interface ILibrary {
    id?:number;
    qrCode:QRcode64;
    cigar:ICigar;
    total_number:number;
    price:number;
    humidor:IHumidor;
}

export interface IHistory {
    id?:number;
    cigar:ICigar;
    date_added:Date;
    date_used:Date;
    rate:string;
    comment:string;
    self_used:boolean
}

