import { DbBrand, DbCigar, DbHumidor, DbLibrary, DbUpdate, IBrand, ICigar, IHistory, IHumidor, ILibrary, IUpdate } from "../constants/data"

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
    date_added DATETIME NOT NULL,
    date_used DATETIME NOT NULL,
    rate TEXT NOT NULL,
    comment TEXT NOT NULL,
    self_used INTEGER NOT NULL,
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


export const AddHistoryTable = (History: IHistory) => {
    return `INSERT INTO History (cigar_id, date_added, date_used, rate, comment, self_used)
VALUES ('${History.cigar.id}', '${History.date_added}' , '${History.date_used}' , '${History.rate}' , '${History.comment}' , '${History.self_used}');`
}


export const EditTable = (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: DbUpdate) => {
    const last_index = Object.keys(update).length - 1
    var the_string: string = ""

    Object.keys(update).map((i, e) => {
        const rest = e < last_index ? " , " : " "
        the_string += String(i) + " = " + "'"+ update[i as keyof DbUpdate]+"'" + rest
    })

    return (`UPDATE ${table} SET ${the_string} WHERE id = ${id}`)

}


export const DeleteFromTable = (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number) => {
    return (`DELETE FROM ${table} WHERE id = ${id};`)
}

export const SelectFromTable = (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History",  the_key: keyof DbUpdate = "id", value?: string|number,) => {
    if (value!=undefined){
        return (`SELECT * FROM ${table} WHERE ${the_key} = ${value};`)
    }else{
        return (`SELECT * FROM ${table};`)
    }
}