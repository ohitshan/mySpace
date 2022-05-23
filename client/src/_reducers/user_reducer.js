import { STATES } from 'mongoose';
import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  ADD_TO_FAVORITES,
  GET_FAVORITES
} from '../_actions/types';

export default function (prevstate = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...prevstate, register: action.payload }
      break;

    case LOGIN_USER:
      return { ...prevstate, loginSuccess: action.payload }
      break;

    case AUTH_USER:
      return { ...prevstate, userData: action.payload }
      break;

    case ADD_TO_FAVORITES:
      return { ...prevstate, userData: { ...prevstate.userData, favorites: action.payload.favorites } }
      break;

    case GET_FAVORITES:
      return { ...prevstate, favoritesDetails: action.payload }
      break;

    default:
      return prevstate;
  }
}