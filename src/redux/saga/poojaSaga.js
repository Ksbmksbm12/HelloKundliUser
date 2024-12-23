import { put, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, customer_home_banner, get_call_astrologer, get_chat_astrologer, get_pooja, get_video_call_astrologer } from '../../config/constants';

function* getHomeData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const poojaDataResponse = yield getRequest({
            url: api_url + get_pooja,
        })


        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_POOJA_DATA, payload: poojaDataResponse?.pooja })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}
export default function* poojaSaga() {
    yield takeLeading(actionTypes.GET_HOME_DATA, getHomeData);
   
}