import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createReducer from './reducers'


export default function configureStore(history, initialState) {

  // devToolsEnhacer: to see redux actions log on console
  const logger = createLogger({ collapsed: true })

  // In development, use the chorme's Redux dev tools extension if installed
  const devReduxTools = []
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    devReduxTools.push(window.devToolsExtension())
  }

  // Add variety tasks
  const middleWare = applyMiddleware(thunk, routerMiddleware(history), logger)
 
  // Create rootReducer
  const rootReducer = combineReducers({
    filter: createReducer.filterReducers({}),
    page: createReducer.pageReducers({}),
    info: createReducer.infoReducers({})
  })

  const reducers = connectRouter(history)(rootReducer)

  // output
  return createStore(
    reducers,
    initialState,
    compose(middleWare, ...devReduxTools)
  )

}