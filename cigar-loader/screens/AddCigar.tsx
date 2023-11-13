import { View, TouchableOpacity, Image, Dimensions, Platform, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, IconButton, TextInput, Text, Avatar, HelperText, Button, useTheme, Surface, Chip } from 'react-native-paper';
import Autocomplete from '../components/AutoComplete';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import DetailsComponent from '../components/DetailsComponent';
import { DbBrand, DbCigar, DbHumidor, DbLibrary, RingType } from '../constants';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { UseDatabase } from '../hooks/UseDatabase';
import { } from '../constants/data';
const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
function isCmOrMm(val: string): val is RingType {
    const cmPattern = /^\d+ cm$/;
    const mmPattern = /^\d+ mm$/;

    return cmPattern.test(val) || mmPattern.test(val);
}
type PersonKeys = keyof DbCigar
type BrandKeys = keyof DbBrand

function containsHumidor(obj: number, list: DbHumidor[]) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj ) {
            return true;
        }
    }
    return false;
}
function checkIsCigarCorrect(param: DbCigar): { [item in keyof DbCigar]: boolean } {
    var values_check = { brand_id: true, length: true, name: true, ring: true, smoking_time: true, id: true }
    // checking the name
    if (typeof param.name != "string") {
        values_check.name = false
    } else {
        if (param.name.length < 3) {
            values_check.name = false
        }
    }
    // checking the length
    if (typeof param.length != "number") {
        values_check.length = false
    } else {
        if (param.length <= 0) {
            values_check.length = false
        }
    }
    // checking smoking time
    if (typeof param.smoking_time != "number") {
        values_check.smoking_time = false
    } else {
        if (param.smoking_time <= 0) {
            values_check.smoking_time = false
        }
    }

    if (!isCmOrMm(param.ring)) {
        values_check.ring = false
    } else {
        const the_ring = param.ring.replace(" cm", "").replace(" mm", "")
        if (parseInt(the_ring) <= 0) {
            values_check.length = false
        }
    }

    return values_check
}
function checkIsBrandCorrect(param: DbBrand): { [item in keyof DbBrand]: boolean } {
    var values_check = { name: true, origin: true, id: true }
    // checking the name
    if (typeof param.name != "string") {
        values_check.name = false
    } else {
        if (param.name.length < 3) {
            values_check.name = false
        }
    }
    // checking the origin
    if (typeof param.origin != "string") {
        values_check.name = false
    } else {
        if (param.origin.length < 3) {
            values_check.origin = false
        }
    }

    return values_check
}

function checkIsInfoCorrect(param: DbLibrary, HumidorList: DbHumidor[]): { [item in keyof DbLibrary]: boolean } {

    var values_check = { cigar_id: true, date_added: true, humidor_id: true, price: true, qrCode: true, total_number: true, id: true }
    // checking the price
    if (typeof param.price != "number") {
        values_check.price = false
    } else {
        if (param.price <= 0) {
            values_check.price = false
        }
    }
    if (typeof param.total_number != "number") {
        values_check.total_number = false
    } else {
        if (param.total_number <= 0) {
            values_check.total_number = false
        }
    }

    if (typeof param.qrCode != "string") {
        values_check.qrCode = false
    } else {
        if (param.qrCode.length < 16) {
            values_check.qrCode = false
        }
    }
    if (typeof param.humidor_id == "undefined") {
        values_check.humidor_id = false
    } else {
        if (!containsHumidor(param.humidor_id, HumidorList)) {
            values_check.humidor_id = false
        }
    }
    if (typeof param.date_added == "undefined") {
        values_check.date_added = false
    } else {
        if (param.date_added && Object.prototype.toString.call(param.date_added) === "[object Date]" && !isNaN(param.date_added.getTime())) {
            values_check.date_added = true
        } else {
            values_check.date_added = false

        }
    }


    return values_check
}

