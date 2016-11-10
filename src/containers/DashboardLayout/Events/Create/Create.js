import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'
import { EventForm } from 'components'
import GoogleMap from 'google-map-react'

const marker = require('./marker.png')

export default class EventCreate extends Component {
  static defaultProps = {
    defaultCenter: { lat: 49, lng: 32 },
    zoom: 9
  };

  static propTypes = {
    zoom: PropTypes.number,
    defaultCenter: PropTypes.object
  };

  constructor(props) {
    super(...props)

    this.state = {
      markerLocation: { lat: 49, lng: 32 },
      mapCenter: undefined
    }
  }

  handleSubmit (data) {
    console.log(data)
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
                    <EventForm onSubmit={this.handleSubmit} changeLocation={::this.changeLocation} />
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
