import axios from "axios";
import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  ADD_TO_FAVORITES,
  GET_FAVORITES
} from './types';

export function registerUser(dataToSubmit) {

  const request = axios.post(`/api/users/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function loginUser(dataToSubmit) {

  const request = axios.post(`/api/users/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function auth() {

  const request = axios.get(`/api/users/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  }
}

export function addToFavorites(id) {

  let body = {
    postId: id
  }

  const request = axios.post(`/api/users/addToFavorites`, body)
    .then(response => response.data.userInfo)

  return {
    type: ADD_TO_FAVORITES,
    payload: request
  }

}

export function getFavorites(myFavorites, favoritesLists) {
  const request = axios.get(`/api/products/post_by_id?id=${myFavorites}&type=array`)
    .then(response => response.data)

  return {
    type: GET_FAVORITES,
    payload: request
  }
}