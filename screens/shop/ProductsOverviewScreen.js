import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductOverviewItem from '../../components/Shop/ProductOverviewItem';
import * as cartActions from './../../store/actions/cart';
import ScorpionHeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
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
                        viewDetailHandler={() => { props.navigation.navigate({ routeName: 'productDetails', params: { productId: itemData.item.id, productTitle: itemData.item.title } }) }}
                        addToCartHandler={() => { dispatch(cartActions.addToCart(itemData.item)) }}
                    />
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
            </HeaderButtons >
    }
}

const styles = StyleSheet.create({
    productList: {
        flex: 1,
    }
})

export default ProductsOverviewScreen;