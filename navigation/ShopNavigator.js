import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';


const defaultNavigationOption = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
}

const ProductsNavigator = createStackNavigator({
    productsOverview: {
        screen: ProductsOverviewScreen,
        navigationOptions: {
            headerTitle: 'Products',
        }
    },
    productDetails: {
        screen: ProductDetailScreen
    },
    cart: {
        screen: CartScreen
    }
}, {
    navigationOptions: {
        drawerIcon : drawerConfig => (
            <Ionicons name = 'md-cart' size = {23} color = {drawerConfig.tintColor}/>
        )
    },
    defaultNavigationOptions: defaultNavigationOption
});

const OrdersNavigator = createStackNavigator({
    orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon : drawerConfig => (
            <Ionicons name = 'md-list' size = {23} color = {drawerConfig.tintColor}/>
        )
    },
    defaultNavigationOptions: defaultNavigationOption
});

const appNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
},
{
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(appNavigator);