import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from "../constants/Colors";

const MapScreen = (props) => {

    const { navigation } = props;

    const [selectedCoordinate, setSelectedCoordinate] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const onMapPressHandler = (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const long = event.nativeEvent.coordinate.longitude;
        setSelectedCoordinate({latitude: lat, longitude: long});
    }

    const onSaveButtonHandler = useCallback(() => {
        if(!selectedCoordinate) {
            return;
        }
        navigation.navigate('NewPlace', { pickedLocation: selectedCoordinate});
    }, [selectedCoordinate]);

    useEffect(() => {
        navigation.setParams({saveLocation: onSaveButtonHandler});
    }, [onSaveButtonHandler]);

    return(
        <MapView style={styles.mapScreen} region={mapRegion} onPress={onMapPressHandler}>
            {selectedCoordinate && <Marker coordinate={selectedCoordinate} /> }
        </MapView>
    )
};

MapScreen.navigationOptions = navData => {

    const saveFn = navData.navigation.getParam('saveLocation');

    return {
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mapScreen: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;