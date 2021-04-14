import {UPDATE, RESET} from '../actions/actionTypes';

  const settingsState = {
    delay: 0, 
    duration: 0, 
    photoMod: true,
    showSettings: false
  }

  const settingState = (settings = settingsState, action) => {
    switch (action.type) {
      case UPDATE:
        return {...settings, delay: action.payload.delay, duration: action.payload.duration, photoMod: action.payload.photoMod, showSettings: action.payload.showSettings};
      case RESET:
      return {...settings, showSettings: false};
      default:
        return settings
    }
  }

  export default settingState;