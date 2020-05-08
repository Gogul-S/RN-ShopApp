import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import CartItem from './CartItem';
import Strings from '../../constants/Strings';
import Colors from '../../constants/Colors';

const OrderItem = (props) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amountStyle}>{Strings.INR_CURRENCY + props.amount}</Text>
                <Text style={styles.dateStyle}>{props.orderDate}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails? 'Hide Details': 'Show Details'} onPress={() => {
                setShowDetails(prevState => !prevState)
            }} />
            {showDetails && <View style={styles.itemList}>
                {props.items.map(cartItem => <CartItem key={cartItem.productId} quantity = {cartItem.quantity} amount = {cartItem.productPrice} title = {cartItem.productTitle}  />)}
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 15,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amountStyle: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'red'
    },
    dateStyle: {
        fontFamily: 'open-sans',
        fontSize: 16
    },
    itemList: {
        width: '100%'
    }
})

export default OrderItem;
