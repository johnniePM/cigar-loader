import React, { useCallback, useContext, useEffect, useState } from "react";

import * as SQLite from 'expo-sqlite';

export const DataContext = React.createContext({});


export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const db = SQLite.openDatabase('Cigar.db');

 


  // change theme based on isDark updates


  useEffect(() => {
    
  
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

export const useData = () => useContext(DataContext) ;
