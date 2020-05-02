import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen';

const ProductsNavigator = createStackNavigator({
    productsOverview: {
        screen: ProductsOverviewScreen,
        navigationOptions: {
            headerTitle: 'Products',
        }
    },
    productDetails: {
        screen: ProductDetailScreen
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ProductsNavigator);