export default function AddCigar(props: any) {
    const [tempDiameter, setTempDiameter] = useState<string>("")
    const [brandList, setBrandList] = useState<Array<DbBrand>>([])
    const [IsCigarCorrect, setIsCigarCorrect] = useState<{ [item in keyof DbCigar]: boolean }>({ brand_id: true, length: true, name: true, ring: true, smoking_time: true, id: true })
    const [IsBrandCorrect, setIsBrandCorrect] = useState<{ [item in keyof DbBrand]: boolean }>({ name: true, origin: true, id: true })
    const [IsInfoCorrect, setIsInfoCorrect] = useState<{ [item in keyof DbLibrary]: boolean }>({ cigar_id: true, date_added: true, humidor_id: true, price: true, qrCode: true, total_number: true, id: true })
    const [isEditableBrand, setIsEditableBrand] = useState<boolean>(true)
    const [isEditableCigar, setIsEditableCigar] = useState<boolean>(true)
    const [Library, setLibrary] = useState<DbLibrary>(
        {
            cigar_id: NaN,
            humidor_id: NaN,
            id: NaN,
            price: 0,
            qrCode: "",
            total_number: 0,
            date_added: new Date()
        }
    )
    const [cigar, setCigar] = useState<DbCigar>(
        {
            id: NaN,
            brand_id: NaN,
            length: 0,
            name: "",
            ring: "0 cm",
            smoking_time: 0,
        }
    )
    const [Brand, setBrand] = useState<DbBrand>(
        {
            id: NaN,
            name: "",
            origin: ""
        }
    )



    const theme = useTheme()
    const database = UseDatabase()
    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (selectedDate != undefined) {
            setLibrary(prevState => ({
                ...prevState,
                date_added: selectedDate
            }))
        }
    };
    const showDate = () => {
        DateTimePickerAndroid.open({
            value: Library.date_added,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };
    useEffect(() => {
        if (isCmOrMm(tempDiameter)) {

            setCigar(prevState => ({
                ...prevState,
                    ring: tempDiameter
            }))
        } else {
        }


    }, [tempDiameter])
    useEffect(() => {
        database.select_from_table("Brand", setBrandList)
        database.select_from_table("Library", database.handleLibraryList)
        // 
        // v
    }, [])

    const handle_add_cigar = async () => {
        // if (Library.cigar.brand.name)
        
        var brand_exists: boolean = false
        
        var cigar_exists: boolean = false
        var isReturn:boolean=false

        const check_cigar = checkIsCigarCorrect(cigar)
        var LibraryItem = Library
        var CigarItem = cigar
        var BrandItem = Brand
        
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 64) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        LibraryItem.qrCode = result
        setIsCigarCorrect(check_cigar)
        
        console.log("isReturn Start")
        console.log(isReturn)
        Object.keys(check_cigar).map((v: PersonKeys | string) => {
            if (v == "brand_id" || v == "length" || v == "name" || v == "ring" || v == "smoking_time" || v == "id") {
                
                if (!check_cigar[v]) {
                    isReturn=true
                }
                
            }
        })
        
        const check_brand = checkIsBrandCorrect(Brand)
        
        setIsBrandCorrect(check_brand)
        console.log(isReturn)
        Object.keys(check_brand).map((v: string) => {
            if (v == "id" || v == "name" || v == "origin") {
                
                if (!check_brand[v]) {
                    isReturn=true
                }
                
            }
        })
        
        const check_info = checkIsInfoCorrect(LibraryItem, database.HumidorList)
        
        setIsInfoCorrect(check_info)
        console.log(isReturn)
        
        Object.keys(check_info).map((v: string) => {
            
            if (v == "cigar_id" || v == "date_added" || v == "humidor_id" || v == "price" || v == "qrCode" || v == "total_number" || v == "id") {
                
                if (!check_info[v]) {
                    console.log(v)
                    console.log(Library.qrCode)
                    isReturn=true
                }
                
            }
        })
        console.log(isReturn)
        if(isReturn){
            return
        }

        
        
        database.CigarList.map((v, e) => {
            
            if (v.name == cigar.name && v.length == cigar.length && v.ring == cigar.ring && v.smoking_time == cigar.smoking_time) {
                cigar_exists = true
                
                if (typeof v.id != "undefined") {
                    CigarItem.id = v.id
                    LibraryItem.cigar_id=v.id
                }
                
            }
        })
        
        
        brandList.map((v, e) => {
            if (v.name == Brand.name && v.origin == Brand.origin) {
                brand_exists = true
                BrandItem.id = v.id
                CigarItem.brand_id = v.id!=undefined?v.id:NaN
            }
        })
  
        if (!brand_exists) {
            BrandItem.id = await database.add_to_brand(Brand)
            CigarItem.brand_id=BrandItem.id
        }
        
        
        if (!cigar_exists) {

            
            
            const cigar_result = await database.add_to_cigar(cigar);
            
            CigarItem.id = cigar_result != undefined ? cigar_result : NaN
            LibraryItem.cigar_id=CigarItem.id
        }
        
        
        
        await database.add_to_library(LibraryItem)
        
        database.select_from_table("Cigar", database.handleCigarList)
        setTimeout(() => {
            navigation.goBack()
        }, 500); 

    }

    const navigation = useNavigation();
    return (

        <DetailsComponent
            backgroundImage={require('../assets/images/Background.png')}
            foregroundImage={require('../assets/images/CigarHumidor2WithShadow.png')}
            buttonText='Adding A Cigar'
            onPress={() => { handle_add_cigar(); }}
            short='new'
            topText={"Adding A Cigar"}
            increase={() => {
                setLibrary(prevState => ({
                    ...prevState,
                    total_number: Library?.total_number + 1
                }))
            }}
            decrease={() => {
                setLibrary(prevState => ({
                    ...prevState,
                    total_number: Library?.total_number - 1
                }))
            }}
            left='Cigars To Be Added'
            number={Library.total_number}

        >


            {/* Cigar Info Section */}


            <Card style={{ marginTop: 16 }} mode={"contained"}>
                <Card.Title
                    title="Cigar Info Section"
                    left={(props: any) => <Avatar.Icon {...props} icon="cigar" />}

                />
                <Card.Content style={{ rowGap: 8 }}>
                    {!IsInfoCorrect["total_number"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cannot add 0 cigars
                        </HelperText>
                    }
                    <Autocomplete
                        data={database.CigarList}
                        label="Cigar's Name"
                        icon=''
                        value={cigar?.name ? cigar?.name : ""}
                        accessor={"name"}
                        setValue={(e) => {
                            setIsEditableBrand(true)
                            setIsEditableCigar(true)
                            setCigar(prevState => ({
                                ...prevState,
                                name: e

                            }))
                        }

                        }
                        Callback={(e) => {
                            setIsEditableBrand(false)
                            setIsEditableCigar(false)
                            // 
                            setCigar(prevState => ({
                                ...prevState,
                                length: e.length,
                                ring: e.ring,
                                smoking_time: e.smoking_time,
                                brand_id: e.brand_id
                            }))
                            const the_brand = brandList.find((x) => (x.id == e.brand_id))
                            if (typeof the_brand?.id != "undefined") {
                                setBrand(the_brand)
                            }
                        }}
                    />
                    {!IsCigarCorrect["name"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cigar name is empty or invalid
                        </HelperText>
                    }

                    <TextInput
                        editable={isEditableCigar}
                        inputMode='numeric'
                        value={cigar?.smoking_time ? String(cigar?.smoking_time) : ""}
                        label="Cigar's Smoking Time in Minutes"
                        onChangeText={(e) => {
                            const val = e.replace(
                                /[- #*;,<>\{\}\[\]\\\A-Z/a-z/]/gi,
                                ""
                            );
                            setCigar(prevState => ({
                                ...prevState,

                                smoking_time: parseInt(val)


                            }))
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                            colors: {
                                background: isEditableCigar == true ? theme.colors.background : theme.colors.elevation.level3
                            }
                        }} />
                    {!IsCigarCorrect["smoking_time"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cigar smoking time is empty or larger than 0
                        </HelperText>
                    }
                    <TextInput
                        editable={isEditableCigar}
                        error={tempDiameter != "" ? !isCmOrMm(tempDiameter) : false}
                        value={tempDiameter}
                        label="Cigar Diameter"

                        onChangeText={(e) => {
                            setTempDiameter(e)
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                            colors: {
                                background: isEditableCigar == true ? theme.colors.background : theme.colors.elevation.level3
                            }
                        }} />
                    {IsCigarCorrect["ring"] ?
                        !isCmOrMm(tempDiameter) && tempDiameter != "" &&
                        <HelperText type="error" padding="none" visible>
                            Error: size must follow the following example "10 cm/mm"
                        </HelperText>
                        :
                        <HelperText type="error" padding="none" visible>
                            Error: size must follow the following example "10 cm/mm"
                        </HelperText>
                    }

                    <TextInput
                        editable={isEditableCigar}
                        value={cigar?.length ? String(cigar?.length) : ""}
                        label="Cigar's length"
                        onChangeText={(e) => {
                            const val = e.replace(
                                /[- #*;,<>\{\}\[\]\\\A-Z/a-z/]/gi,
                                ""
                            );
                            setCigar(prevState => ({
                                ...prevState,
                                length: parseInt(val)
                            }))
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                            colors: {
                                background: isEditableCigar == true ? theme.colors.background : theme.colors.elevation.level3
                            }
                        }} />
                    {!IsCigarCorrect["length"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cigar's Length is empty or not larger than 0
                        </HelperText>
                    }

                </Card.Content>
            </Card>


            {/* Cigar Brand Section */}


            <Card style={{ marginTop: 16 }} mode={"contained"}>
                <Card.Title
                    title="Cigar Brand Info Section"
                    left={(props: any) => <Avatar.Icon {...props} icon="cigar" />}

                />
                <Card.Content style={{ rowGap: 8 }}>
                    <Autocomplete
                        data={brandList}
                        label="Brand's Name"
                        icon=''
                        value={Brand?.name ? Brand?.name : ""}
                        accessor={"name"}
                        setValue={(e) => {
                            setIsEditableBrand(true)
                            setBrand(prevState => ({
                                ...prevState,
                                name: e

                            }))
                        }

                        }
                        Callback={(e) => {
                            setIsEditableBrand(false)
                            setBrand(prevState => ({
                                ...prevState,
                                origin: e.origin
                            }))
                        }}
                    />
                    {!IsBrandCorrect["name"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cigar Brand's name is empty or invalid
                        </HelperText>
                    }
                    <TextInput
                        editable={isEditableBrand}
                        value={Brand?.origin ? Brand?.origin : ""}
                        label={isEditableBrand ? "Brand's Country of Origin" : "Brand's Country of Origin" + " [Uneditable]"}

                        onChangeText={(e) => {
                            setBrand(prevState => ({
                                ...prevState,
                                        origin: e
                            }))
                        }

                        }

                        mode="outlined"
                        theme={{
                            roundness: 25,
                            colors: {
                                background: isEditableBrand == true ? theme.colors.background : theme.colors.elevation.level3
                            }

                        }} />
                    {!IsBrandCorrect["origin"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Brand's Location is empty or invalid
                        </HelperText>
                    }
                </Card.Content>
            </Card>

            {/* Humidor and Cigar adding details */}


            <Card style={{ marginTop: 16 }} mode={"contained"}>
                <Card.Title
                    title="Info About The Added Cigar "
                    left={(props: any) => <Avatar.Icon {...props} icon="cigar" />}

                />
                <Card.Content style={{ rowGap: 8 }}>
                    <TextInput
                        value={Library?.price ? String(Library?.price) : ""}
                        inputMode='numeric'
                        label="Cigar's Price"
                        onChangeText={(e) => {
                            const val = e.replace(
                                /[- #*;,<>\{\}\[\]\\\A-Z/a-z/]/gi,
                                ""
                            );
                            setLibrary(prevState => ({
                                ...prevState,
                                price: parseInt(val)

                            }))
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                        }} />
                    {!IsInfoCorrect["price"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cigar's price must be bigger than 0
                        </HelperText>
                    }
                    <Surface elevation={0} style={{ justifyContent: "space-between", flexDirection: "row", backgroundColor: theme.colors.surface, borderRadius: 25, paddingLeft: 16, alignItems: "center", borderWidth: 0.7, borderColor: theme.colors.onSurfaceVariant }} >
                        <Text style={{ color: theme.colors.onSurfaceVariant }} variant='bodyLarge' >
                            {String(Library.date_added.getDate()).padStart(2, '0') + "/" + String(Library.date_added.getMonth() + 1).padStart(2, '0') + "/" + Library.date_added.getFullYear()

                            }
                        </Text>
                        <Button textColor={theme.colors.secondary} mode="contained-tonal" icon="calendar" style={{ paddingVertical: 4 }} onPress={() => { showDate() }} theme={{
                            roundness: 25,
                        }} >
                            Choose Date
                        </Button>

                    </Surface>
                    {!IsInfoCorrect["date_added"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Cigar Date is Invalid
                        </HelperText>
                    }
                    <Text variant='bodyLarge' style={{ padding: 4, paddingVertical: 8 }}>
                        Select Humidor:
                    </Text>
                    <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 8, rowGap: 8 }}>
                        {database.HumidorList.map((v, e) => {
                            return (
                                <Chip
                                    selected={v.id == Library.humidor_id}
                                    selectedColor={theme.colors.secondary}

                                    showSelectedOverlay
                                    onPress={() => {
                                        setLibrary(prevState => ({
                                            ...prevState,
                                            humidor_id: Library.humidor_id == v.id ? NaN : typeof v.id=="undefined"?NaN:v.id

                                        }))
                                    }}
                                    //   style={{backgroundColor:theme.colors.secondaryContainer}}
                                    textStyle={{ color: theme.colors.onSurfaceVariant }}
                                >
                                    {v.name}
                                </Chip>

                            )
                        })}
                    </Surface>
                    {!IsInfoCorrect["humidor_id"] &&
                        <HelperText type="error" padding="none" visible>
                            Error: Please select a humidor in which the cigar will be added
                        </HelperText>
                    }
                </Card.Content>
            </Card>



        </DetailsComponent>

    )
}