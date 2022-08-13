import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
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


    const handleBarCodeScanned = ({ type, data }) => {
        setPayload(data);
        setIsActive(false);
        // navigation.navigate('Dashboard')
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
                    <MaterialIcons name="verified" size={256} color="darkgreen" />
                    <Text style={styles.payloadText}>Payload: {payload}</Text>
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


});