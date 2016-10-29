import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class Search extends Component {

  render () {
    return (
      <div>
        <Helmet title="Search"/>
        <div className="container text-center">
          <h1>
            Search
          </h1>
        </div>
      </div>
    )
  }
}
