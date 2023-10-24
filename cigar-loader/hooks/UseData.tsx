import React, { useCallback, useContext, useEffect, useState } from "react";

import * as SQLite from 'expo-sqlite';
import { IBrand, ICigar, IHistory, IHumidor, ILibrary } from "../constants";
import { MDATABASE } from "../Mocks";
import { IUpdate } from "../constants/data";
import { IUseData, IUseDatabase } from "../constants/Components";

export const DataContext = React.createContext({});


export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [HumidorList, handleHumidorList]=useState<Array<IHumidor>>([])
    const [LibraryList, handleLibraryList]=useState<Array<ILibrary>>([])
    const [CigarList, handleCigarList]=useState<Array<ICigar>>([])
    const [selectedHumidor, handleSelectedHumidor]=useState<IHumidor>()
    const [selectedLibrary, handleSelectedLibrary]=useState<ILibrary>()

    
 
 




  useEffect(() => {
    return () => {
    }
  }, [])



  const contextValue = {
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

export const UseData = () => useContext(DataContext) as IUseData;


// fexport const useData = () => useContext(DataContext) as IUseData;
