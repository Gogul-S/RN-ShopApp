import React, { useCallback, useEffect, useReducer } from 'react'
import { View, StyleSheet, Text, TextInput,Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import * as ProductActions from './../../store/actions/products'

import ScorpionHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../../constants/Colors';

const UPDATE_FORM = 'UPDATE';

const formReducer = (state, action) => {
    if(action.type === UPDATE_FORM) {
        const updatedValues = {
            ...state.inputValues,
            [action.inputType]: action.value
        }
        const updatedValidities = {
            ...state.inputsValidity,
            [action.inputType]: action.isValid
        }
        let isFormValid = true;
        for(const key in updatedValidities) {
            isFormValid = isFormValid && updatedValidities[key]
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputsValidity: updatedValidities,
            formValidity: isFormValid
        }
    }
    return state;
}

const EditProductScreen = (props) => {


    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))

    const dispatch = useDispatch();

    const [formState,dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: selectedProduct ? selectedProduct.title : '',
            imageUrl: selectedProduct ? selectedProduct.imageUrl : '',
            price: '',
            desc: selectedProduct ? selectedProduct.description : '',
        },
        inputsValidity: {
            title: selectedProduct ? true : false,
            imageUrl: selectedProduct ? true : false,
            price: selectedProduct ? true : false,
            desc: selectedProduct ? true : false,
        },
        formValidity: selectedProduct ? true : false
    })


    const textChangeHandler = (inputType,text) => {
        let isValid = false;
        if(text && text.trim().length > 0 ) {
            isValid = true;
        }
        dispatchFormState({
            type: UPDATE_FORM,
            value: text,
            isValid: isValid,
            inputType: inputType
        })
    }

    const submitHandler = useCallback(
        () => {
            if(!formState.formValidity){
                Alert.alert("Invalid Input","Please Enter a valid input",[{text:'Got it!'}])
                return;
            }
            if (selectedProduct) {
                dispatch(ProductActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.desc, formState.inputValues.imageUrl))
            } else {
                dispatch(ProductActions.createProduct(formState.inputValues.title, formState.inputValues.desc, +formState.inputValues.price, formState.inputValues.imageUrl))
            }
            props.navigation.goBack();
        }, [dispatch, formState])

    useEffect(() => {

        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>TITLE</Text>
                    <TextInput autoCapitalize='words' style={styles.input} value={formState.inputValues.title} onChangeText={text => {
                        textChangeHandler('title',text)
                    }
                    } />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput style={styles.input} value={formState.inputValues.imageUrl} onChangeText={text => textChangeHandler('imageUrl',text)} />
                </View>
                {selectedProduct ? null
                    : <View style={styles.formControl}>
                        <Text style={styles.label}>PRICE</Text>
                        <TextInput keyboardType='decimal-pad' style={styles.input} value={formState.inputValues.price} onChangeText={text => textChangeHandler('price',text)} />
                    </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput style={styles.input} value={formState.inputValues.desc} onChangeText={text => textChangeHandler('desc',text)} />
                </View>

            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFunc = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={ScorpionHeaderButton}>
                <Item title="Menu"
                    iconName='md-checkmark'
                    onPress={submitFunc} />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginTop: 20
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen;