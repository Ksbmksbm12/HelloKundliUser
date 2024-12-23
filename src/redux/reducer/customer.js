import * as actionTypes from '../actionTypes';

const initialState = {
  customerData: null,
  followingListData: null,
  rechargeOfferList: null,
  notificationCounts: null,
};

const customer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CUSTOMER_DATA:
      return {
        ...state,
        customerData: payload,
      };
    case actionTypes.SET_FOLLOWING_LIST:
      return {
        ...state,
        followingListData: payload,
      };
    case actionTypes.SET_WALLET_RECHARGE_OFFER_LIST:
      return {
        ...state,
        rechargeOfferList: payload,
      };
      case actionTypes.SET_NOTIFICATION_COUNTS:
      return {
        ...state,
        notificationCounts: payload,
      };

    default:
      return state;
  }
};

export default customer;
