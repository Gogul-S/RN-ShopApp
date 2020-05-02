import React from 'react';
import { View, StyleSheet, Image, Text, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const ProductOverviewItem = (props) => {

    let TouchableComp = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }


    return (
        <View style={styles.product}>
            <TouchableComp onPress={props.viewDetailHandler} useForeground>
                <View style = {styles.touchable}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.image }} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>₹ {props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button color={Colors.primary} title="View Details" onPress={props.viewDetailHandler} />
                        <Button color={Colors.primary} title="Add to Cart" onPress={props.addToCartHandler} />
                    </View>
                </View>
            </TouchableComp>
        </View >
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        

    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        width: '100%',
        height: '60%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 20,
        marginVertical: 4
    },
    details: {
        height: '15%',
        alignItems: 'center'
    },
    price: {
        color: '#888',
        fontSize: 14
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    }
});

export default ProductOverviewItem;