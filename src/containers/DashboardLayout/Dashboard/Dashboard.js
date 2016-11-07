import React, { Component, PropTypes } from 'react'
// components
import GoogleMap from 'google-map-react'
import DatePicker from 'react-datepicker'
// utils
import moment from 'moment'
// import TestMarker from './test'

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
            <div className="col-sm-8 col-sm-offset-2">
              <h1 className="text-center">Карта встреч</h1>
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-10">
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
                                defaultZoom={this.props.zoom} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <button className="btn-cta-primary btn">Обновить</button>
                        <h5 className="mt-20">Фильтры по спискам друзей:</h5>
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
