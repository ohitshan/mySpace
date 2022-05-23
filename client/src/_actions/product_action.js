import axios from "axios";
import {
  POST_PRODUCT,
  Edit_POST
} from './types';

export function postProduct(dataToSubmit) {

  const request = axios.post(`/api/products/uploadpost`, dataToSubmit)
    .then(response => response.data);

  return {
    type: POST_PRODUCT,
    payload: request
  }
}

export function editPost(dataToSubmit) {

  const request = axios.post(`/api/products/editpost`, dataToSubmit)
    .then(response => response.data);

  return {
    type: Edit_POST,
    payload: request
  }
}

