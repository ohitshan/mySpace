import {
  POST_PRODUCT,
  Edit_POST
} from '../_actions/types';

export default function (prevstate = {}, action) {
  switch (action.type) {
    case POST_PRODUCT:
      return { ...prevstate, post: action.payload }
      break;

    case Edit_POST:
      return { ...prevstate, post: action.payload }
      break;


    default:
      return prevstate;
  }
}