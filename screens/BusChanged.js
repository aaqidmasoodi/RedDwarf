import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';


const BusChanged = ({ route }) => {

    const navigation = useNavigation();

    const bus = route.params.params.bus

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
            }),
        [navigation]
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textTitle}>{`You have succesfully been added to Bus No. ${bus.number}.`}</Text>
            </View>
            <AntDesign name="checkcircle" size={128} color="#cf8300" />

            <TouchableOpacity
                onPress={() => navigation.navigate('Home', { screen: 'Dashboard' })}
            >
                <Text style={styles.viewBusDetailsBtn}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default BusChanged

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },


    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6f6f6f',
        width: 300,
        textAlign: 'center'
    },


    viewBusDetailsBtn: {
        marginVertical: 20,
        color: '#cf8300',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
})