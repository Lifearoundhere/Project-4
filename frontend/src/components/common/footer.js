import React from 'react'
import { SocialIcon } from 'react-social-icons'

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="is-dark">
          <div className="columns">
            <div className="column">
              <div className="input-tag">
                <p>Supported Image Types: </p>
                <ul className="input-tag__tags">
                  <li>JPEG</li>
                  <li>PNG8</li>
                  <li>PNG24</li>
                  <li>GIF</li>
                  <li>Animated GIF (first frame only)</li>
                  <li>BMP</li>
                  <li>WEBP</li>
                  <li>RAW</li>
                  <li>ICO</li>
                  <li>PDF</li>
                  <li>TIFF</li>
                </ul>
              </div>
            </div>
            <div className="content">
              <SocialIcon className="footBtn" url="https://twitter.com/Life_Aroundhere" />
              <SocialIcon className="footBtn" url="https://linkedin.com/in/prabhdeeps/" />
              <SocialIcon className="footBtn" url="https://github.com/Lifearoundhere" />
            </div>
            <div className="column">
              <p>About this site: </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut
                labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco </p>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}
