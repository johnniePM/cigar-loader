
export type RingType= `${number} cm`|`${number} mm`



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
    cigar_id:number;
    library_id:number;
    date_used:string;
    rate:string;
    comment:string;
    self_used:number;
    total:number,
    cigar:string;
    brand:string;
    humidor:string;
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


    

export interface DbUpdate extends Partial<DbHistory> , Partial<DbLibrary> , Partial<DbCigar> , Partial<DbHumidor> , Partial<DbBrand>{
}

