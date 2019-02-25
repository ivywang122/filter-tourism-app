import actionTypes from '../actionTypes'

export function updateZoneTag(tags, isTagsOn) {
  let payload = { tags, isTagsOn }
  return {
    type: actionTypes.updateZoneTag,
    payload
  }
}

export function updateCateTag(tags, isTagsOn) {
  let payload = { tags, isTagsOn }

  return {
    type: actionTypes.updateCateTag,
    payload
  }
}

export function updateTicketfreeTag(isFreeTag, isTagsOn) {
  let payload = { isFreeTag, isTagsOn }
  return {
    type: actionTypes.updateTicketfreeTag,
    payload
  }
}

export function updateOpentimeTag(isOpenTag, isTagsOn) {
  let payload = { isOpenTag, isTagsOn }
  return {
    type: actionTypes.updateOpentimeTag,
    payload
  }
}



