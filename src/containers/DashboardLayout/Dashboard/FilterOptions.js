import React, { PropTypes } from 'react'

const FilterOptions = ({ changeValue, filterOptions }) => (
  <div>
    <div className="checkbox c-checkbox mt-20">
      <label>
        <input
          type="checkbox"
          onChange={changeValue}
          value={filterOptions.circle}
          checked={filterOptions.circle}
          name="circle"
        />
        <em className="fa fa-check"/>
        <strong>Круги</strong>
      </label>
    </div>
    <div className="checkbox c-checkbox mt-20">
      <label>
        <input
          type="checkbox"
          onChange={changeValue}
          value={filterOptions.followers}
          checked={filterOptions.followers}
          name="followers"
        />
        <em className="fa fa-check"/>
        <strong>Подписчики</strong>
      </label>
    </div>
  </div>
)

FilterOptions.propTypes = {
  changeValue: PropTypes.func.isRequired,
  filterOptions: PropTypes.object.isRequired
}

export default FilterOptions
