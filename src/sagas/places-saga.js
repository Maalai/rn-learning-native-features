import { takeLatest } from 'redux-saga/effects';
import { ADD_PLACE, GET_PLACES } from '../actions/places-action';
import addPlaceSaga from './add-place-saga';
import getPlacesSaga from './get-places-saga';

export default function* placesSaga() {
    yield takeLatest(ADD_PLACE, addPlaceSaga);
    yield takeLatest(GET_PLACES,getPlacesSaga);
}