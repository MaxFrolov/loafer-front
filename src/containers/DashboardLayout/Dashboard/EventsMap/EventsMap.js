import React, { Component, PropTypes } from 'react'
// components
import GoogleMap from 'google-map-react'
import DatePicker from 'react-datepicker'
import EventMarker from './EventMarker'
import { connect } from 'react-redux'
// utils
import moment from 'moment'

@connect((state) => ({ events: state.reduxAsyncConnect.events }), null)
export default class EventsMap extends Component {

  static defaultProps = {
    center: { lat: 50.450878, lng: 30.523744 },
    zoom: 9
  };

  static propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.object,
    events: PropTypes.object.isRequired
  };

  constructor(props) {
    super(...props)

    this.state = {
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
    }
  }

  handleChangeDate (key, date) {
    this.setState({ [key]: date })
  }

  lessThanEndDate (date) {
    return date < this.state.endDate
  }

  greaterThanStartDate (date) {
    return date > this.state.startDate
  }

  render() {
    const { startDate, endDate } = this.state
    const { events } = this.props
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="date-period">
            <DatePicker
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              filterDate={::this.lessThanEndDate}
              className="form-control"
              onChange={this.handleChangeDate.bind(this, 'startDate')} />
            <span className="dash ml-10 mr-10">—</span>
            <DatePicker
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              filterDate={::this.greaterThanStartDate}
              className="form-control"
              onChange={this.handleChangeDate.bind(this, 'endDate')} />
            <i className="fa fa-calendar ml-10" />
          </div>
        </div>
        <div className="col-sm-12 mt-20"
          style={{ height: '400px' }}>
          <GoogleMap
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}>
            {events.resources.map((event, idx) => (
              <EventMarker lat={event.lat} lng={event.lng} event={event} index={idx} key={idx} />
            ))}
          </GoogleMap>
        </div>
      </div>
    )
  }
}
