import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity, Alert, ScrollView, Image } from 'react-native'
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import api from '../api/config';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';


const AnimatedIonicons = Animatable.createAnimatableComponent(Ionicons);


const ScanQR = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [payload, setPayload] = useState(null);
    const auth_token = useSelector(state => state.root.token)
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const handleBack = () => {
        setIsActive(false);
        setScanned(false);
    };


    const handleGoBack = () => {
        setIsActive(false);
        setScanned(false);
    }

    const handleScanAgain = () => {
        setPayload(null);
        setScanned(false);
        setIsActive(true);
    }

    const handleGoToDashboard = () => {
        setPayload(null);
        navigation.navigate('Home');
    }

    const handleBarCodeScanned = async ({ data }) => {
        try {
            const qr_payload = data.split("?");
            console.log(qr_payload)

            if (qr_payload[0] === "CUKBRS" && qr_payload.length > 1) {
                setScanned(true);
                const qr_token = qr_payload[1];
                console.log(qr_token);

                api.post('/payments/validate-qr/', {
                    token: qr_token
                }, {
                    headers: { Authorization: `Token ${auth_token}` }
                })
                    .then(res => {
                        setIsActive(false);
                        setScanned(false);
                        console.log('here.')
                        setPayload(res.data.data);

                    })
                    .catch(err => {
                        const err_data = err.response.data;
                        console.log(err.response.data);
                        if (err_data.non_field_errors) {
                            const error_message = err_data.non_field_errors[0]
                            Alert.alert(
                                "QR validation error",
                                error_message,
                                [
                                    {
                                        text: "Go Back",
                                        onPress: handleGoBack,
                                        style: "cancel"
                                    },
                                    { text: "Try again", onPress: () => setScanned(false) }
                                ]
                            );
                        }

                        else {

                            Alert.alert(
                                "Fatal error",
                                "Something Went wrong. Try again later!",
                                [
                                    {
                                        text: "Go Back",
                                        onPress: handleGoBack,
                                        style: "cancel"
                                    },
                                    { text: "Try again", onPress: () => setScanned(false) }
                                ]
                            );

                        }
                    })

            }

        } catch (error) {
            console.log("Something Went Wrong.")
        }

    };

    if (hasPermission === null) {
        return <View style={styles.container}>
            <ActivityIndicator />
        </View>
    }
    if (hasPermission === false) {
        return <View style={styles.container}>
            <Text>No access to camera</Text>
        </View>

    }

    return (
        <View style={styles.container}>
            {isActive && (
                <BarCodeScanner style={styles.viewport} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
            )}

            {isActive && (
                <View style={[styles.cameraOverlay,
                {
                    backgroundColor: scanned ? '#00000090' : null
                }]}>
                    {!scanned && <>
                        <View style={styles.qrGuidetextContainer}>
                            <Text style={styles.qrGuidetext}>Find a code to scan</Text>

                        </View>

                        <AnimatedIonicons
                            animation={!scanned ? 'pulse' : null}
                            duration={1000}
                            iterationCount='infinite'
                            useNativeDriver
                            style={styles.qrScanArea}
                            name="scan-outline" size={256}
                            color="#cf830075" />


                        <TouchableOpacity style={styles.toggleBackBtnContainer}
                            onPress={handleBack}
                        >
                            <AntDesign name="close" size={30} color="#ffffff" />

                        </TouchableOpacity>
                    </>}

                    {scanned && <>
                        <View >
                            <ActivityIndicator size="large" color="#cf8300" />

                        </View>
                    </>}

                </View>
            )}

            {!isActive && !payload && (
                <View style={styles.cameraOverlay}>

                    <View style={styles.scannerGuideTextContainer}>
                        <Text style={styles.scannerTextHeader}>
                            {'Securely scan & validate all payments'}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={128}
                        color="#cf8300" />
                    <TouchableOpacity
                        style={styles.startScanbtn}
                        onPress={() => setIsActive(true)}
                    >
                        <Text style={styles.startScanbtnText}>Scan</Text>
                    </TouchableOpacity>


                </View>
            )}


            {!isActive && payload && (
                <View style={styles.payloadOverlay}>

                    <ScrollView>
                        <Image
                            style={styles.profilePhoto}
                            source={require('../assets/app/profile_photo.jpeg')}
                        />
                        <Text>{payload.name}</Text>
                        <Text>{payload.phone}</Text>
                    </ScrollView>

                    <View style={styles.ViewBottom}>

                        <TouchableOpacity
                            onPress={handleGoToDashboard}
                        >
                            <Text>Go to Dashboard</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleScanAgain}
                        >
                            <Text>Scan again</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            )}


        </View>
    );
}

export default ScanQR;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    viewport: {
        height: '150%',
        width: '150%'
    },

    bottomBtnsContainer: {
        flexDirection: 'row',
        marginTop: 100
    },

    profilePhoto: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginVertical: 50,
        borderRadius: 50
    },

    cameraOverlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    payloadOverlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    qrGuidetextContainer: {
        backgroundColor: '#00000080',
        borderRadius: 10,
        padding: 15,

        justifyContent: 'center',
        alignItems: 'center'
    },

    toggleBackBtnContainer: {
        backgroundColor: '#00000080',
        borderRadius: 30,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    qrGuidetext: {
        color: '#ffffff95',
        fontSize: 16,
        fontWeight: 'bold'

    },

    bottomBtn: {
        margin: 5,
        padding: 20
    },

    scannerGuideTextContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    scannerTextHeader: {
        fontWeight: 'bold',
        fontSize: 22,
        width: 250,
        textAlign: 'center'
    },
    scannerTextBody: {
        width: 250
    },

    startScanbtn: {
        padding: 20,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#cf8300'
    },

    startScanbtnText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#cf8300'
    },

    ViewBottom: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }


});