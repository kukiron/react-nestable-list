import React, { Component } from "react"
import { connect } from "react-redux"

import "./App.css"
import NestableList from "./features/NestableList"
import LoadJson from "./features/LoadJson"
import { removeList } from "./actions"
import { loadFromLocalStorage } from "./tools/utils"

class App extends Component {
  state = { list: loadFromLocalStorage() }

  handleListChange = list => this.setState({ list })

  renderItem = ({ item, collapseIcon, handler }) => (
    <div className="drag-item">
      {handler}
      {collapseIcon}
      <b>{item.text}</b>: <span>{item.position}</span>
    </div>
  )

  // remove list
  handleClick = () => {
    this.props.removeList()
    setTimeout(() => {
      this.setState({ list: this.props.employeeList })
    }, 0)
  }

  render() {
    const items = this.state.list

    return (
      <div>
        <h3 className="heading text-center py-3">Company Organigram</h3>
        <hr />
        <LoadJson onListChange={this.handleListChange} />
        <br />
        <div>
          {items.length > 0 ? (
            <div>
              <NestableList items={items} renderItem={this.renderItem} />
              <button
                className="btn btn-raised btn-danger w-100 d-flex justify-content-center align-items-center my-5 mx-auto"
                onClick={this.handleClick}
              >
                Clear List
                <i className="ml-2 material-icons">delete</i>
              </button>
            </div>
          ) : (
            <h1 className="text-center p-5">Upload JSON</h1>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ employeeList }) => ({ employeeList })

export default connect(
  mapStateToProps,
  { removeList }
)(App)
