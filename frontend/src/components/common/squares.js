import React from 'react'
import borders from 'react-vis/dist/plot/borders'

const Square = React.createClass({
  render: function () {
    var circleStyle = {
      padding: 10,
      margin: 20,
      width: 100,
      height: 100,
      opacity: 1,
      border: '2px solid black'
    }
    return (
      <div style={circleStyle}>
      </div>
    )
  }
})
export default Square