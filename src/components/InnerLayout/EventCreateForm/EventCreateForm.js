import React, { Component, PropTypes } from 'react'
// components
import { reduxForm } from 'redux-form'
import Field from 'components/Field/Field'
import Geosuggest from 'react-geosuggest'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
// styles
import styles from './eventCreateForm.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

@reduxForm({
  form: 'eventCreateForm',
  fields: ['title', '_private', 'lat', 'lng', 'address', 'subtitle', 'members_count', 'start_date', 'start_time',
    'approximate_time']
})

export default class EventCreateForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    changeLocation: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    error: PropTypes.any,
    submitting: PropTypes.bool
  };

  handleAddressChange = (e) => {
    const { fields: { address, lng, lat }, changeLocation } = this.props
    address.onChange(e.label)
    lng.onChange(e.location.lng)
    lat.onChange(e.location.lat)
    changeLocation(e.location.lat, e.location.lng)
  }

  render () {
    const { fields: { title, _private, subtitle, members_count, address, start_date, start_time, approximate_time },
      handleSubmit, error, submitting } = this.props
    return (
      <form className={error && 'has-error'} onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <Field field={title}>
            <label>Заголовок</label>
            <input type="text" className="form-control" {...title} />
          </Field>
        </div>
        <div className="form-group">
          <Field field={subtitle}>
            <label>Подзаголовок</label>
            <input type="text" className="form-control" {...subtitle} />
          </Field>
        </div>
        <div className="form-group">
          <Field field={start_date}>
            <label>Дата события</label>
            <br />
            <DatePicker
              {...start_date}
              onChange={(e, value) => start_date.onChange(value)}
              hintText="Укажите дату события"
            />
          </Field>
        </div>
        <div className="form-group">
          <Field field={start_time}>
            <label>Время события</label>
            <br />
            <TimePicker
              {...start_time}
              onChange={(e, value) => start_time.onChange(value)}
              format="ampm"
              hintText="Укажите время события"
            />
          </Field>
        </div>
        <div className="form-group">
          <Field field={approximate_time}>
            <label>Примерное время события</label>
            <br />
            <TimePicker
              {...approximate_time}
              onChange={(e, value) => approximate_time.onChange(value)}
              format="24hr"
              hintText="Укажите примерное время"
            />
          </Field>
        </div>
        <div className="form-group">
          <Field field={members_count}>
            <label>Количество мест</label>
            <input type="number" min="1" className="form-control" {...members_count} value={members_count.value || 1} />
          </Field>
        </div>
        <div className="checkbox c-checkbox mt-20">
          <Field field={_private}>
            <label>
              <input type="checkbox" {..._private}/>
              <em className="fa fa-check"/>
              <strong>Приватный</strong>
            </label>
          </Field>
        </div>
        <div className={cx('form-group', 'geosuggest-wrapper')}>
          <Field field={address}>
            <label>Адресс</label>
            <Geosuggest
              inputClassName="form-control"
              placeholder="Выберите адресс"
              onSuggestSelect={this.handleAddressChange}
              initialValue={address.value || ''}
            />
          </Field>
        </div>
        <button type="submit" disabled={submitting} className="btn btn-primary mt-lg">
          Сохранить
        </button>
      </form>
    )
  }
}
