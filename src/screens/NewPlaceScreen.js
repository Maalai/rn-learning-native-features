import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as placesAction from '../actions/places-action';
import ImgPicker from '../components/ImagePicker';

const NewPlaceScreen = (props) => {

    const { navigation } = props;

    const [ enteredTitle, setEnteredTitle ] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        setEnteredTitle(text);
    }

    const savePlaceHandler = () => {
        dispatch(placesAction.addPlace(enteredTitle, selectedImage));
        navigation.goBack();
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    return(
        <ScrollView>
            <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.textInput} value={enteredTitle} onChangeText={titleChangeHandler}/>
            <ImgPicker onImageTaken={imageTakenHandler}/>
            <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
      fontSize: 18,
      marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;