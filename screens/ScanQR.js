import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


const ScanQR = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [payload, setPayload] = useState('');

    const navigation = useNavigation();


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            setIsActive(true);
        })();
    }, []);


    const handleBarCodeScanned = async ({ data }) => {

        try{

            if(data.split('?')[0] == 'CUKBUS'){     //check our code only
                let user = data.split('?')[1];
                let token = data.split('?')[2];

                let postData = {"user": user, "token" : token}
        
            const response = await fetch('https://qr-api-test.herokuapp.com/getData', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData) 
            });
            const json = await response.json();
            setPayload(json);
            setIsActive(false);
            // navigation.navigate('Dashboard')
            }
        }catch(error){
            console.log(error);
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
                <BarCodeScanner style={styles.viewport} onBarCodeScanned={handleBarCodeScanned} />
            )}

            {!isActive && (
                <View style={styles.container}>
                    {/* <MaterialIcons name="verified" size={256} color="darkgreen" /> */}
                    <Image
                        style={[styles.tinyLogo, payload.payment_status ? {borderWidth: 5, borderColor: 'green'}:{borderWidth: 5, borderColor: 'red'}]}
                        source={{
                        uri: `https://qr-api-test.herokuapp.com${payload.prof_pic}`,
                        }}
                    />
                    <View style={styles.payloadText}>
                    <Text>Name: {payload.name}</Text>
                    <Text>Department: {payload.dept}</Text>
                    <Text>Pickup Point: {payload.pickup_point}</Text>
                    <Text>Bus No: {payload.bus_no}</Text>
                    <Text>Enroll No: {payload.enroll_no}</Text>
                    </View>
                    <View style={styles.bottomBtnsContainer}>
                        <TouchableOpacity
                            onPress={() => setIsActive(true)}
                            style={styles.bottomBtn}>
                            <Ionicons name="scan-sharp" size={36} color="#6f6f6f" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Dashboard')}
                            style={styles.bottomBtn}>
                            <Ionicons name="home-sharp" size={36} color="#6f6f6f" />
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
        alignItems: 'center'
    },

    viewport: {
        height: '100%',
        width: '100%'
    },

    bottomBtnsContainer: {
        flexDirection: 'row',
        marginTop: 100
    },


    bottomBtn: {
        margin: 5,
        padding: 20
    },

    tinyLogo: {
        width: 200,
        height: 200,
        borderRadius: 20
    },

    payloadText:{
        margin: 10,
        padding: 10,
    }
});