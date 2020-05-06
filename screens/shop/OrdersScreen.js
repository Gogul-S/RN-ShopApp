import React from 'react';
import { FlatList, Text,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ScorpionHeaderButton from '../../components/UI/HeaderButton';


const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList
            data={orders}
            renderItem={itemData =>
                <Text>{itemData.item.totalAmount}</Text>
            }
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return ({
        headerTitle: 'Your Orders',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
                <Item title="Menu"
                    iconName='md-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }} />
            </HeaderButtons>
    })
}

const styles = StyleSheet.create({

})

export default OrdersScreen;