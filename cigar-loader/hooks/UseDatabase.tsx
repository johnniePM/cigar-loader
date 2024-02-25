import React, { useCallback, useContext, useEffect, useState } from "react";

import * as SQLite from 'expo-sqlite';
import { MDATABASE } from "../Mocks";
import { DbBrand, DbCigar, DbHistory, DbHumidor, DbLibrary, DbUpdate } from "../constants";
import { IUseDatabase } from "../constants/Components";
import { Text } from "react-native-paper";

export const DataContext = React.createContext({});

function openDatabas() {


  const db_1 = SQLite.openDatabase('Cigar.db');
  return db_1;
}

function isResultSet(object: any): object is SQLite.SQLResultSet {
  return 'rows' in object;
}




const db = openDatabas();



export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [HumidorList, handleHumidorList] = useState<Array<DbHumidor>>([])
  const [LibraryList, handleLibraryList] = useState<Array<DbLibrary>>([])
  const [CigarList, handleCigarList] = useState<Array<DbCigar>>([])
  const [selectedHumidor, handleSelectedHumidor] = useState<DbHumidor>()
  const [selectedLibrary, handleSelectedLibrary] = useState<DbLibrary>()
  const [created, setCreated]=useState<boolean>(false)



  const create_tables = useCallback(async() => {
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.CreateBrandTable);
      await exc.executeSqlAsync(MDATABASE.CreateCigarTable);
      await exc.executeSqlAsync(MDATABASE.CreateHistoryTable);
      await exc.executeSqlAsync(MDATABASE.CreateHumidorTable);
      await exc.executeSqlAsync(MDATABASE.CreateLibraryTable);

    }).then(async() => {
      setCreated(true)

    }, (reason) => {
    })
  }, [])


  const add_to_brand = useCallback(async (brand: DbBrand): Promise<number> => {
    var id: number = NaN
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddBrandTable(brand)).then((g) => {
        if (typeof g.insertId != "undefined") {
          id = g.insertId
        }
      })
    })
    return (id)

  }, [])

  const add_to_cigar = useCallback(async (cigar: DbCigar): Promise<number | undefined> => {
    var id: number | undefined = undefined

    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddCigarTable(cigar)).then((g) => {
        if (typeof g.insertId != "undefined") {
          id = g.insertId

        }
      }).catch(e => {  })
    })
    return id
  }, [])
  const add_to_humidor = useCallback(async (humidor: DbHumidor): Promise<number | undefined> => {
    var id: number | undefined = undefined

    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddHumidorTable(humidor)).then((g) => {
        if (typeof g.insertId != "undefined") {
          id = g.insertId
        }
      }).catch((e)=>{})
    })
    return id
  }, [])





  const add_to_library = useCallback(async (library: DbLibrary): Promise<number | undefined> => {
    var id: number | undefined = undefined
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddLibraryTable(library)).then((g) => {
        if (typeof g.insertId != "undefined") {
          id = g.insertId
        }
      })
    })
    return id
  }, [])


  const add_to_history = useCallback(async (history: DbHistory): Promise<number | undefined> => {
    var id: number | undefined = undefined

    db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.AddHistoryTable(history)).then((g) => {
        if (typeof g.insertId != "undefined") {
          id = g.insertId
        }
      })
    })
    return id
  }, [])

  const  see_table_columns=useCallback(async (name:string):Promise<any>=>{
    let res:any
    db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.SeeTable(name)).then((g) => {
        console.log("start")
        g.rows.map((v)=>{
          console.log(v.name+" ------   "+v.type)

        })
        console.log("end")
        res=g
      }).catch((e)=>{console.log(e)})
    })
    return res
  },[])

  const edit_table = useCallback((table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: DbUpdate) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.EditTable(table, id, update)).then((val) => {
      }).catch((e) => { })
    }).then(() => {
    }, (reason) => {
    })
  }, [])


  const delete_from_table = useCallback(async (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number) => {
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(MDATABASE.DeleteFromTable(table, id)).then(() => {
      })
    }).then(() => {
    }, (reason) => {
    })
  }, [])

  const select_from_table = useCallback(async (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", setState?: React.Dispatch<React.SetStateAction<any>>, value?: string | number | Array<string | number>, the_key: keyof DbUpdate = "id") => {
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(value != undefined ? MDATABASE.SelectFromTable(table, the_key, value) : MDATABASE.SelectFromTable(table)).then((val) => {
        if (isResultSet(val)) {
          if (setState != undefined) {
            
            setState(val["rows"])

          }
        } else {


        }

      })
    })
  }, [])
  const async_select_from_table = useCallback(async (table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", value?: string | number | Array<string | number>, the_key: keyof DbUpdate = "id"):Promise<Array<any>> => {
    var result: Array<any>=[]
    await db.transactionAsync(async (exc) => {
      await exc.executeSqlAsync(value != undefined ? MDATABASE.SelectFromTable(table, the_key, value) : MDATABASE.SelectFromTable(table)).then((val) => {

        if (isResultSet(val)) {
          if ((val["rows"])  ) {
            
            result = val["rows"]
          }
        } else {

          result=[]
        }

      })
    }
    )
    return result
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
  //        if (isResultSet(val)) {
  //          if(setState!=undefined){
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
    async_select_from_table,
    handleHumidorList,
    handleLibraryList,
    handleSelectedHumidor,
    handleSelectedLibrary,
    handleCigarList,
    CigarList,
    selectedHumidor,
    selectedLibrary,
    HumidorList,
    LibraryList,
    see_table_columns,

    // articles,
    // setArticles,
    // article,
    // handleArticle,
  };
  if (created){

    return (
      
      <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
      );
    }
    else{
      return(
        <Text>
          Hello
        </Text>
      )
    }
};

export const UseDatabase = () => useContext(DataContext) as IUseDatabase;


// fexport const useData = () => useContext(DataContext) as IUseData;
