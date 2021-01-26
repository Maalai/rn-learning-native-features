import { put } from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';
import { GET_PLACES_SUCCESS } from '../actions/places-action';
import { fetchPlaces } from '../helpers/db';

export default function* getPlacesSaga(action) {
    try {
        const result = yield fetchPlaces();
        yield put({
            type: GET_PLACES_SUCCESS,
            places: result.rows._array,
        });
    } catch (e) {
        console.log(e);
    }
}