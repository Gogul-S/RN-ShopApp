import React from 'react';
import { StyleSheet, FlatList, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductOverviewItem from '../../components/Shop/ProductOverviewItem';
import * as cartActions from './../../store/actions/cart';
import ScorpionHeaderButton from '../../components/UI/HeaderButton';
import Colors from './../../constants/Colors';

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const onProductClickHandler = (id, title) => {
        props.navigation.navigate({ routeName: 'productDetails', params: { productId: id, productTitle: title } })
    }
    return (
        <View style={styles.productList}>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <ProductOverviewItem
                        title={itemData.item.title}
                        image={itemData.item.imageUrl}
                        price={itemData.item.price}
                        onProductClick={() => {
                            onProductClickHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button color={Colors.primary} title="View Details" onPress={() => {
                            onProductClickHandler(itemData.item.id, itemData.item.title)
                        }} />
                        <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }} />
                    </ProductOverviewItem>
                }
                style={{ flex: 1 }} />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
                <Item title='Cart' iconName='md-cart' onPress={
                    () => { navData.navigation.navigate('cart') }
                } />
            </HeaderButtons >,
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
                <Item title="Menu"
                    iconName='md-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }} />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    productList: {
        flex: 1,
    }
})

export default ProductsOverviewScreen;