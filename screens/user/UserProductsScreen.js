import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import ProductOverviewItem from './../../components/Shop/ProductOverviewItem'
import { FlatList } from 'react-native-gesture-handler'
import ScorpionHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../../constants/Colors';
import * as ProductActions from './../../store/actions/products'


const UserProductScreen = (props) => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts);

    const editClickHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id })
    }
    return (
        <FlatList data={userProducts} renderItem={itemData => {

            return (
                <ProductOverviewItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onProductClick={() => {
                        editClickHandler(itemData.item.id)
                    }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => {
                        editClickHandler(itemData.item.id)
                    }} />
                    <Button color={Colors.primary} title="Delete" onPress={() => {
                        dispatch(ProductActions.deleteProduct(itemData.item.id))
                    }} />

                </ProductOverviewItem>

            )
        }
        }
        />

    )
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'User Products',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
                <Item title="Menu"
                    iconName='md-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }} />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
                <Item title="Menu"
                    iconName='md-create'
                    onPress={() => { navData.navigation.navigate('EditProduct') }} />
            </HeaderButtons>

    }
}

const styles = StyleSheet.create({

})

export default UserProductScreen;