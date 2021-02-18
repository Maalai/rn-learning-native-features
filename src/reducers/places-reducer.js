import {ADD_PLACE_SUCCESS, GET_PLACES_SUCCESS} from '../actions/places-action';
import Place from '../models/place';

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE_SUCCESS:
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image);
            return {
                places: state.places.concat(newPlace)
            };
        case GET_PLACES_SUCCESS:
            return {
                places: action.places.map(place => new Place(place.id.toString(), place.title, place.imageUri))
            };
        default:
            return state;

    }
};