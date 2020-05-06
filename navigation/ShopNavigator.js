import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

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
    defaultNavigationOptions: {
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
});

export default createAppContainer(ProductsNavigator);