import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPayments, setLoadingPayments } from '../../../redux/slices/paymentsSlice'
import { useEffect } from 'react'
import { getFormattedDate } from '../../../utils/getFormattedDate';


import api from '../../../api/config'
import { useNavigation } from '@react-navigation/native'

const LatestPayments = () => {

    const payments = useSelector(state => state.payments.payments);
    const loadingPayments = useSelector(state => state.payments.loadingPayments)
    const token = useSelector(state => state.root.token);

    const navigation = useNavigation();

    const dispatch = useDispatch();


    const fetchPayments = () => {
        api.get('/payments/', {
            headers: { Authorization: `Token ${token}` }
        })
            .then(res => {
                // console.log(res.data);
                dispatch(setPayments(res.data));
                dispatch(setLoadingPayments(false));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(setLoadingPayments(false));

            })
    }

    useEffect(() => {
        fetchPayments();
    }, []);




    return (
        <>
            <View style={styles.paymentsContainer}>


                <View style={styles.paymentsContainerTitleContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6f6f6f' }}>Payments</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AllPayments')}
                    >
                        <Text style={{ fontWeight: 'bold', color: '#cf8300', fontSize: 16 }}>View All</Text>

                    </TouchableOpacity>
                </View>


            </View>

            {(payments?.length > 0) && !loadingPayments && <FlatList
                data={payments}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={styles.paymentObjectsContainer}
                renderItem={({ item }) => {
                    return (

                        <View style={styles.paymentObject}>


                            <View style={styles.transactionIdContainer}>
                                <Text style={styles.transactionIdHeader}>Transaction ID</Text>
                                <Text style={styles.transactionIdNumber}>{item?.transaction_id}</Text>
                            </View>


                            <View style={styles.metadataContainer}>
                                <View style={styles.metadataItemContainer}>
                                    <Text style={styles.metadataAttribute}>Name</Text>
                                    <Text style={styles.metadataAttributeValue}>{item?.user?.name}</Text>
                                </View>
                                <View style={styles.metadataItemContainer}>
                                    <Text style={styles.metadataAttribute}>Bus number</Text>
                                    <Text style={styles.metadataAttributeValue}>{item?.bus?.number}</Text>
                                </View>
                                <View style={styles.metadataItemContainer}>
                                    <Text style={styles.metadataAttribute}>Payment method</Text>
                                    <Text style={styles.metadataAttributeValue}>{item?.payment_method}</Text>
                                </View>
                                <View style={styles.metadataItemContainer}>
                                    <Text style={styles.metadataAttribute}>Card type</Text>
                                    <Text style={styles.metadataAttributeValue}>{item?.card_brand}</Text>
                                </View>
                                <View style={styles.metadataItemContainer}>
                                    <Text style={styles.metadataAttribute}>Card number</Text>
                                    <Text style={styles.metadataAttributeValue}>•••• •••• •••• {item?.card_last4}</Text>
                                </View>
                            </View>



                            <View style={styles.paymentBottomContainer}>
                                <View style={styles.amountContainer}>
                                    <Text style={styles.amountTextHeader}>Amount</Text>
                                    <Text style={styles.amount}>INR {item?.amount}</Text>
                                </View>
                                <View style={styles.paymentDateContainer}>
                                    <Text style={styles.paymentDateHeader}>Payment date</Text>
                                    <Text style={styles.paymentDate}>{getFormattedDate(item.payment_date)}</Text>
                                </View>
                            </View>



                        </View>
                    )
                }}

            />}


            {!(payments?.length > 0) && !loadingPayments && <View style={styles.noPaymentsContainer}>
                <Text style={{ color: '#6f6f6f' }}>There is nothing here.</Text>
            </View>}

            {loadingPayments && <View style={styles.noPaymentsContainer}>
                <ActivityIndicator size={"large"} color={"#cf8300"} />
            </View>}



        </>
    )
}

export default LatestPayments

const styles = StyleSheet.create({

    shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 999,
    },


    paymentsContainer: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },


    paymentsContainerTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },


    paymentsContainerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4f4f4f'
    },

    paymentObjectsContainer: {
        marginTop: 5,
        backgroundColor: '#ffffff',
        flex: 1,

    },

    noPaymentsContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },


    paymentObject: {
        borderWidth: 1,
        borderColor: '#f1dab3',
        backgroundColor: '#fefee6',
        width: Dimensions.get("window").width - 40,
        padding: 15,
        marginRight: 10,
    },


    transactionIdHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#8f8f8f'
    },

    transactionIdNumber: {
        marginTop: -3,
        fontWeight: '600',
        color: '#8f8f8f'

    },

    metadataContainer: {
        marginVertical: 10,
        // backgroundColor: '#fafafa',
        padding: 2,
        borderRadius: 2,
    },

    metadataItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2
    },

    paymentBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    amountTextHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#8f8f8f'
    },

    amount: {
        marginTop: -3,
        fontWeight: '400',
        fontSize: 16,
        color: '#8f8f8f'
    },

    metadataAttribute: {
        fontWeight: 'bold',
        color: '#8f8f8f'
    },

    metadataAttributeValue: {
        fontWeight: '500',
        color: '#8f8f8f'
    },

    paymentDateHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#8f8f8f',
        textAlign: 'right'
    },

    paymentDate: {
        marginTop: -3,
        fontWeight: '400',
        fontSize: 16,
        color: '#8f8f8f',
        textAlign: 'right'

    }



})