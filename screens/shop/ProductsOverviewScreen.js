import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductOverviewItem from "../../components/Shop/ProductOverviewItem";
import * as cartActions from "./../../store/actions/cart";
import ScorpionHeaderButton from "../../components/UI/HeaderButton";
import Colors from "./../../constants/Colors";
import * as ProductActions from "./../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const onProductClickHandler = (id, title) => {
    props.navigation.navigate("productDetails", {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    try {
      await dispatch(ProductActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setRefreshing(false);
  }, [dispatch]);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", loadProducts);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadProducts]);

  useEffect(() => {
    setLoading(true);
    loadProducts().then(() => {
      setLoading(false);
    });
  }, [loadProducts]);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{error}</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!loading && products && products.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No Data Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.productList}>
      <FlatList
        data={products}
        onRefresh={loadProducts}
        refreshing={refreshing}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductOverviewItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            onProductClick={() => {
              onProductClickHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                onProductClickHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="Add to Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductOverviewItem>
        )}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export const productOverviewScreenOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("cart");
          }}
        />
      </HeaderButtons>
    ),
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
  };
};

const styles = StyleSheet.create({
  productList: {
    flex: 1,
  },
});

export default ProductsOverviewScreen;
