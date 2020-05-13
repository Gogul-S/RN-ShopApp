import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import * as ProductActions from "./../../store/actions/products";

import ScorpionHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import Input from "./../../components/UI/Input";

const UPDATE_FORM = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === UPDATE_FORM) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputType]: action.value,
    };
    const updatedValidities = {
      ...state.inputsValidity,
      [action.inputType]: action.isValid,
    };
    let isFormValid = true;
    for (const key in updatedValidities) {
      isFormValid = isFormValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputsValidity: updatedValidities,
      formValidity: isFormValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : "",
      imageUrl: selectedProduct ? selectedProduct.imageUrl : "",
      price: "",
      desc: selectedProduct ? selectedProduct.description : "",
    },
    inputsValidity: {
      title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
      desc: selectedProduct ? true : false,
    },
    formValidity: selectedProduct ? true : false,
  });

  const inputChangeHandler = useCallback(
    (inputType, text, inputValidity) => {
      dispatchFormState({
        type: UPDATE_FORM,
        value: text,
        isValid: inputValidity,
        inputType: inputType,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(async () => {
    if (!formState.formValidity) {
      Alert.alert("Invalid Input", "Please Enter a valid input", [
        { text: "Got it!" },
      ]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (selectedProduct) {
        await dispatch(
          ProductActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.desc,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          ProductActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.desc,
            +formState.inputValues.price,
            formState.inputValues.imageUrl
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ title: "Okay" }]);
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="TITLE"
            id="title"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.title : ""}
            initallyValid={selectedProduct ? true : false}
            required
          />

          <Input
            label="IMAGE URL"
            id="imageUrl"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.imageUrl : ""}
            initallyValid={selectedProduct ? true : false}
            required
          />

          {selectedProduct ? null : (
            <Input
              label="PRICE"
              id="price"
              onInputChange={inputChangeHandler}
              keyboardType="decimal-pad"
              required
              min={0.1}
            />
          )}

          <Input
            label="DESCRIPTION"
            id="desc"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            multiline
            numberOfLines={3}
            initialValue={selectedProduct ? selectedProduct.description : ""}
            initallyValid={selectedProduct ? true : false}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunc = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
        <Item title="Menu" iconName="md-checkmark" onPress={submitFunc} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    flex: 1,
  },
});

export default EditProductScreen;
