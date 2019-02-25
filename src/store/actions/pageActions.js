import actionTypes from '../actionTypes'
import { push, goBack } from 'connected-react-router'

export function routeToPath(path) {
  return function(dispatch) {
    return dispatch(push(path))
  }
}

export function routeToBack() {
  return function (dispatch) {
    return dispatch(goBack())
  }
}

export function updatePageCount(pageCount) {
  return {
    type: actionTypes.updatePageCount,
    pageCount
  }
}

export function updateItemsList(items) {
  return {
    type: actionTypes.updateItemsList,
    items
  }
}

export function updateItemsTotal(total) {
  return {
    type: actionTypes.updateItemsTotal,
    total
  }
}

