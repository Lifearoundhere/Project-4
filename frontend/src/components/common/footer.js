import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="content is-dark">
          <h2>Please Scrape with Respect</h2>
          <p>There are a few cases where you would want to be cautious about:</p>
          <div className="columns">
            <div className="column">
              <p><strong>DoS</strong> - A <a href="https://en.wikipedia.org/wiki/Denial-of-service_attack">Denial of Service attack </a>
                practically relies on sending so many requests to the server that it simply can't handle any more.
                 All new incoming requests would then be denied.
              If you're scraping a website too often, it can be considered a DoS attack.</p>
            </div>
            <div className="column">
              <p><strong>Terms of Service</strong> - Many websites, and almost all bigger websites clearly state that web scraping on their platforms is prohibited.
              If many people scraped these websites,
            it would pretty much end up being a DDoS attack, which by itself is illegal.</p>

            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}
