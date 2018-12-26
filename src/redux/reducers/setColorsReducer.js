import * as actionTypes from '../action/type';

const initialColorsState = {
  primary: '#4c3c4c',
  secondary: '#eee'
}
const setColors =(state=initialColorsState, action) =>{
  switch (action.type){
    case actionTypes.SET_COLORS:
      return{
        primary: action.data.primary,
        secondary:action.data.secondary
      }
      default: 
      return state;
  }
}
export default setColors;