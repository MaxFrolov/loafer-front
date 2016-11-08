import React, { PropTypes } from 'react'

const FilterOptions = ({ changeValue, filterOptions, filterFields }) => (
  <div>
    {filterFields.map((item, idx) => (
      <div key={idx} className="checkbox c-checkbox mt-20">
        <label>
          <input
            type="checkbox"
            onChange={changeValue}
            value={filterOptions[item.key]}
            checked={filterOptions[item.key]}
            name={item.key}
          />
          <em className="fa fa-check"/>
          <strong>{item.label}</strong>
        </label>
      </div>
    ))}
  </div>
)

FilterOptions.propTypes = {
  changeValue: PropTypes.func.isRequired,
  filterOptions: PropTypes.object.isRequired,
  filterFields: PropTypes.array.isRequired
}

export default FilterOptions
