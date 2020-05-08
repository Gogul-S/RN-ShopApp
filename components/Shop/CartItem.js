import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Strings from '../../constants/Strings';

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantityText}>{props.quantity} </Text>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amountText}>{Strings.INR_CURRENCY + props.amount.toFixed(2)}</Text>
                {props.deletable &&
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons name='md-trash' size={23} color='red' />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 20
    },
    quantityText: {
        fontFamily: 'open-sans',
        color: '#888',
    },
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        marginLeft: 15
    },
    amountText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'red'
    }
})

export default CartItem;