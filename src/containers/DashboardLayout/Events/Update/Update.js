import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'
import { EventForm } from 'components'
import GoogleMap from 'google-map-react'
import { connect } from 'react-redux'
import { updateEvent } from 'redux/modules/events'
import { toastr } from 'react-redux-toastr'
import { asyncConnect } from 'redux-async-connect'
// utils
import responseErrorsParser from 'helpers/responseErrorsParser'
// constants
const marker = require('../../../../../static/marker.svg')

@asyncConnect([
  { key: 'event',
    promise: ({ params, helpers }) => helpers.client.get(`events/${params.id}`)
  }
])
@connect((state) => ({ user: state.auth.user }), { updateEvent })
export default class Update extends Component {
  static defaultProps = {
    defaultCenter: { lat: 50.450878, lng: 30.523744 }
  };

  static propTypes = {
    zoom: PropTypes.number,
    defaultCenter: PropTypes.object,
    updateEvent: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(...props)

    this.state = {
      markerLocation: {},
      mapCenter: undefined
    }
  }

  handleSubmit (data) {
    const { updateEvent, user, event } = this.props
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

    return updateEvent(data, user.id, event.resource.id).then(() => {
      router.push('dashboard/events')
      toastr.success('Событие успешно обновлено')
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
    const { event } = this.props
    const initialLocation = {
      lat: event.resource.lat,
      lng: event.resource.lng
    }
    const mapOptions = { mapTypeControl: false, streetViewControl: false,
      center: mapCenter || initialLocation, zoom: 13 }
    const initialValues = {
      members_count: event.resource.members_count,
      title: event.resource.title,
      subtitle: event.resource.subtitle,
      address: event.resource.address,
      start_date: new Date(event.resource.start_date),
      start_time: new Date(event.resource.start_date),
      approximate_time: new Date(event.resource.approximate_time),
      _private: event.resource.private
    }
    return (
      <div>
        <Helmet title="Event Update"/>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Обновление события</h4>
            </div>
            <div className="panel-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <span>Карта</span>
                    <div style={{ height: '350px' }}>
                      {event && <GoogleMap {...mapOptions} defaultCenter={this.props.defaultCenter}>
                        <span lat={markerLocation.lat || event.resource.lat} lng={markerLocation.lng || event.resource.lng}>
                          <img src={marker} alt="marker" style={{ maxWidth: '30px' }} />
                        </span>
                      </GoogleMap>}
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
