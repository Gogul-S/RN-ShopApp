import React, { useState,useCallback,useEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector,useDispatch } from 'react-redux'
import * as ProductActions from './../../store/actions/products'

import ScorpionHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../../constants/Colors';

const EditProductScreen = (props) => {
    

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))

    const [title, setTitle] = useState(selectedProduct ? selectedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(selectedProduct ? selectedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState(selectedProduct ? selectedProduct.description : '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(
        () => {
            if(selectedProduct) {
                dispatch(ProductActions.updateProduct(productId,title,desc,imageUrl))
            } else{
                dispatch(ProductActions.createProduct(title,desc,+price,imageUrl))
            }
            props.navigation.goBack();
        },[dispatch, title,imageUrl,price,desc])

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
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
                </View>
                {selectedProduct ? null
                    : <View style={styles.formControl}>
                        <Text style={styles.label}>PRICE</Text>
                        <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
                    </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput style={styles.input} value={desc} onChangeText={text => setDesc(text)} />
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