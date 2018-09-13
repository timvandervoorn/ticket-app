import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import ReduxThunk from "redux-thunk"
import { storeJwt } from "./middleware"
import reducers from "./reducers"

const reducer = combineReducers(reducers)

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const enhancer = compose(
  applyMiddleware(ReduxThunk, storeJwt),
  devTools
)

const store = createStore(reducer, enhancer)

// when JWT was coming from localStorage, connect via websockets
const initialCurrentUser = store.getState().currentUser

export default store
