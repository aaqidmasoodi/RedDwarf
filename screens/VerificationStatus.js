import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VerificationStatus = () => {


    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <MaterialIcons name="verified" size={256} color="darkgreen" />
            <View style={styles.bottomBtnsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ScanQR')}
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
    )
}

export default VerificationStatus

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomBtnsContainer: {
        flexDirection: 'row',
        marginTop: 100
    },


    bottomBtn: {
        margin: 5,
        padding: 20
    }


})