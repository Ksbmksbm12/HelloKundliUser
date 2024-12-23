import * as actionTypes from '../actionTypes'

const initialState = {
    linkedProfileData: null,
    chatData: [],
    requestedData: null,
    chatTimerCountDown: 0,
    chatImageData: null,
    callInvoiceVisble: false,
    videocallInvoiceVisble: false,
    callInvoiceData: null,
    chatInvoiceVisble: false,
    chatInvoiceData: null,
    chatcallData: null,
    videocallendData:null,
    videoinvoiceData:null,
    deleteLinkedData:null,
    astrologerCallData:null,
    AudiocallendData:null,
    generateIdData:null,
    cameraVisibleChat: false,
    chatCameraHand : null
}

const chat = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_LINKED_PROFILE:
            return {
                ...state,
                linkedProfileData: payload
            }
        case actionTypes.SET_CHAT_DATA:
            return {
                ...state,
                chatData: payload
            }
        case actionTypes.SET_CHAT_REQUESTED_DATA:
            return {
                ...state,
                requestedData: payload
            }
        case actionTypes.SET_CHAT_TIMER_COUNTDOWN:
            return {
                ...state,
                chatTimerCountDown: payload
            }
        case actionTypes.SET_CHAT_IMAGE_DATA:
            return {
                ...state,
                chatImageData: payload
            }
        case actionTypes.SET_CALL_INVOICE_DATA:
            return {
                ...state,
                callInvoiceData: payload
            }
        case actionTypes.SET_CALL_INVOICE_VISIBLE:
            return {
                ...state,
                callInvoiceVisble: payload
            }
            case actionTypes.SET_VIDEOCALL_INVOICE_VISIBLE:
                return {
                    ...state,
                    videocallInvoiceVisble: payload
                }
        case actionTypes.SET_CHAT_INVOICE_DATA:
            return {
                ...state,
                chatInvoiceData: payload
            }
        case actionTypes.SET_CHAT_INVOICE_VISIBLE:
            return {
                ...state,
                chatInvoiceVisble: payload
            }
        case actionTypes.SET_CHAT_CALL_DATA_SAVE:
            return {
                ...state,
                chatcallData: payload
            }
            case actionTypes.SET_ON_VIDEO_CALL_END:
                return {
                    ...state,
                    videocallendData: payload
                }
                case actionTypes.SET_ON_AUDIO_CALL_END:
                    return {
                        ...state,
                        AudiocallendData: payload
                    }
                case actionTypes.SET_VIDEO_INVOICE_DATA:
                    return {
                        ...state,
                        videoinvoiceData: payload
                    }
                    case actionTypes.SET_LINKED_DATA:
                        return {
                            ...state,
                            deleteLinkedData: payload
                        }
                    case actionTypes.SET_ASTROLOGER_CALL: 
                        return {
                            ...state,
                            astrologerCallData: payload
                        }
                        case actionTypes.SET_GENERATEID_DATA: 
                        return {
                            ...state,
                            generateIdData: payload
                        }
                        case actionTypes.SET_CAMERA_CHAT_VISION:
                            return {
                                ...state,
                                cameraVisibleChat: payload
                            }
                        case actionTypes.SET_CAMERA_CHAT_HAND:
                            return {
                                ...state,
                                chatCameraHand: payload
                            }
                    default: {
            return state;
        }
    }

}

export default chat;