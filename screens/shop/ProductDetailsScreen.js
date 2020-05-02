import React from 'react'
import { View, StyleSheet, ScrollView, Text, Image, Button } from 'react-native'
import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId))

    return (
        <View>
            <Text>{product.title}</Text>
        </View>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({

})

export default ProductDetailScreen;