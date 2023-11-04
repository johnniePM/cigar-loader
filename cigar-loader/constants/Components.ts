import { DbBrand, DbCigar, DbHistory, DbHumidor, DbLibrary, DbUpdate, IBrand, ICigar, IHistory, IHumidor, ILibrary, IUpdate } from "./data";
import { ImageSourcePropType } from 'react-native'
import { ViewStyle, StyleProp, TextStyle, } from "react-native";

import { ReactNode } from "react"
export interface IUseDatabase {
    add_to_brand: (brand?: IBrand) => Promise<number>;
    add_to_cigar: (cigar?: DbCigar) => Promise<number|undefined>;
    add_to_history: (history?: IHistory) => Promise<number|undefined>;
    add_to_humidor: (humidor?: IHumidor) => Promise<number|undefined>;
    add_to_library: (library?: DbLibrary) => Promise<number|undefined>;
    edit_table: (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: DbUpdate) => void;
    delete_from_table: (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number) => void;
    select_from_table: (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", setState?: React.Dispatch<React.SetStateAction<any>>, value?: string, the_key?: keyof DbUpdate) => Promise<any>;
    async_select_from_table: (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History",  value?: string|number|Array<string|number>, the_key?: keyof DbUpdate) => Promise< Array<DbBrand> | Array<DbHumidor> | Array<DbCigar> | Array<DbLibrary> | Array<DbHistory>>;
    HumidorList:Array<IHumidor>;
    LibraryList:Array<ILibrary>;
    selectedHumidor:IHumidor;
    selectedLibrary:IHumidor;
    CigarList:Array<ICigar>;
    handleCigarList():any
    handleLibraryList():any;
    handleHumidorList():any;
    handleSelectedHumidor():any;
    handleSelectedLibrary():any;
}

export interface IUseData{
    HumidorList:Array<IHumidor>;
    LibraryList:Array<IHumidor>;
    selectedHumidor:IHumidor;
    selectedLibrary:IHumidor;
    CigarList:Array<ICigar>;
    handleCigarList():any
    handleLibraryList():any;
    handleHumidorList():any;
    handleSelectedHumidor():any;
    handleSelectedLibrary():any;
    
}

export interface ICounterComponent {
    left?: string;
    decrease?(): any;
    increase?(): any;
    number?: string | number
}

export interface IDetailComponent extends ICounterComponent {
    backgroundImage: ImageSourcePropType;
    foregroundImage: ImageSourcePropType;
    short: string;
    topText: string;
    children: ReactNode;
    onPress(): any;
    buttonText: string;

}

export interface IAutoComplete {

    value: string,
    setValue(param: string): any,
    label: string,
    data: Array<any>,
    containerStyle?: StyleProp<ViewStyle>,
    icon: string,
    style?: StyleProp<TextStyle>,
    menuStyle?: StyleProp<ViewStyle>,
    right?: ReactNode,
    left?: ReactNode,
    Callback?(param?:any):any;
    accessor:boolean|string

}