import React from 'react'
import backgroundImage from '../../assets/fredy-jacob-t0SlmanfFcg-unsplash.jpg'

const Home = (props) => {
  const { pages } = props
  console.log(props)
  return (
    <section className="section ImageBackground" style={{
      backgroundImage: `url(${backgroundImage})`
    }}>
      <div className="home"  >
        <ul>
          {pages.map(item => <li key={item}><a href={`#${item}`}> {item}</a></li>)}
        </ul>
      </div >
    </section>
  )
}
export default Home