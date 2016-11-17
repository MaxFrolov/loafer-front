import React, { Component, PropTypes } from 'react'
// components
import FilterOptions from './FilterOptions'
import DashboardHeader from './DashboardHeader'
import { asyncConnect } from 'redux-async-connect'
// constants
import { filterFields } from './constants'

@asyncConnect([
  { key: 'events', promise: ({ helpers }) => helpers.client.get('/events') }
])
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  constructor(props) {
    super(...props)

    this.state = {
      filterOptions: {
        planned: false,
        all: false,
        my: false,
        circle: false,
        recommended: false
      }
    }
  }

  changeValue(e) {
    const { filterOptions } = this.state
    const target = e.target
    filterOptions[target.name] = e.target.checked
    this.setState({ filterOptions: filterOptions })
  }

  render () {
    const { filterOptions } = this.state
    return (
      <div>
        <div className="container">
          <h1 className="text-center mb-20">Поиск событий</h1>
          <div className="row">
            <DashboardHeader />
            <div className="col-sm-9">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="container-fluid">
                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h5>Фильтры по спискам друзей:</h5>
                  <FilterOptions
                    changeValue={::this.changeValue}
                    filterOptions={filterOptions}
                    filterFields={filterFields} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
