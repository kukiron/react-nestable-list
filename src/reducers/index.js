import { combineReducers } from "redux"

import employeeListReducer from "./employeeListReducer"

const rootReducer = combineReducers({
  employeeList: employeeListReducer
})

export default rootReducer
