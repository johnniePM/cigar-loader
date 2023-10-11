import { IBrand, ICigar, IHistory, IHumidor, ILibrary } from "../database"

export const CreateBrandTable= `CREATE TABLE IF NOT EXISTS Brand (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    origin TEXT NOT NULL
);`


export const CreateHumidorTable = `CREATE TABLE IF NOT EXISTS Humidor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    total_capacity TEXT NOT NULL
);`


export const CreateCigarTable =`CREATE TABLE IF NOT EXISTS Cigar (
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


export const AddBrandTable=(brand:IBrand)=>{return `INSERT INTO Brand (name, origin)
VALUES ('${brand.name}', '${brand.origin}');`}


export const AddHumidorTable=(humidor:IHumidor) => {return `(name, total_capacity)
VALUES ('${humidor.name}', '${humidor.total_capacity}');`}

export const AddCigarTable=(cigar:ICigar) =>{return `(name, brand_id, length, smoking_time, ring)
VALUES ('${cigar.name}', '${cigar.brand.id}' , '${cigar.length}' , '${cigar.smoking_time}' , '${cigar.ring}');`}
    


export const AddLibraryTable=(library:ILibrary) => {return `Library (qrCode, cigar_id, total_number, price, humidor_id)
VALUES ('${library.qrCode}', '${library.cigar.id}' , '${library.total_number}' , '${library.price}' , '${library.humidor.id}');`}
    


export const AddHistoryTable=(History:IHistory) => {return `INSERT INTO History (cigar_id, date_added, date_used, rate, comment, self_used)
VALUES ('${History.cigar.id}', '${History.date_added}' , '${History.date_used}' , '${History.rate}' , '${History.comment}' , '${History.self_used}');`}

export const EditTable=(History:IHistory) => {return `INSERT INTO History (cigar_id, date_added, date_used, rate, comment, self_used)
VALUES ('${History.cigar.id}', '${History.date_added}' , '${History.date_used}' , '${History.rate}' , '${History.comment}' , '${History.self_used}');`}


    