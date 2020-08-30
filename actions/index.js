import * as FileSystem from 'expo-file-system';

import {ADD_PLACE_ACTION_TYPE} from "./type";

export const addPlace = (place) => async dispatch => {
    const fileExt = place.image.split('/').pop().split('.');
    const path = `${FileSystem.documentDirectory}GP-${Date.now()}.${fileExt}`;

    try {
        await FileSystem.moveAsync({from: place.image, to: path});

        place.image = path;
    } catch (err) {
        Alert.alert('Something went wrong!', 'When we were trying to save the image you have taken something went wrong in saving it.', [{text: 'Okay!'}]);
        return;
    }

    dispatch({
        type: ADD_PLACE_ACTION_TYPE,
        payload: place
    });
};