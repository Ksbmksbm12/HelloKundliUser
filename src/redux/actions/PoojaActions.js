import * as actionTypes from '../actionTypes'

export const getPoojaData = payload => ({
    type: actionTypes.GET_POOJA_DATA,
    payload,
})
export const setPoojaData = payload => ({
    type: actionTypes.SET_POOJA_DATA,
    payload,
})
