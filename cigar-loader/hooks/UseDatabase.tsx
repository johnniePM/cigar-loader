import React, { useCallback, useContext, useEffect, useState } from "react";

import * as SQLite from 'expo-sqlite';
import { IBrand, ICigar, IHistory, IHumidor, ILibrary } from "../constants";
import { MDATABASE } from "../Mocks";
import { DbBrand, DbCigar, DbHistory, DbHumidor, DbLibrary, DbUpdate, IUpdate } from "../constants/data";
import { IUseDatabase } from "../constants/Components";

export const DataContext = React.createContext({});

function openDatabase() {


  const db = SQLite.openDatabase('Cigar.db');
  return db;
}

function isResultSet(object: any): object is SQLite.SQLResultSet {
  return 'rows' in object;
}

function checkIsLibrary(object: Array<any>): object is DbLibrary[] {
  var isit:boolean=true
  object.map((v)=>{
    if("cigar_id" in v ||
      "date_added" in v ||
      "humidor_id" in v ||
      "id" in v ||
      "price" in v ||
      "qrCode" in v ||
      "total_number" in v 
      ){
        
      }
    else{
      isit= false
    }
  })
  return isit
}

const db = openDatabase();

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [HumidorList, handleHumidorList]=useState<Array<DbHumidor>>([])
  const [LibraryList, handleLibraryList]=useState<Array<DbLibrary>>([])
  const [CigarList, handleCigarList]=useState<Array<DbCigar>>([])
  const [selectedHumidor, handleSelectedHumidor]=useState<DbHumidor>()
  const [selectedLibrary, handleSelectedLibrary]=useState<DbLibrary>()

  


  const create_tables =useCallback(()=> {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.CreateBrandTable);
      exc.executeSqlAsync(MDATABASE.CreateCigarTable);
      exc.executeSqlAsync(MDATABASE.CreateHistoryTable);
      exc.executeSqlAsync(MDATABASE.CreateHumidorTable);
      exc.executeSqlAsync(MDATABASE.CreateLibraryTable);
    }).then(() => {
    }, (reason) => {
    })
  }, [])

  const add_to_brand = useCallback(async(brand: IBrand):Promise<number> => {
    // console.log("haahahhaaaaaaaaaaa")
    var id:number=NaN
     await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddBrandTable(brand)).then((g) => {
        if (typeof g.insertId!="undefined"){
          console.log("type is not undefined")
          id=g.insertId
        }
      })
    })
    return (id)
    
  }, [])

  const add_to_cigar = useCallback(async(cigar: DbCigar):Promise<number|undefined> => {
    var id:number|undefined=undefined

    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddCigarTable(cigar)).then((g) => {
        if (typeof g.insertId!="undefined"){
          id=g.insertId

        }
      }).catch(e=>{console.log(e)})
    })
    return id
  }, [])
  const add_to_humidor = useCallback( async(humidor: IHumidor):Promise<number|undefined> => {
    var id:number|undefined=undefined

    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddHumidorTable(humidor)).then((g) => {
        if (typeof g.insertId!="undefined"){
          id=g.insertId
        }
      })
    })
    return id
  }, [])





  const add_to_library = useCallback(async(library: DbLibrary):Promise<number|undefined> => {
    var id:number|undefined=undefined
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddLibraryTable(library)).then((g) => {
        if (typeof g.insertId!="undefined"){
          id=g.insertId
        }
      })
    })
    return id
  }, [])


  const add_to_history = useCallback(async(history: DbHistory):Promise<number|undefined> => {
    var id:number|undefined=undefined

    db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddHistoryTable(history)).then((g) => {
        if (typeof g.insertId!="undefined"){
          id=g.insertId
        }
      })
    })
    return id
  }, [])


  const edit_table = useCallback((table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: DbUpdate) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.EditTable(table, id, update)).then((val) => {
      }).catch((e)=>{})
    }).then(() => {
    }, (reason) => {
    })
  }, [])


  const delete_from_table = useCallback( (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.DeleteFromTable(table, id)).then(() => {
      })
    }).then(() => {
    }, (reason) => {
    })
  }, [])

  const select_from_table = useCallback((table: "Brand" | "Humidor" | "Cigar" | "Library" | "History",setState?:React.Dispatch<React.SetStateAction<any>>, value?: string, the_key: keyof DbUpdate = "id" ) => {
     db.transactionAsync(async (exc) => {
       exc.executeSqlAsync(value != undefined ? MDATABASE.SelectFromTable(table, the_key, value) : MDATABASE.SelectFromTable(table)).then((val) => {
        //  console.log(val)
          if (isResultSet(val)) {
            // console.log(val)
            if(setState!=undefined){
              // console.log(val)
              
              setState(val["rows"])

            }
          } else {

            
          }
        
      })
    })
  }, [])
  // const test_select = useCallback(async(table: "Brand" | "Humidor" | "Cigar" | "Library" | "History",setState?:React.Dispatch<React.SetStateAction<any>>, value?: string, the_key: keyof IUpdate = "id" ) => {
  //   var libraryItem:ILibrary= {
  //     cigar: {
  //         brand: {
  //             name: "",
  //             origin: ""
  //         },
  //         length: 0,
  //         name: "",
  //         ring: "0 cm",
  //         smoking_time: 0,

  //     },
  //     humidor: {
  //         name: "",
  //         total_capacity: "",
  //     },
  //     price: 0,
  //     qrCode: "",
  //     total_number: 0,
  //     date_added: new Date()
  // }
  //    await db.transactionAsync(async (exc) => {
  //      await exc.executeSqlAsync(value != undefined ? MDATABASE.SelectFromTable(table, the_key, value) : MDATABASE.SelectFromTable(table)).then(async (val) => {
  //        //  console.log(val)
  //        if (isResultSet(val)) {
  //          // console.log(val)
  //          if(setState!=undefined){
  //            // console.log(val)
  //            if (checkIsLibrary(val.rows)){
  //              await exc.executeSqlAsync(MDATABASE.SelectFromTable("Cigar")).then((valko) => {
  //               o
  //              })
               
  //             }
  //             setState(val["rows"])

  //           }
  //         } else {

            
  //         }
        
  //     })
  //   })
  // }, [])




  useEffect(() => {
    create_tables()
    return () => {
    }
  }, [])



  const contextValue = {
    add_to_brand,
    add_to_cigar,
    add_to_history,
    add_to_humidor,
    add_to_library,
    edit_table,
    delete_from_table,
    select_from_table,
    handleHumidorList,
    handleLibraryList,
    handleSelectedHumidor,
    handleSelectedLibrary,
    handleCigarList,
    CigarList,
    selectedHumidor,
    selectedLibrary,
    HumidorList,
    LibraryList

    // articles,
    // setArticles,
    // article,
    // handleArticle,
  };
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const UseDatabase = () => useContext(DataContext) as IUseDatabase;


// fexport const useData = () => useContext(DataContext) as IUseData;
