export const UPDATE_LIST = "update_list"
export const FETCH_LIST = "employee_list"
export const REMOVE_LIST = "remove_list"

export const updateList = list => {
  const uploadedFile = JSON.stringify(list)
  localStorage.setItem("employeeList", uploadedFile)
  return {
    type: UPDATE_LIST,
    payload: list
  }
}

export const removeList = () => {
  localStorage.removeItem("employeeList")
  return {
    type: REMOVE_LIST,
    payload: []
  }
}
