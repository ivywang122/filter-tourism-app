import actionTypes from '../actionTypes'

const reducers = {
  [actionTypes.setItemInfo]: (state, action) => {
    if(action.item.id !== '') {
      return action.item
    }else return state
  }
}

export default function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    if (reducers.hasOwnProperty(action.type))
      return reducers[action.type](state, action)
    else return state
  }
}