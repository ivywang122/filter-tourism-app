import actionTypes from '../actionTypes'

export function setItemInfo(item) {
  return {
    type: actionTypes.setItemInfo,
    item
  }
}