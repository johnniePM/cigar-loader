import { DbBrand, DbCigar, DbHistory, DbHumidor, DbLibrary, DbUpdate } from "../constants/data"

export const CreateBrandTable = `CREATE TABLE IF NOT EXISTS Brand (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    origin TEXT NOT NULL
);`


export const CreateHumidorTable = `CREATE TABLE IF NOT EXISTS Humidor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    total_capacity TEXT NOT NULL
);`


export const CreateCigarTable = `CREATE TABLE IF NOT EXISTS Cigar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand_id INTEGER NOT NULL,
    length REAL NOT NULL,
    smoking_time INTEGER NOT NULL,
    ring TEXT NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES Brand (id)
);`

export const SeeTable=(name:string)=>{
    return(
    `PRAGMA table_info(${name});`)
}

export const CreateLibraryTable = `CREATE TABLE IF NOT EXISTS Library (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    qrCode TEXT UNIQUE CHECK(length(qrCode) = 64),
    cigar_id INTEGER NOT NULL,
    total_number INTEGER NOT NULL,
    price REAL NOT NULL,
    date_added DATETIME NOT NULL,
    humidor_id INTEGER NOT NULL,
    FOREIGN KEY (cigar_id) REFERENCES Cigar (id),
    FOREIGN KEY (humidor_id) REFERENCES Humidor (id)
    );`


export const CreateHistoryTable = `CREATE TABLE IF NOT EXISTS History (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cigar_id INTEGER NOT NULL,
        library_id INTEGER NOT NULL,
        cigar TEXT NOT NULL,
        humidor TEXT NOT NULL,
        brand TEXT NOT NULL,    
        date_used DATETIME NOT NULL,
        rate INTEGER NOT NULL,
        total INTEGER NOT NULL,
        comment TEXT NOT NULL,
        self_used INTEGER NOT NULL,
        FOREIGN KEY (library_id) REFERENCES Library (id),
        FOREIGN KEY (cigar_id) REFERENCES Cigar (id)
);`


export const AddBrandTable = (brand: DbBrand) => {
    return `INSERT INTO Brand (name, origin)
VALUES ('${brand.name}', '${brand.origin}');`
}


export const AddHumidorTable = (humidor: DbHumidor) => {
    return `INSERT INTO Humidor(name, total_capacity)
VALUES ('${humidor.name}', '${humidor.total_capacity}');`
}


export const AddCigarTable = (cigar: DbCigar) => {
    return `INSERT INTO Cigar(name, brand_id, length, smoking_time, ring)
VALUES ('${cigar.name}', '${cigar.brand_id}' , '${cigar.length}' , '${cigar.smoking_time}' , '${cigar.ring}');`
}


export const AddLibraryTable = (library: DbLibrary) => {
    return `INSERT INTO Library (qrCode, cigar_id, total_number, price, humidor_id, date_added)
VALUES ('${library.qrCode}', '${library.cigar_id}' , '${library.total_number}' , '${library.price}' , '${library.humidor_id}' , '${library.date_added}');`
}


export const AddHistoryTable = (History: DbHistory) => {
    return `INSERT INTO History (cigar_id,  date_used, rate, comment, self_used, library_id, total, cigar , humidor, brand )
VALUES ('${History.cigar_id}',  '${History.date_used}' , '${History.rate}' , '${History.comment}' , '${History.self_used}', '${History.library_id}','${History.total}' , '${History.cigar}',  '${History.humidor}' ,  '${History.brand}');`
}


export const EditTable = (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: DbUpdate) => {
    const last_index = Object.keys(update).length - 1
    var the_string: string = ""

    Object.keys(update).map((i, e) => {
        const rest = e < last_index ? " , " : " "
        the_string += String(i) + " = " + "'" + update[i as keyof DbUpdate] + "'" + rest
    })

    return (`UPDATE ${table} SET ${the_string} WHERE id = ${id}`)

}


export const DeleteFromTable = (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number) => {
    return (`DELETE FROM ${table} WHERE id = ${id};`)
}

export const SelectFromTable = (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", the_key: keyof DbUpdate = "id", value?: string | number | Array<string | number>,) => {
    if (value != undefined) {
        if (Array.isArray(value)) {

            var the_string = ""
            let array_index = value.length - 1
            value.map((v, e) => {


                e < array_index
                    ? the_string += String(the_key) + " = " + String(v) + " OR "
                    : the_string += String(the_key) + " = " + String(v)
            })

            return (`SELECT * FROM ${table} WHERE ${the_string};`)
        }
        return (`SELECT * FROM ${table} WHERE ${the_key} = ${value};`)
    } else {
        return (`SELECT * FROM ${table};`)
    }
}