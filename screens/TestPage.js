import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect, useRef } from 'react';



const TestPage = () => {
    const [serverState, setServerState] = useState('Loading...');
    const [messageText, setMessageText] = useState('');
    const [serverMessages, setServerMessages] = useState([]);
    var ws = useRef(new WebSocket('ws://10.0.2.2:3000/api/buses/live/')).current;


    useEffect(() => {
        const serverMessagesList = [];
        ws.onopen = () => {
            setServerState('Connected to the server')

        };
        ws.onclose = (e) => {
            setServerState('Disconnected. Check internet or server.')

        };
        ws.onerror = (e) => {
            setServerState(e.message);
        };
        ws.onmessage = (e) => {
            serverMessagesList.push(e.data);
            setServerMessages([...serverMessagesList])
        };
    }, [])


    const submitMessage = () => {
        ws.send(messageText);
        setMessageText('')
        setInputFieldEmpty(true)
    }

    return (

        <SafeAreaView>

        </SafeAreaView>

    )
}

export default TestPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
})