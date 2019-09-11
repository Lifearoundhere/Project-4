import React from 'react'

const Face = (props) => (
  <div className='tile'>{props.attributes.map(item =>
    <div>
      <p>Has the following results: </p>
      <p key={item.rollAngle} >RollAngle: {item.rollAngle}</p>
      <p key={item.rollAngle} >PanAngle: {item.panAngle}</p>
      <p key={item.rollAngle} >Tilt Angle: {item.tiltAngle}</p>
      <p key={item.rollAngle} >Detection: Confidence {item.detectionConfidence}</p>
      <p key={item.rollAngle} >Landmarking: Confidence {item.landmarkingConfidence}</p>
      <p key={item.rollAngle} >Joy Likelihood: {item.joyLikelihood}</p>
      <p key={item.rollAngle} >Sorrow Likelihood: {item.sorrowLikelihood}</p>
      <p key={item.rollAngle} >Anger Likelihood: {item.angerLikelihood}</p>
      <p key={item.rollAngle} >Surprise Likelihood: {item.surpriseLikelihood}</p>
      <p key={item.rollAngle} >Under Exposed Likelihood: {item.underExposedLikelihood}</p>
      <p key={item.rollAngle} >Blurred Likelihood: {item.blurredLikelihood}</p>
      <p key={item.rollAngle} >Headwear Likelihood: {item.headwearLikelihood}</p>
    </div>
  )}
  </div>
)

export default Face