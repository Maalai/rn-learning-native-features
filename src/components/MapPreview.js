import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import envConfigs from '../../env';

const MapPreview = (props) => {

    const { location } = props;

    let mapPreviewUrl;

    if(location) {
        mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${envConfigs.googleApiKey}`;
    }

    return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {location ? <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} /> : props.children}
        </View>
    );

};

const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default MapPreview;