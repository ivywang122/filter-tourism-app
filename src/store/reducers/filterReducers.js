import actionTypes from '../actionTypes'

const reducers = {
  [actionTypes.updateZoneTag]: (state, action) => {
    // console.log(action.payload.isTagsOn)
    return Object.assign({}, state, {
      zoneTags: action.payload.tags,
      isTagsOn: action.payload.isTagsOn
    });

  },

  [actionTypes.updateCateTag]: (state, action) => {
    return Object.assign({}, state, {
      cateTags: action.payload.tags,
      isTagsOn: action.payload.isTagsOn
    });
  },

  [actionTypes.updateTicketfreeTag]: (state, action) => {
    return Object.assign({}, state, {
      isFreeTag: action.payload.isFreeTag,
      isTagsOn: action.payload.isTagsOn
    });
  },

  [actionTypes.updateOpentimeTag]: (state, action) => {
    return state
  }

  
}

export default function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    if (reducers.hasOwnProperty(action.type))
      return reducers[action.type](state, action)
    else return state
  }
}