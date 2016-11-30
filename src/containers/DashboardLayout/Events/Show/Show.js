import React, { Component, PropTypes } from 'react'
// components
import { asyncConnect, loadSuccess } from 'redux-async-connect'
import GoogleMap from 'google-map-react'
import { Link } from 'react-router'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
// utils
import moment from 'moment'
// constants
const marker = require('../../../../../static/marker.svg')

@asyncConnect([
  { key: 'event',
    promise: ({ params, helpers }) => helpers.client.get(`events/${params.id}`)
  }
])

@connect((state) => ({ user: state.auth.user }), { loadSuccess })
export default class Show extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    defaultCenter: PropTypes.object,
    zoom: PropTypes.number.isRequired,
    loadSuccess: PropTypes.func.isRequired
  };

  static defaultProps = {
    zoom: 13,
    defaultCenter: { lat: 50.450878, lng: 30.523744 }
  };

  static contextTypes = {
    client: React.PropTypes.object.isRequired
  };

  acceptEvent () {
    const { client } = this.context
    const { event: { resource }, loadSuccess, user } = this.props
    const entity = { event_id: user.id }

    return client.put(`events/accept_event/${resource.id}`, { data: { resource: entity } })
    .then((response) => {
      toastr.success('Вы успешно стали участником события')
      loadSuccess('event', response)
      this.fetchParticipantEvents()
    })
  }

  fetchParticipantEvents () {
    const { client } = this.context
    const { loadSuccess } = this.props

    return client.get('events/participant_events').then((response) => {
      loadSuccess('participant_events', response)
    })
  }

  render () {
    const { event, defaultCenter, zoom } = this.props
    const eventLocation = {
      lat: event.resource.lat,
      lng: event.resource.lng
    }
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="container-fluid">
              <div className="row">
                <h4 className="pull-left">Детали события</h4>
                {event.resource.event_owner && <Link to={`/event/update/${event.resource.id}`}
                  className="pull-right">
                  <button type="button" className="btn btn-primary">
                    <i className="fa fa-pencil mr"/>
                    Обновить
                  </button>
                </Link>}
                {!event.resource.event_owner && !event.resource.event_participant && <button type="button"
                  className="btn btn-primary pull-right" onClick={::this.acceptEvent}>
                  Пойти
                </button>}
                {event.resource.event_participant && !event.resource.event_owner &&
                  <div className="label label-success pull-right">
                    Участник события
                  </div>}
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div style={{ height: '350px' }}>
                    <GoogleMap defaultCenter={defaultCenter} center={eventLocation}
                      defaultZoom={zoom}>
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
                        <td className="text-right">{event.resource.participants_count} / {event.resource.members_count}</td>
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
