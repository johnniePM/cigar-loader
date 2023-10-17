import React, { useCallback, useContext, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";
import { ISettings } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorageSettings } from "../constants/data";
export const DataContext = React.createContext({});

const SETTINGS_KEY = "Settings"
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [QuickAdd, setQuickAdd] = useState<"Smoked Cigar" | "Add Cigar" | "Add Humidor">();
    const [ShowQuickStats, setShowQuickStats] = useState<boolean>();
    const [SmokedM, setSmokedM] = useState<boolean>();
    const [SmokedY, setSmokedY] = useState<boolean>();
    const [SmokedW, setSmokedW] = useState<boolean>();
    const [LastSmoked, setLastSmoked] = useState<boolean>();
    const [LastAdded, setLastAdded] = useState<boolean>();
    const [MostCigarBrand, setMostCigarBrand] = useState<boolean>();
    const [MostCigarName, setMostCigarName] = useState<boolean>();
    const [Mode, setMode] = useState<"System" | "Light" | "Dark">();
    const [isReady, setIsReady] = useState<boolean>(false)


    const save_new_state = useCallback((the_key: keyof IStorageSettings, value: IStorageSettings[keyof IStorageSettings]) => {
        if (QuickAdd != undefined &&
            ShowQuickStats != undefined &&
            SmokedM != undefined &&
            SmokedY != undefined &&
            SmokedW != undefined &&
            LastSmoked != undefined &&
            LastAdded != undefined &&
            MostCigarBrand != undefined &&
            MostCigarName != undefined &&
            Mode != undefined) {
            const save_state: IStorageSettings = {
                QuickAdd: QuickAdd,
                ShowQuickStats: ShowQuickStats,
                SmokedM: SmokedM,
                SmokedY: SmokedY,
                SmokedW: SmokedW,
                LastSmoked: LastSmoked,
                LastAdded: LastAdded,
                MostCigarBrand: MostCigarBrand,
                MostCigarName: MostCigarName,
                Mode: Mode,
            }
            switch (the_key) {
                case "QuickAdd":
                    value == "Smoked Cigar" || value == "Add Cigar" || value == "Add Humidor" ? save_state.QuickAdd = value : null
                case "ShowQuickStats":
                    typeof value == "boolean" ? save_state.ShowQuickStats = value : null
                case "SmokedM":
                    typeof value == "boolean" ? save_state.SmokedM = value : null
                case "SmokedY":
                    typeof value == "boolean" ? save_state.SmokedY = value : null
                case "SmokedW":
                    typeof value == "boolean" ? save_state.SmokedW = value : null
                case "LastSmoked":
                    typeof value == "boolean" ? save_state.LastSmoked = value : null
                case "LastAdded":
                    typeof value == "boolean" ? save_state.LastAdded = value : null
                case "MostCigarBrand":
                    typeof value == "boolean" ? save_state.MostCigarBrand = value : null
                case "MostCigarName":
                    typeof value == "boolean" ? save_state.MostCigarName = value : null
                case "Mode":
                    value == "Light" || value == "Dark" || value == "System" ? save_state.Mode = value : null
            }
            AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(save_state))
        }
    }, [])


    const handleQuickAdd = useCallback((param: "Smoked Cigar" | "Add Cigar" | "Add Humidor") => {
        setQuickAdd(param)
        save_new_state("QuickAdd",param)
    }, [])
    const handleShowQuickStats = useCallback((param: boolean) => {
        save_new_state("ShowQuickStats",param)
        setShowQuickStats(param)
    }, [])
    const handleSmokedM = useCallback((param: boolean) => {
        setSmokedM(param)
        save_new_state("SmokedM",param)
    }, [])
    const handleSmokedY = useCallback((param: boolean) => {
        setSmokedY(param)
        save_new_state("SmokedY",param)
    }, [])
    const handleSmokedW = useCallback((param: boolean) => {
        setSmokedW(param)
        save_new_state("SmokedW",param)
    }, [])
    const handleLastSmoked = useCallback((param: boolean) => {
        setLastSmoked(param)
        save_new_state("LastSmoked",param)
    }, [])
    const handleMostCigarBrand = useCallback((param: boolean) => {
        setMostCigarBrand(param)
        save_new_state("MostCigarBrand",param)
    }, [])
    const handleMostCigarName = useCallback((param: boolean) => {
        setMostCigarName(param)
        save_new_state("MostCigarName",param)
    }, [])
    const handleLastAdded = useCallback((param: boolean) => {
        setLastAdded(param)
        save_new_state("LastAdded",param)
    }, [])
    const handleMode = useCallback((param: "System" | "Light" | "Dark") => {
        setMode(param)
        save_new_state("Mode",param)
    }, [])

    useEffect(() => {

        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(SETTINGS_KEY);
                if (typeof savedStateString == "string") {
                    const state: IStorageSettings = JSON.parse(savedStateString);
                    setQuickAdd(state.QuickAdd)
                    setShowQuickStats(state.ShowQuickStats)
                    setSmokedM(state.SmokedM)
                    setSmokedY(state.SmokedY)
                    setSmokedW(state.SmokedW)
                    setLastSmoked(state.LastSmoked)
                    setLastAdded(state.LastAdded)
                    setMostCigarBrand(state.MostCigarBrand)
                    setMostCigarName(state.MostCigarName)
                    setMode(state.Mode)
                }
                else {
                    setQuickAdd("Add Cigar")
                    setShowQuickStats(true)
                    setSmokedM(false)
                    setSmokedY(false)
                    setSmokedW(false)
                    setLastSmoked(true)
                    setLastAdded(true)
                    setMostCigarBrand(false)
                    setMostCigarName(false)
                    setMode("System")
                    const save_state: IStorageSettings = {
                        QuickAdd: "Add Cigar",
                        ShowQuickStats: true,
                        SmokedM: false,
                        SmokedY: false,
                        SmokedW: false,
                        LastSmoked: true,
                        LastAdded: true,
                        MostCigarBrand: false,
                        MostCigarName: false,
                        Mode: "System",
                    }
                    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(save_state))
                }


            } catch (e) {
                // ignore error
            } finally {
                setIsReady(true)
            }
        };
        restoreState()
        return () => {
        }
    }, [])


    const contextValue = {
        QuickAdd,
        ShowQuickStats,
        SmokedM,
        SmokedY,
        SmokedW,
        LastSmoked,
        LastAdded,
        MostCigarBrand,
        MostCigarName,
        handleQuickAdd,
        handleShowQuickStats,
        handleSmokedM,
        handleSmokedY,
        handleSmokedW,
        handleLastSmoked,
        handleLastAdded,
        handleMostCigarBrand,
        handleMostCigarName,
        handleMode,
        isReady,
        Mode

    };
    return (
        <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
    );
};

export const useSettings = () => useContext(DataContext) as ISettings;
