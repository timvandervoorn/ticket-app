import * as request from "superagent"
import { baseUrl } from "../constants"
import { isExpired } from "../jwt"

export const ADD_USER = "ADD_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_USERS = "UPDATE_USERS"

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED"

export const USER_LOGOUT = "USER_LOGOUT"

export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS"
export const USER_SIGNUP_FAILED = "USER_SIGNUP_FAILED"

export const GET_SINGLE_CUSTOMER = "GET_SINGLE_CUSTOMER"
export const UPDATE_CUSTOMERS = "UPDATE_CUSTOMERS"

export const logout = () => ({
  type: USER_LOGOUT
})

const userLoginSuccess = login => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  payload: error || "Unknown error"
})

const userSignupFailed = error => ({
  type: USER_SIGNUP_FAILED,
  payload: error || "Unknown error"
})

const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const updateUsers = users => ({
  type: UPDATE_USERS,
  payload: users
})

const updateCustomer = customer => ({
  type: GET_SINGLE_CUSTOMER,
  payload: customer
})

const updateCustomers = customers => ({
  type: UPDATE_CUSTOMERS,
  payload: customers
})

export const login = (email, password) => dispatch =>
  request
    .post(`${baseUrl}/logins`)
    .send({ email, password })
    .then(result => dispatch(userLoginSuccess(result.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
      } else {
        console.error(err)
      }
    })

export const getSingleCustomer = userId => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .get(`${baseUrl}/users/customer/${userId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(updateCustomer(result.body)))
    .catch(err => console.error(err))
}

export const getCustomers = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .get(`${baseUrl}/customers`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => {
      dispatch(updateCustomers(result.body))
    })
    .catch(err => console.error(err))
}

export const signup = (
  firstName,
  lastName,
  phoneNum,
  email,
  password
) => dispatch => {
  request
    .post(`${baseUrl}/users`)
    .send({ firstName, lastName, phoneNum, email, password })
    .then(result => {
      dispatch(userSignupSuccess())
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch(userSignupFailed(err.response.body.message))
      } else {
        console.error(err)
      }
    })
}

export const getUsers = () => dispatch => {
  request
    .get(`${baseUrl}/users`)
    .then(result => {
      dispatch(updateUsers(result.body))
    })
    .catch(err => console.error(err))
}
