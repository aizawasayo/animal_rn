import Cookies from '@react-native-community/cookies';

const TokenKey = 'animal_home_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.clearByName(TokenKey)
}

export function getUserId() {
  return Cookies.get('userId')
}

export function setUserId(userId) {
  return Cookies.set('userId', userId)
}

export function removeUserId() {
  return Cookies.clearByName('userId')
}