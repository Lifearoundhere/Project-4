import React from 'react'

const Face = (props) => {
  console.log(props.attributes)
  return (
    <div className='card'>{props.attributes.map(item => {
      <div>
        <p>rollAngle {item.rollAngle}</p>
        <p>panAngle {item.panAngle}</p>
        <p>tiltAngle {item.tiltAngle}</p>
        <p>Detection Confidence {item.detectionConfidence}</p>
        <p>Landmarking Confidence {item.landmarkingConfidence}</p>
        <p>joyLikelihood {item.joyLikelihood}</p>
        <p>sorrowLikelihood {item.sorrowLikelihood}</p>
        <p>angerLikelihood {item.angerLikelihood}</p>
        <p>surpriseLikelihood {item.surpriseLikelihood}</p>
        <p>underExposedLikelihood {item.underExposedLikelihood}</p>
        <p>blurredLikelihood {item.blurredLikelihood}</p>
        <p>Headwear Likelihood {item.headwearLikelihood}</p>
      </div>
    })}
    </div>
  )
}
export default Face