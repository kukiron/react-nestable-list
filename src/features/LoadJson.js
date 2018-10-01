import React, { Component } from "react"
import { connect } from "react-redux"

import { updateList } from "../actions"
import { formatData, loadFromLocalStorage, isJson } from "../tools/utils"

class LoadJson extends Component {
  state = { list: [] }

  handleFile = e => {
    const obj = JSON.parse(e.target.result)
    const employeeList = formatData(obj)
    this.setState({ list: employeeList }, () => {
      this.props.updateList(this.state.list)
    })
  }

  handleChangeFile = e => {
    const fr = new FileReader()
    const uploadedFile = e.target.files[0]

    if (isJson(uploadedFile.name)) {
      fr.onload = this.handleFile
      fr.readAsText(uploadedFile)
    } else {
      alert("Please upload a JSON file")
    }
  }

  handleClick = () => {
    const list = loadFromLocalStorage()
    this.props.onListChange(list)
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <label className="btn btn-raised d-flex justify-content-center align-items-center">
          <i className="material-icons mr-2">cloud_upload</i>
          <input
            className="d-none"
            type="file"
            name="collapsed"
            onChange={this.handleChangeFile}
          />
          Custom Upload
        </label>
        <br />
        <button
          className="btn btn-raised btn-primary d-flex justify-content-center align-items-center"
          onClick={this.handleClick}
        >
          Update
          <i className="ml-1 material-icons">play_arrow</i>
        </button>
      </div>
    )
  }
}

export default connect(
  null,
  { updateList }
)(LoadJson)
