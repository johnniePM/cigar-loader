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
import { IBrand, ICigar, ILibrary, RingType } from '../constants';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { UseData } from '../hooks/UseData';
import { UseDatabase } from '../hooks/UseDatabase';
const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
function isCmOrMm(val: string): val is RingType {
    const cmPattern = /^\d+ cm$/;
    const mmPattern = /^\d+ mm$/;

    return cmPattern.test(val) || mmPattern.test(val);
}

export default function AddCigar(props: any) {
    const [tempDiameter, setTempDiameter] = useState<string>("")
    const [brand, setBrand] = useState<Array<IBrand>>([])
    const [isEditableBrand,setIsEditableBrand]=useState<boolean>(true)
    const [isEditableCigar,setIsEditableCigar]=useState<boolean>(true)
    const [Library, setLibrary] = useState<ILibrary>(
        {
            cigar: {
                brand: {
                    name: "",
                    origin: ""
                },
                length: 0,
                name: "",
                ring: "0 cm",
                smoking_time: 0,

            },
            humidor: {
                name: "",
                total_capacity: "",
            },
            price: 30,
            qrCode: "",
            total_number: 1,
            date_added: new Date()
        }
    )

    const theme = useTheme()
    const data = UseData()
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

            setLibrary(prevState => ({
                ...prevState,
                cigar: {
                    ...prevState.cigar,
                    ring: tempDiameter
                }

            }))
        } else {
        }


    }, [tempDiameter])
    useEffect(() => {
        database.select_from_table("Brand", setBrand)
    }, [])

    const handle_add_cigar = () => {
        // if (Library.cigar.brand.name)
        var brand_exists: boolean = false
        var cigar_exists: boolean = false
        var Item = Library
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        Item.qrCode = result
        data.CigarList.map((v, e) => {

            if (v.name == Library.cigar.name && v.length == Library.cigar.length && v.ring == Library.cigar.ring && v.smoking_time == Library.cigar.smoking_time) {
                cigar_exists = true
                Item.cigar.id = v.id

            }
        })

        brand.map((v, e) => {
            if (v.name == Library.cigar.brand.name && v.origin == Library.cigar.brand.origin) {
                brand_exists = true
                Item.cigar.brand.id = v.id
            }
        })
        if (!brand_exists) {
            database.add_to_brand(Item.cigar.brand)
        }
        if (!cigar_exists) {
            database.add_to_cigar(Item.cigar)
        }
        database.add_to_library(Item)
    }

    const navigation = useNavigation();
    return (

        <DetailsComponent
            backgroundImage={require('../assets/images/Background.png')}
            foregroundImage={require('../assets/images/CigarHumidor2WithShadow.png')}
            buttonText='Adding A Cigar'
            onPress={() => { }}
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
                    <TextInput
                        value={Library?.cigar?.name ? Library?.cigar?.name : ""}
                        label="Cigar's Name"
                        onChangeText={(e) => {
                            setLibrary(prevState => ({
                                ...prevState,
                                cigar: {
                                    ...prevState.cigar,
                                    name: e
                                }

                            }))
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                        }} />


                    <TextInput
                        inputMode='numeric'
                        value={Library?.cigar?.smoking_time ? String(Library?.cigar?.smoking_time) : ""}
                        label="Cigar's Smoking Time in Minutes"
                        onChangeText={(e) => {
                            const val = e.replace(
                                /[- #*;,<>\{\}\[\]\\\A-Z/a-z/]/gi,
                                ""
                            );
                            setLibrary(prevState => ({
                                ...prevState,
                                cigar: {
                                    ...prevState.cigar,
                                    smoking_time: parseInt(val)
                                }

                            }))
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                        }} />
                    <TextInput
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
                        }} />
                    {!isCmOrMm(tempDiameter) && tempDiameter != "" &&
                        <HelperText type="error" padding="none" visible={tempDiameter != "" ? !isCmOrMm(tempDiameter) : false}>
                            Error: size must follow the following example "10 cm/mm"
                        </HelperText>
                    }

                    <TextInput
                        value={Library?.cigar?.length ? String(Library?.cigar?.length) : ""}
                        label="Cigar's length"
                        onChangeText={(e) => {
                            const val = e.replace(
                                /[- #*;,<>\{\}\[\]\\\A-Z/a-z/]/gi,
                                ""
                            );
                            setLibrary(prevState => ({
                                ...prevState,
                                cigar: {
                                    ...prevState.cigar,
                                    length: parseInt(val)
                                }

                            }))
                        }

                        }
                        mode="outlined"
                        theme={{
                            roundness: 25,
                        }} />

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
                        data={brand}
                        label="Brand's Name"
                        icon=''
                        value={Library?.cigar?.brand?.name ? Library?.cigar?.brand?.name : ""}
                        accessor={"name"}
                        setValue={(e) => {
                            setIsEditableBrand(true)
                            setLibrary(prevState => ({
                                ...prevState,
                                cigar: {
                                    ...prevState.cigar,
                                    brand: {
                                        ...prevState.cigar.brand,
                                        name: e
                                    }
                                }

                            }))
                        }

                        }
                        Callback={(e)=>{
                            setIsEditableBrand(false)
                             setLibrary(prevState => ({
                                ...prevState,
                                cigar: {
                                    ...prevState.cigar,
                                    brand: {
                                        ...prevState.cigar.brand,
                                        origin: e.origin
                                    }
                                }

                            }))
                        }}
                    />
                    
                    <TextInput
                        editable={isEditableBrand}
                        value={Library?.cigar?.brand?.origin ? Library?.cigar?.brand?.origin : ""}
                        label={isEditableBrand? "Brand's Country of Origin":"Brand's Country of Origin" + " [Uneditable]"}

                        onChangeText={(e) => {
                            setLibrary(prevState => ({
                                ...prevState,
                                cigar: {
                                    ...prevState.cigar,
                                    brand: {
                                        ...prevState.cigar.brand,
                                        origin: e
                                    }
                                }

                            }))
                        }

                        }
                        
                        mode="outlined"
                        theme={{
                            roundness: 25,

                            
                        }} />
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
                    <Text variant='bodyLarge' style={{ padding: 4, paddingVertical: 8 }}>
                        Select Humidor:
                    </Text>
                    <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 8, rowGap: 8 }}>
                        {data.HumidorList.map((v, e) => {
                            return (
                                <Chip
                                    selected={v.name == Library.humidor.name}
                                    selectedColor={theme.colors.secondary}

                                    showSelectedOverlay
                                    onPress={() => {
                                        setLibrary(prevState => ({
                                            ...prevState,
                                            humidor: Library.humidor.name == v.name ? { name: "", total_capacity: "0" } : v

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
                </Card.Content>
            </Card>



        </DetailsComponent>

    )
}