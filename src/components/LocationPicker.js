import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as Locations from 'expo-location';
import * as Permissions from "expo-permissions";
import MapPreview from './MapPreview';

const LocationPicker = (props) => {

    const [pickedLocation, setPickedLocation] = useState();
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const { navigationProp, onLocationPicked } = props;

    const mapPickedLocation = navigationProp.getParam('pickedLocation');

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation({ lat: mapPickedLocation.latitude, lng: mapPickedLocation.longitude});
            onLocationPicked({ lat: mapPickedLocation.latitude, lng: mapPickedLocation.longitude});
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient permissions! You need to grant Location access to use this app', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const onSelectLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }
        setIsFetchingLocation(true);
        try {
            const location = await Locations.getCurrentPositionAsync({
                timeout: 8000
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch(err) {
            Alert.alert('Could not get location.. Please try later or pick a location on the map.', [{text: 'Okay'}]);
        }
        setIsFetchingLocation(false);
    };

    const pickOnMapHandler = () => {
        navigationProp.navigate('Map');
    };

    return (<View style={styles.locationPicker}>
        <MapPreview style={styles.locationPreview} location={pickedLocation}>
            { isFetchingLocation ? <ActivityIndicator size='large' color={Colors.primary}/> : <Text>No location picked yet!!!</Text> }
        </MapPreview>
        <View style={styles.actions}>
            <Button title='Get Location' color={Colors.primary} onPress={onSelectLocationHandler} />
            <Button title='Pick on Map' color={Colors.primary} onPress={pickOnMapHandler} />
        </View>
    </View>)
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    locationPreview: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        height: 200,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;