import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import Colors from "../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = props => {

    const { onImageTaken } = props;

    const [ previewImage, setPreviewImage ] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient permissions! You need to grant camera access to use this app', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const isAllowedToAccessCamera = await verifyPermissions();
        if(!isAllowedToAccessCamera) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPreviewImage(image.uri);
        onImageTaken(image.uri);
    };

    return(
      <View style={styles.imagePicker}>
          <View style={styles.imagePreview}>
              { !previewImage ? (<Text>No image picked yet.</Text>) :
              <Image style={styles.image} source={{uri: previewImage}}/>}
          </View>
          <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler}/>
      </View>
    );

};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;