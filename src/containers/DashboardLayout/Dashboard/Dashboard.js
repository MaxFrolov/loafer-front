import React, { Component, PropTypes } from 'react'
import GoogleMap from 'google-map-react'
import TestMarker from './test'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { NavItem, Nav, Tab } from 'react-bootstrap'

export default class Dashboard extends Component {
  static defaultProps = {
    center: { lat: 49, lng: 32 },
    zoom: 9,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
  };

  static propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.object
  };

  constructor(props) {
    super(...props)

    this.state = {
      value: false,
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
    }
  }

  handleChange (key, e) {
    this.setState({ [key]: e.target.value })
  }

  lessThanEndDate (date) {
    return date < this.state.endDate
  }

  greaterThanStartDate (date) {
    return date > this.state.startDate
  }

  render () {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <div className="sidebar sidebar-main text-left" style={{ marginTop: '75px' }}>
                <div className="sidebar-content">
                  <div className="sidebar-category sidebar-category-visible">
                    <div className="category-content no-padding">
                      <Tab.Container defaultActiveKey={1} id="left-tabs-example">
                        <Nav className="navigation navigation-main navigation-accordion">
                          <NavItem eventKey={1}>
                            <i className="fa fa-home" />
                            <span> Карта встреч</span>
                          </NavItem>
                          <NavItem eventKey={2}>
                            <i className="fa fa-home" />
                            <span> Список встреч</span>
                          </NavItem>
                          <NavItem eventKey={3}>
                            <i className="fa fa-home" />
                            <span> Друзья</span>
                          </NavItem>
                        </Nav>
                      </Tab.Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <h1>
                Dashboard
              </h1>
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-8">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="date-period">
                                <DatePicker
                                  selected={this.state.startDate}
                                  startDate={this.state.startDate}
                                  endDate={this.state.endDate}
                                  filterDate={::this.lessThanEndDate}
                                  className="form-control"
                                  onChange={this.handleChange.bind(this, 'startDate')} />
                                <span className="dash ml-10 mr-10">—</span>
                                <DatePicker
                                  selected={this.state.endDate}
                                  startDate={this.state.startDate}
                                  endDate={this.state.endDate}
                                  filterDate={::this.greaterThanStartDate}
                                  className="form-control"
                                  onChange={this.handleChange.bind(this, 'endDate')} />
                                <i className="fa fa-calendar ml-10" />
                              </div>
                            </div>
                            <div className="col-sm-12 mt-20"
                              style={{ height: '400px' }}>
                              <GoogleMap
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                              >
                                <TestMarker lat="50.4501" lng="32" key="30.5234"/>
                              </GoogleMap>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <button className="btn-cta-primary btn">Reload</button>
                        <div className="checkbox c-checkbox mt-20">
                          <label>
                            <input
                              type="checkbox"
                              onChange={this.handleChange.bind(this, 'value')}
                              value={this.state.value}
                              checked={this.state.value}
                            />
                            <em className="fa fa-check"/>
                            <strong>Друзья</strong>
                          </label>
                        </div>
                        <div className="checkbox c-checkbox mt-20">
                          <label>
                            <input
                              type="checkbox"
                              onChange={this.handleChange.bind(this, 'value')}
                              value={this.state.value}
                              checked={this.state.value}
                            />
                            <em className="fa fa-check"/>
                            <strong>Круги</strong>
                          </label>
                        </div>
                        <div className="checkbox c-checkbox mt-20">
                          <label>
                            <input
                              type="checkbox"
                              onChange={this.handleChange.bind(this, 'value')}
                              value={this.state.value}
                              checked={this.state.value}
                            />
                            <em className="fa fa-check"/>
                            <strong>Подписчики</strong>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
