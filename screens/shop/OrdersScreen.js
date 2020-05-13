import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ScorpionHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "./../../components/Shop/OrderItem";
import * as OrderActions from "./../../store/actions/orders";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    setLoading(true);
    await dispatch(OrderActions.fetchOrders());
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          orderDate={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    unmountOnBlur: true,
  };
};

const styles = StyleSheet.create({});

export default OrdersScreen;
