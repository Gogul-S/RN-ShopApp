import React from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/Shop/CartItem';
import * as cartActions from './../../store/actions/cart'
import * as ordersActions from './../../store/actions/orders'

const CartScreen = (props) => {

    const dispatch = useDispatch();

    const cartTotalPrice = useSelector(state => state.cart.totalPrice)
    const cartItems = useSelector(state => {
        const tranformedItems = [];
        for (const key in state.cart.items) {
            tranformedItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return tranformedItems.sort((p1, p2) =>  p1.productId > p2.productId ? 1 : -1);
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.totalLabel}>Total : <Text style={styles.totalValue}>₹ {cartTotalPrice.toFixed(2)}</Text></Text>
                <Button color={Colors.primary} title='Order Now' disabled={cartItems.length == 0} onPress = { () => {dispatch(ordersActions.addOrder(cartItems,cartTotalPrice.toFixed(2)))}}/>
            </View>
            <FlatList data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => {
                    return (
                        <CartItem
                            title={itemData.item.productTitle}
                            amount={itemData.item.productPrice}
                            quantity={itemData.item.quantity}
                            amount={itemData.item.sum}
                            deletable
                            onRemove={() => { dispatch(cartActions.removeFromCart(itemData.item.productId)) }}
                        />
                    )
                }
                } />
        </View>


    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10
    },
    totalLabel: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    totalValue: {
        color: 'red'
    }
})

export default CartScreen;