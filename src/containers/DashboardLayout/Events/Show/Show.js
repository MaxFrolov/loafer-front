import React, { Component, PropTypes } from 'react'
// components
import { asyncConnect } from 'redux-async-connect'
import GoogleMap from 'google-map-react'
// utils
import moment from 'moment'
// constants
const marker = require('./marker.svg')

@asyncConnect([
  { key: 'event',
    promise: ({ params, helpers }) => helpers.client.get(`events/${params.id}`)
  }
])
export default class Show extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired
  };

  static defaultProps = {
    zoom: 9
  };

  render () {
    const { event } = this.props
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>Детали события</h4>
          </div>
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div style={{ height: '350px' }}>
                    <GoogleMap defaultCenter={{ lat: event.resource.lat, lng: event.resource.lng }}
                      defaultZoom={this.props.zoom}>
                      <span lat={event.resource.lat} lng={event.resource.lng}>
                        <img src={marker} alt="marker" className="img-responsive" style={{ maxWidth: '30px' }} />
                      </span>
                    </GoogleMap>
                  </div>
                </div>
                <div className="col-sm-6">
                  <h4>{event.resource.title}</h4>
                  <i>{event.resource.subtitle}</i>
                  <table className="table mt-20">
                    <tbody>
                      <tr>
                        <td className="text-bold">Дата:</td>
                        <td className="text-right">{moment(event.resource.start_date).format('D MMMM Y')}</td>
                      </tr>
                      <tr>
                        <td className="text-bold">Время:</td>
                        <td className="text-right">{moment(event.resource.start_date).format('HH:mm')}</td>
                      </tr>
                      <tr>
                        <td className="text-bold">Адрес:</td>
                        <td className="text-right">{event.resource.address}</td>
                      </tr>
                      <tr>
                        <td className="text-bold">Количество мест:</td>
                        <td className="text-right">{event.resource.members_count}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
