import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'
import { EventForm } from 'components'
import GoogleMap from 'google-map-react'
import { connect } from 'react-redux'
import { createEvent } from 'redux/modules/events'
import { toastr } from 'react-redux-toastr'
// utils
import responseErrorsParser from 'helpers/responseErrorsParser'

const marker = require('./marker.png')

@connect((state) => ({ user: state.auth.user }), { createEvent })
export default class EventCreate extends Component {
  static defaultProps = {
    defaultCenter: { lat: 49, lng: 32 },
    zoom: 9
  };

  static propTypes = {
    zoom: PropTypes.number,
    defaultCenter: PropTypes.object,
    createEvent: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(...props)

    this.state = {
      markerLocation: { lat: 49, lng: 32 },
      mapCenter: undefined
    }
  }

  handleSubmit (data) {
    const { createEvent, user } = this.props
    const { router } = this.context

    const startHours = new Date(data.start_time).getHours()
    const startMinutes = new Date(data.start_time).getMinutes()
    const startDate = new Date(data.start_date)

    startDate.setHours(startHours)
    startDate.setMinutes(startMinutes)
    data.start_date = new Date(startDate)

    data.start_time = undefined
    data.private = data['_private']
    data['_private'] = undefined

    return createEvent(data, user.id).then(() => {
      router.push('dashboard/events')
      toastr.success('Событие успешно создано')
    }).catch((errors) => responseErrorsParser(errors))
  }

  changeLocation(lat, lng) {
    const { markerLocation } = this.state
    markerLocation.lat = lat
    markerLocation.lng = lng
    const mapCenter = { lat: lat, lng: lng }
    this.setState({ markerLocation: markerLocation, mapCenter: mapCenter })
  }

  render () {
    const { markerLocation, mapCenter } = this.state
    const mapOptions = { mapTypeControl: false, streetViewControl: false, center: mapCenter, zoom: mapCenter ? 13 : 9 }
    const initialValues = { members_count: 1 }
    return (
      <div>
        <Helmet title="Event Create"/>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Создание события</h4>
            </div>
            <div className="panel-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <span>Карта</span>
                    <div style={{ height: '350px' }}>
                      <GoogleMap {...mapOptions} defaultCenter={this.props.defaultCenter}>
                        <span lat={markerLocation.lat} lng={markerLocation.lng}>
                          <img src={marker} alt="marker" />
                        </span>
                      </GoogleMap>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <EventForm onSubmit={::this.handleSubmit}
                      changeLocation={::this.changeLocation}
                      initialValues={initialValues} />
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
