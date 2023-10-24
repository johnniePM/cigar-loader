import React, { useCallback, useContext, useEffect, useState } from "react";

import * as SQLite from 'expo-sqlite';
import { IBrand, ICigar, IHistory, IHumidor, ILibrary } from "../constants";
import { MDATABASE } from "../Mocks";
import { IUpdate } from "../constants/data";
import { IUseDatabase } from "../constants/Components";

export const DataContext = React.createContext({});

function openDatabase() {


  const db = SQLite.openDatabase('Cigar.db');
  return db;
}

function isResultSet(object: any): object is SQLite.SQLResultSet {
  return 'rows' in object;
}

const db = openDatabase();

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {

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

  const add_to_brand = useCallback((brand: IBrand) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.AddBrandTable(brand)).then((e) => {
        console.log(e)
      })
    }).then(() => {
      // var arr=[]
      // if (Brand==undefined){
      //   arr.push(brand)
      // }
      // else{
      //   arr=Brand
      //   arr.push(brand)
      // }
      // setBrand(arr)
    }, (reason) => {
    })
  }, [])


  const add_to_humidor = useCallback((humidor: IHumidor) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.AddHumidorTable(humidor)).then(() => {
      })
    }).then(() => {
    }, (reason) => {
    })
  }, [])


  const add_to_cigar = useCallback((cigar: ICigar) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.AddCigarTable(cigar)).then(() => {
      })
    }).then(() => {
    }, (reason) => {
    })
  }, [])


  const add_to_library = useCallback((library: ILibrary) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.AddLibraryTable(library)).then(() => {
      })
    }).then(() => {
    }, (reason) => {
    })
  }, [])


  const add_to_history = useCallback((history: IHistory) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.AddHistoryTable(history)).then(() => {
      })
    }).then(() => {
    }, (reason) => {
    })
  }, [])


  const edit_table = useCallback((table: "Brand" | "Humidor" | "Cigar" | "Library" | "History", id: number, update: IUpdate) => {
    db.transactionAsync(async (exc) => {
      exc.executeSqlAsync(MDATABASE.EditTable(table, id, update)).then((val) => {
      }).catch((e)=>{console.log("catch edit table"); console.log(e)})
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

  const select_from_table = useCallback((table: "Brand" | "Humidor" | "Cigar" | "Library" | "History",setState?:React.Dispatch<React.SetStateAction<any>>, value?: string, the_key: keyof IUpdate = "id" ) => {
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
    select_from_table

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
