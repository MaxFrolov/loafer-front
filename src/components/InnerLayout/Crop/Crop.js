import React, { Component, PropTypes } from 'react'
// components
import ReactCrop from 'react-image-crop'

export default class Crop extends Component {
  static propTypes = {
    image: PropTypes.string
  }

  handleChange (crop, pixelCrop) {
    console.log(crop, pixelCrop)
  }

  render () {
    const image = require('./S5.jpg')
    return (
      <ReactCrop src={image} onChange={::this.handleChange} />
    )
  }
}
