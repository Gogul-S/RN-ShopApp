import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'


const ScorpionHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.select({
                ios: Colors.primary,
                android: 'white'
            })}
        />
    )
}

export default ScorpionHeaderButton;