import {combineReducers} from 'redux';

import user from './setUserReducer';
import channel from './setChannelReducer';
import color from './setColorsReducer';

const rootReducer = combineReducers({
  user,
  channel,
  color,
})

export default rootReducer;