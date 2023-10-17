import { IBrand, ICigar, IHistory, IHumidor, ILibrary, IUpdate } from "./data";

export interface IUseDatabase {
    add_to_brand:(brand?: IBrand) => void;
    add_to_cigar:(cigar?: ICigar) => void;
    add_to_history:(history?: IHistory) => void;
    add_to_humidor:(humidor?: IHumidor) => void;
    add_to_library:(library?: ILibrary) => void;
    edit_table:(table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: IUpdate) => void;
    delete_from_table:(table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number) => void;
    select_from_table:(table: "Brand" | "Humidor" | "Cigar" | "Library" | "History",setState?:React.Dispatch<React.SetStateAction<any>>, value?: string, the_key?: keyof IUpdate ) => void;
}