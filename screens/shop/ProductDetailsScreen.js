import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "./../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export const productDetailScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "open-sans",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    lineHeight: 20,
    fontFamily: "open-sans",
  },
  action: {
    marginVertical: 20,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
