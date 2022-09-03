import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


const ScanQR = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [payload, setPayload] = useState('');
    const [loading, setLoading] = useState(false);
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
                setIsActive(false);
                setLoading(true);

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
            setTimeout(() => {
                setLoading(false);
            },2000)
            setPayload(json);
            // navigation.navigate('Dashboard')
            }
        }catch(error){
            console.log(error);
        }

    };


    if (loading === true) {
        return <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text>Await a minute...</Text>

        </View>
    }

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
                <View style={styles.containerDetails}>
                    {/* <MaterialIcons name="verified" size={256} color="darkgreen" /> */}
                    <Image
                        style={[styles.tinyLogo, !payload.payment_status ? {borderWidth: 5, borderColor: 'green'}:{borderWidth: 5, borderColor: 'red'}]}
                        source={{
                        uri: `https://qr-api-test.herokuapp.com${payload.prof_pic}`,
                        }}
                    />
                    <View style={styles.payloadText}>
                        <Text style={styles.studetails}>Student Details:</Text>
                        <Text style={styles.textContent}>Name: {payload.name}</Text>
                        <Text style={styles.textContent}>Department: {payload.dept}</Text>
                        <Text style={styles.textContent}>Pickup Point: {payload.pickup_point}</Text>
                        <Text style={styles.textContent}>Bus No: {payload.bus_no}</Text>
                        <Text style={styles.textContent}>Enroll No: {payload.enroll_no}</Text>
                    </View>
                    <View style={styles.bottomBtnsContainer}>
                        <TouchableOpacity
                            onPress={() => setIsActive(true)}
                            style={styles.bottomBtn}>
                            <Ionicons name="scan-sharp" size={36} color="#6f6f6f" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setIsActive(true);
                                navigation.navigate('Dashboard')}
                            }
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
        alignItems: 'center',
    },

    viewport: {
        height: '100%',
        width: '150%'
    },

    bottomBtnsContainer: {
        flexDirection: 'row',
        marginTop: 50
    },


    bottomBtn: {
        margin: 5,
        padding: 20
    },

    tinyLogo: {
        width: 200,
        height: 200,
        borderRadius: 100
    },

    payloadText:{
        margin: 10,
        padding: 10,
    }, 
    textContent:{
        fontStyle: 'italic',
        fontSize: 15,
        fontWeight: '500',
        color: '#4f4f4f'
    }, 
    studetails:{
        fontSize: 20,
        margin: 20,
        textAlign: 'left'
    },
    containerDetails: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
});