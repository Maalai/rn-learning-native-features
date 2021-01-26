import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const PlaceDetailsScreen = (props) => {
    return(
        <View>
            <Text>Place Details Screen</Text>
        </View>
    )
};

PlaceDetailsScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('placeTitle');
    return {
        headerTitle: title
    };
};

const styles = StyleSheet.create({

});

export default PlaceDetailsScreen;