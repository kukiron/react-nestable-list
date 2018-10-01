import { UPDATE_LIST, REMOVE_LIST } from "../actions"

export default (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_LIST:
      return payload

    case REMOVE_LIST:
      return payload

    default:
      return state
  }
}
