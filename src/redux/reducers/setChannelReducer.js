import * as actionTypes from '../action/type';

const channel = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:

    return action.data;

    default:
      return state
}}

export default channel;