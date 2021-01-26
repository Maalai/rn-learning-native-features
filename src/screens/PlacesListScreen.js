import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButtonComponent from '../components/HeaderButtonComponent';
import PlaceItem from '../components/PlaceItem';
import { fetchPlaces } from '../actions/places-action';

const PlacesListScreen = (props) => {

    const { navigation } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlaces());
    },[dispatch]);

    const places = useSelector(state => state.places.places);

    return(
       <FlatList data={places} keyExtractor={item => item.id} renderItem={itemData => <PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={null} onSelect={() => {
           navigation.navigate('PlaceDetails', { placeTitle: itemData.item.title, placeId: itemData.item.id});
       }}/>}/>
    )
};

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () =>  (<HeaderButtons HeaderButtonComponent={CustomHeaderButtonComponent}>
            <Item title='Add Place' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => {
                navData.navigation.navigate('NewPlace');
            }} />
        </HeaderButtons>)
    }
}

const styles = StyleSheet.create({

});

export default PlacesListScreen;