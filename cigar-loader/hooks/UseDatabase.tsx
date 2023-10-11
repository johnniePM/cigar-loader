import React, { useCallback, useContext, useEffect, useState } from "react";

import * as SQLite from 'expo-sqlite';
import { IBrand, ICigar, IHistory, IHumidor, ILibrary } from "../constants/forData";
import { MDATABASE } from "../Mocks";

export const DataContext = React.createContext({});

function openDatabase() {

  
    const db = SQLite.openDatabase('Cigar.db');
    return db;
  }


const db = openDatabase();

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [Brand, setBrand]=useState<Array<IBrand>>()
    const [Humidor, setHumidor]=useState<Array<IHumidor>>()
    const [Cigar, setCigar]=useState<Array<ICigar>>()
    const [Library, setLibrary]=useState<Array<ILibrary>>()
    const [History, setHistory]=useState<Array<IHistory>>() 

    async function hello () {
        
    }
 

  // change theme based on isDark updates

  function instanceOfA(object: any): object is SQLite.ResultSet {
    return 'member' in object;
}
  useEffect(() => {
    db.transactionAsync(async (exc)=>{
      exc.executeSqlAsync(MDATABASE.CreateBrandTable);
      exc.executeSqlAsync(MDATABASE.CreateCigarTable);
      exc.executeSqlAsync(MDATABASE.CreateHistoryTable);
      exc.executeSqlAsync(MDATABASE.CreateHumidorTable);
      exc.executeSqlAsync(MDATABASE.CreateLibraryTable);
  }).then(()=>{
      console.log("Done")
  }, (reason)=>{
      console.log(reason)
  } )
  db.transactionAsync(async (exc)=>{
    exc.executeSqlAsync("").then(()=>{
    exc.executeSqlAsync(MDATABASE.SelectFromTable("Brand")).then((value=>{
      // console.log(value)
      if (instanceOfA(value) ){
        console.log(true)
        console.log(value.rows)
      }else{
        console.log(false)
        console.log(value)

      }
    }))
    })
}).then(()=>{

}, (reason)=>{
    console.log(reason)
} )

      
    return () => {
  
    }
  }, [])
  

  const contextValue = {


    // articles,
    // setArticles,
    // article,
    // handleArticle,
  };
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const UseDatabase = () => useContext(DataContext) ;


// fexport const useData = () => useContext(DataContext) as IUseData;
