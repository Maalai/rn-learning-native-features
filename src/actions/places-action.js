export const ADD_PLACE = 'ADD_PLACE';
export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const GET_PLACES = 'GET_PLACES';
export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';

export const addPlace = (title, image, location) => {
    return { type: ADD_PLACE, placeData: { title: title, image: image, location: location}}
}

export const fetchPlaces = () => {
    return { type: GET_PLACES, places: []};
}