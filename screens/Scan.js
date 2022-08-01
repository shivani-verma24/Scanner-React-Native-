import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import RNFS, { moveFile } from 'react-native-fs'
import { COLORS, icons, images, SIZES } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Linking} from 'react-native'

const Scan = ({ navigation }) => {
    const [{ cameraRef }, { takePicture }] = useCamera(null);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 4, paddingHorizontal: SIZES.padding * 3 }}>
                <TouchableOpacity style={{ width: 45, alignItems: "center", justifyContent: 'center' }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image source={icons.close} style={styles.closeButton} />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.labelText}>Scan for Payment</Text>
                </View>

                <TouchableOpacity style={{ height: 45, width: 45, backgroundColor: COLORS.green, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => console.log("Info")}
                >
                    <Image source={icons.info} style={styles.infoButton} />
                </TouchableOpacity>
            </View>
        )
    }


    function renderScanner(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source= {images.focus}
                resizeMode= 'stretch'
                style= {{ width: 250, height: 250, marginTop: '-55%'}}
                />
            </View>
        )
    }


    function renderPaymentMethod() {
        return (
            <View style={styles.paymentView}>
                <Text style={{ fontSize: SIZES.h4, color: COLORS.black }}>Another payment methods</Text>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding * 2
                }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => console.log("Phone Number")}
                    >
                        <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.lightpurple, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={icons.phone}
                                resizeMode='cover'
                                style={styles.phoneImage}
                            />
                        </View>
                        <Text style={styles.buttonText}>Phone Number</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.padding * 2 }}
                        onPress={() => console.log("Barcode")}
                    >
                        <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.lightGreen, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={icons.barcode}
                                resizeMode='cover'
                                style={styles.barcodeImage}
                            />
                        </View>
                        <Text style={styles.buttonText}>Barcode</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    function onBarCodeRead(result){
        console.log(result.data)
        Linking.openURL(result.data)
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={{ flex: 1 }}
                captureAudio={false}
                flashMode={RNCamera.Constants.FlashMode.off}
                // for barcode reading
                onBarCodeRead= {onBarCodeRead}
                //for android:
                androidCameraPermissionOptions={{
                    title: "Permissions to use camera",
                    message: "Camera is required for capturing image",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }}
            >
                {renderHeader()}
                {renderScanner()}
                {renderPaymentMethod()}
            </RNCamera>
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLORS.transparent
    },
    closeButton: {
        height: 20,
        width: 20,
        tintColor: COLORS.white,
    },
    labelText: {
        color: COLORS.white,
        fontSize: SIZES.body3,
        lineHeight: 22,
    },
    infoButton: {
        height: 25,
        width: 25,
        tintColor: COLORS.white
    },
    paymentView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        padding: SIZES.padding * 3,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        backgroundColor: COLORS.white
    },
    phoneImage: {
        height: 25,
        width: 25,
        tintColor: COLORS.purple
    },
    buttonText: {
        marginLeft: SIZES.padding,
        fontSize: SIZES.body4,
        lineHeight: 22,
        color: COLORS.black
    },
    barcodeImage: {
        height: 25,
        width: 25,
        tintColor: COLORS.primary
    },
    
})




export default Scan;