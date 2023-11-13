
export type RingType= `${number} cm`|`${number} mm`


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
    qrCode:string;
    cigar:ICigar;
    total_number:number;
    price:number;
    date_added:Date;
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

export interface DbBrand{
    id:number;
    name:string;
    origin:string
}
export interface DbHumidor{
    id:number;
    name:string;
    total_capacity:string
}
export interface DbLibrary {
    cigar_id: number;
    date_added: Date;
    humidor_id: number;
    id: number;
    price: number;
    qrCode: string;
    total_number: number
}

export interface DbCigar{
    id: number;
    brand_id:number;
    length: number;
    name: string;
    ring: RingType;
    smoking_time: number
}



export interface DbHistory {
    id:number;
    cigar:ICigar;
    date_added:Date;
    date_used:Date;
    rate:string;
    comment:string;
    self_used:boolean
}


export interface IStorageSettings{
    QuickAdd:"Smoked Cigar"|"Add Cigar"|"Add Humidor";
    ShowQuickStats:boolean;
    SmokedM:boolean;
    SmokedY:boolean;
    SmokedW:boolean;
    LastSmoked:boolean;
    LastAdded:boolean;
    MostCigarBrand:boolean;
    MostCigarName:boolean;
    Mode:"System"|"Light"|"Dark"
    }
export interface ISettings extends IStorageSettings{
    isReady:boolean
    handleQuickAdd:(param:"Smoked Cigar"|"Add Cigar"|"Add Humidor")=>void;
    handleShowQuickStats:(param:boolean)=>void;
    handleSmokedM:(param:boolean)=>void;
    handleSmokedY:(param:boolean)=>void;
    handleSmokedW:(param:boolean)=>void;
    handleLastSmoked:(param:boolean)=>void;
    handleLastAdded:(param:boolean)=>void;
    handleMostCigarBrand:(param:boolean)=>void;
    handleMostCigarName:(param:boolean)=>void;
    handleMode:(param:"System"|"Light"|"Dark")=>void;
}


export interface IUpdate extends Partial<IHistory> , Partial<ILibrary> , Partial<ICigar> , Partial<IHumidor> , Partial<IBrand>{
    
}
export interface DbUpdate extends Partial<DbHistory> , Partial<DbLibrary> , Partial<DbCigar> , Partial<DbHumidor> , Partial<DbBrand>{
}

