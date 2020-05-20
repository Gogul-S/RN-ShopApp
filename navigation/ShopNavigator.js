import React from "react";
import { SafeAreaView, Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import ProductsOverviewScreen, {
  productOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen, { orderScreenOptions } from "../screens/shop/OrdersScreen";
import UserProductScreen, {
  userProductScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, { authScreenOptions } from "../screens/user/AuthScreen";
import LauncherScreen from "../screens/LauncherScreen";

import * as AuthActions from "./../store/actions/auth";

const defaultNavigationOption = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOption}>
      <ProductsStackNavigator.Screen
        name="productsOverview"
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="productDetails"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen name="cart" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOption}>
      <OrdersStackNavigator.Screen
        name="orders"
        component={OrdersScreen}
        options={orderScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions: defaultNavigationOption,
//   }
// );

const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOption}>
      <AdminStackNavigator.Screen
        name="userProducts"
        component={UserProductScreen}
        options={userProductScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};
const AppDrawerNavigator = createDrawerNavigator();

export const RootAppNavigator = (props) => {
  const dispatch = useDispatch();
  return (
    <AppDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 40 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="LOGOUT"
                color={Colors.primary}
                onPress={() => {
                  dispatch(AuthActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <AppDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-cart" size={23} color={props.color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <AppDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-list" size={23} color={props.color} />
          ),
        }}
      />
      <AppDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-create" size={23} color={props.color} />
          ),
        }}
      />
    </AppDrawerNavigator.Navigator>
  );
};
// const AdminNavigator = createStackNavigator(
//   {
//     userProducts: UserProductScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions: defaultNavigationOption,
//   }
// );

// const appNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 40 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title="LOGOUT"
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(AuthActions.logout());
//                 // props.navigation.navigate("Auth");
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOption}>
      <AuthStackNavigator.Screen
        name="authScreen"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     authScreen: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavigationOption,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Launcher: LauncherScreen,
//   Auth: AuthNavigator,
//   App: appNavigator,
// });

// export default createAppContainer(MainNavigator);
