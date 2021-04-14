import {TAKEPHOTO, DELETE} from '../actions/actionTypes';
 
 const photos = (photos = [], action) => {
    switch (action.type) {
      case TAKEPHOTO:
        return [...photos, action.payload ];
      case DELETE:
        return photos.filter((photo) => photo !== action.payload);
      default:
        return photos
    }
  }

  
  export default photos;