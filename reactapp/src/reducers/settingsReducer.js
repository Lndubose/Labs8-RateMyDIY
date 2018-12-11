import {
  GETTING_USERNAME,
  GOT_USERNAME,
  GET_USERNAME_ERROR,
  GETTING_PROFILE_PIC,
  GOT_PROFILE_PIC,
  GET_PROFILE_PIC_ERROR,
  GETTING_THUMBNAIL,
  GOT_THUMBNAIL,
  GET_THUMBNAIL_ERROR
} from "../actions";

const initialState = {
  gettingUsername: false,
  username: '',
  username_error: null,
  gettingProfilePic: false,
  img_url: null,
  profilepic_error: null,
  gettingThumbnail: false,
  profile_thumbnail: null,
  tile_thumbnail: null,
  thumbnail_error: null
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // get userInfo
    case GETTING_USERNAME:
      return { ...state, gettingUsername: true };

    case GOT_USERNAME:
      return {
        ...state,
        gettingUsername: false,
        username: action.payload
      };

    case GET_USERNAME_ERROR:
      return {
        ...state,
        gettingUserInfo: false,
        username_error: action.payload
      };

    case GETTING_PROFILE_PIC:
      return { ...state, gettingProfilePic: true };

    case GOT_PROFILE_PIC:
      return {
        ...state,
        gettingProfilePic: false,
        img_url: action.payload
      }
    
    case GET_PROFILE_PIC_ERROR:
      return {
        ...state,
        gettingProfilePic: false,
        profilepic_error: action.payload
      }
    
    case GETTING_THUMBNAIL:
      return {
        ...state, gettingThumbnail: true
      }

    case GOT_THUMBNAIL:
      return {
        ...state, 
        gettingThumbnail: false,
        [`${action.payload.size}_thumbnail`]: action.payload.data
      }

    case GET_THUMBNAIL_ERROR:
      return {
        ...state, 
        gettingThumbnail: false,
        thumbnail_error: action.payload
      }

    default:
      return state;
  }
};

export default settingsReducer;
