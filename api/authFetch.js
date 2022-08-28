import * as SecureStore from 'expo-secure-store';

import { BASE_URL } from './config';

export const fetch2 = async (endpoint, body) => {
    const res = await fetch(BASE_URL + endpoint, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": await SecureStore.getItemAsync('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}

export const fetch3 = async (endpoint, type) => {
    const res = await fetch(BASE_URL + endpoint, {
        method: type,
        headers: {
            "Content-Type": "application/json",
            "Authorization": await SecureStore.getItemAsync('token')
        }
    })
    return await res.json()
}