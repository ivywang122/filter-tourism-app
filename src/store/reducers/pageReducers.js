import actionTypes from '../actionTypes'

const reducers = {
  [actionTypes.updatePageCount]: (state, action) => {
    if (state.pageCount >= 0 && state.pageCount !== action.pageCount) {
      return Object.assign({}, state, {
        pageCount: action.pageCount
      });
    }else return state;
  },

  [actionTypes.updateItemsList]: (state, action) => {
    if(state.items) {
      return Object.assign({}, state, {
        items: action.items
      });
    }else return state;
  },

  [actionTypes.updateItemsTotal]: (state, action) => {
    if (state.total >= 0 && state.total !== action.total) {
      return Object.assign({}, state, {
        total: action.total
      });
    } else return state;
  },


}

export default function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    if (reducers.hasOwnProperty(action.type))
      return reducers[action.type](state, action)
    else return state
  }
}