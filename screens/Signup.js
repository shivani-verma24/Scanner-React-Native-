import React, { useEffect, useState } from "react";
import { View, Image, Text, KeyboardAvoidingView, Platform, Touchable, TouchableOpacity, LogBox, StyleSheet, Button, Modal } from "react-native";
import { icons, images, COLORS, SIZES, FONTS } from '../constants'
import LinearGradient from "react-native-linear-gradient";
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";

const loginValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    // age: yup.number().required().positive().integer(),
    //email: yup.string().email('Please enter valid email.').required('Email address is required'),
    password: yup.string().min(8, ({ min }) => `Password must be atleast ${min} characters`).required('Password is required').matches(/[a-zA-Z]/, 'Password can only contain alphabets.')
});



const Signup = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(true)
    
    const [country, setCountry] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [countryVisible, setCountryVisible] = useState(false)

    const [isValid, setIsValid] = useState(false)

    // in flagImage- in above url- images are in svg format so difficult to use
    // therefore using another url - https://dev.to/younginnovations/get-instant-country-flags-22pe

    // Axios- automatic transforms JSON data.

    useEffect(() => {
        axios.get("https://restcountries.com/v2/all")
            .then((response) => {
                let countryData = response.data.map(item => {
                    lowerCountryCode = item.alpha2Code.toLowerCase()

                    return {
                        countryCode: item.alpha2Code,
                        countryName: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flagImage: `https://flagcdn.com/48x36/${lowerCountryCode}.png`
                    }
                })

                setCountry(countryData)

                if (countryData.length > 0) {
                    let defaultData = countryData.filter(c => c.countryCode == "US")

                    if (defaultData.length > 0) {
                        setSelectedCountry(defaultData[0])
                    }

                }
            })
    }, [])


    // useEffect(() => {
    //     fetch("https://restcountries.com/v2/all")
    //         .then(response => response.json())
    //         .then(data => {
    //             //console.log(data)
    //             let countryData = data.map(item => {
    //                 lowerCountryCode = item.alpha2Code.toLowerCase()

    //                 return {
    //                     countryCode: item.alpha2Code,
    //                     countryName: item.name,
    //                     callingCode: `+${item.callingCodes[0]}`,
    //                     flagImage: `https://flagcdn.com/48x36/${lowerCountryCode}.png`
    //                 }
    //             })

    //             setCountry(countryData)

    //             if (countryData.length > 0) {
    //                 let defaultData = countryData.filter(c => c.countryCode == "US")

    //                 if (defaultData.length > 0) {
    //                     setSelectedCountry(defaultData[0])
    //                 }

    //             }
    //         })
    // }, [])

    function Header() {
        return (
            <TouchableOpacity
                style={styles.Header}
            >
                <Image source={icons.back}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.HeaderText}>Sign Up</Text>
            </TouchableOpacity>
        )
    }

    function Logo() {
        return (
            <View style={styles.Logo}>
                <Image source={images.wallieLogo}
                    resizeMode='contain'
                    style={{ width: '60%' }}
                />
            </View>
        )
    }

    function Form() {
        return (
            <Formik
                initialValues={{ name: '', password: '' }}
                validateOnMount={true}
                onSubmit={values => console.log(values)}
                validationSchema= {loginValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                    <View style={styles.Form}
                    >
                        {/* Full Name */}
                        <View style={styles.FormView}>
                            <Text style={styles.text}
                            >Full Name</Text>

                            <TextInput style={styles.textInput}
                                placeholder='Enter Full Name'
                                placeholderTextColor={COLORS.white}
                                selectionColor={COLORS.white}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            ></TextInput>
                        </View>
                        { (errors.name && touched.name) && <Text style= { styles.errors }>{errors.name}</Text> }

                        {/* Phone Number */}
                        <View style={{ marginTop: SIZES.padding * 2 }}>
                            <Text style={styles.text}
                            >Phone Number</Text>

                            <View style={{ flexDirection: 'row' }}>
                                {/* Dropwown icon */}
                                <TouchableOpacity
                                    style={styles.CountryCodeInfo}
                                    onPress={() => setCountryVisible(true)}
                                >
                                    <View style={{ justifyContent: 'center' }}>
                                        <Image source={icons.down}
                                            style={styles.downImage} />
                                    </View>

                                    <View style={styles.country}>
                                        {/* Country Flag Image */}
                                        <Image source={{ uri: selectedCountry?.flagImage }}
                                            resizeMode='contain'
                                            style={styles.countryFlagImage}
                                        />
                                    </View>

                                    <View style={styles.country}>
                                        {/* Country Code */}
                                        <Text style={styles.CountryCode}
                                        >{selectedCountry?.countryCode}</Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Phone Number input */}
                                <TextInput style={[styles.textInput, { flex: 1 }]}
                                    placeholder='Enter Phone Number'
                                    placeholderTextColor={COLORS.white}
                                    selectionColor={COLORS.white}
                                ></TextInput>
                            </View>
                        </View>

                        {/* Password */}
                        <View style={{ marginTop: SIZES.padding * 2 }}>
                            <Text style={styles.text}
                            >Password</Text>

                            <TextInput style={styles.textInput}
                                placeholder='Enter Password'
                                placeholderTextColor={COLORS.white}
                                selectionColor={COLORS.white}
                                secureTextEntry={showPassword}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            ></TextInput>

                            {/* toggleButton */}
                            <TouchableOpacity style={styles.ToggleButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Image source={showPassword ? icons.disable_eye : icons.eye}
                                    style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        { (errors.password && touched.password) && <Text style= { styles.errors }>{errors.password}</Text> }
                        { setIsValid(isValid) }
                    </View>
                )}
            </Formik>
        )
    }

    function ContinueButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity style={{
                    height: 60,
                    backgroundColor: COLORS.black,
                    borderRadius: SIZES.radius / 1.5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                    onPress={() => navigation.navigate('Tabs')}
                    disabled= {!isValid}
                >
                    <Text style={{
                        color: COLORS.white,
                        fontSize: SIZES.h3, lineHeight: 22
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }


    function renderCountryInfo() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedCountry(item)
                        setCountryVisible(false)
                    }}
                >
                    <Image source={{ uri: item.flagImage }} style={styles.flagImage} />
                    <Text style={{ color: COLORS.black }}>{item.countryName}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={countryVisible}
            >
                {/* <TouchableWithoutFeedback
                    onPress={() => setCountryVisible(false)}
                > */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        height: 400,
                        width: SIZES.width * 0.8,
                        backgroundColor: COLORS.lightGreen,
                        borderRadius: SIZES.radius
                    }}>

                        <FlatList
                            data={country}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.countryCode}
                            showsVerticalScrollIndicator={false}
                            style={styles.FlatList}
                        />
                    </View>
                </View>
                {/* </TouchableWithoutFeedback> */}
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}>
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {Header()}
                    {Logo()}
                    {Form()}
                    {ContinueButton()}
                </ScrollView>
            </LinearGradient>
            {renderCountryInfo()}
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    textInput:
    {
        marginVertical: SIZES.padding,
        borderBottomColor: COLORS.white,
        borderBottomWidth: 1,
        height: 40,
        color: COLORS.white,
        fontSize: SIZES.body3, lineHeight: 22
    },
    text: {
        color: COLORS.lightGreen,
        fontSize: SIZES.body3,
        lineHeight: 22
    },
    image: {
        width: 20,
        height: 20,
        tintColor: COLORS.white
    },
    Header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.padding * 6,
        paddingHorizontal: SIZES.padding * 2
    },
    HeaderText: {
        marginLeft: SIZES.padding * 1.5,
        color: COLORS.white,
        //  ...FONTS.h4
        fontSize: SIZES.h4,
        lineHeight: 22
    },
    Logo: {
        marginTop: SIZES.padding * 5,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Form: {
        marginTop: SIZES.padding * 3,
        marginHorizontal: SIZES.padding * 3
    },
    FormView: {
        marginTop: SIZES.padding * 3
    },
    CountryCodeInfo: {
        width: 100,
        height: 50,
        marginHorizontal: 5,
        borderBottomColor: COLORS.white,
        borderBottomWidth: 1,
        flexDirection: 'row',
        fontSize: SIZES.body2, lineHeight: 30
    },
    downImage: {
        width: 10,
        height: 10,
        tintColor: COLORS.white
    },
    country: {
        justifyContent: 'center',
        marginLeft: 5
    },
    countryFlagImage: {
        width: 30,
        height: 30,
    },
    CountryCode: {
        color: COLORS.white,
        fontSize: SIZES.body3,
        lineHeight: 22
    },
    ToggleButton: {
        position: 'absolute',
        right: 0,
        bottom: 10,
        height: 30,
        width: 30
    },
    FlatList: {
        padding: SIZES.padding * 2,
        marginBottom: SIZES.padding * 2
    },
    flagImage: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    errors: {
        fontSize: 14,
        color: COLORS.red,
        fontWeight: 'bold',
        marginTop: 5
    }
})
export default Signup;