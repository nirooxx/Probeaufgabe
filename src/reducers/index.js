import { combineReducers } from 'redux';
import photos from './photos';
import settings from './settings'


const initialState = {
    sidebarShow: 'responsive'
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }

const rootReducer = combineReducers({
    nav: changeState,
    photos: photos,
    settings: settings
})

export default rootReducer;