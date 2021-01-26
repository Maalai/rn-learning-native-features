import { put } from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';
import { ADD_PLACE_SUCCESS } from '../actions/places-action';
import { insertPlace } from '../helpers/db';

export default function* addPlaceSaga(action) {
    try {
        const fileName = action.placeData.image.split('/').pop();
       const newPath = FileSystem.documentDirectory + fileName;
       yield FileSystem.moveAsync({
           from: action.placeData.image,
           to: newPath
       });
       const result = yield insertPlace(action.placeData.title, newPath, 'Dummy address', 15.6, 12.3);
        yield put({
            type: ADD_PLACE_SUCCESS,
            placeData: { title: action.placeData.title, image: newPath, id: result.insertId},
        });
    } catch (e) {
        console.log(e);
    }
}