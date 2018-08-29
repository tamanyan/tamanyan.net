import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

const Footer = ({ author, title }) => (
  <div className="footer">
    <div className="container">
      <hr className="border-primary" />
      <div className="container has-text-centered">
        <p className="text-center">
          © Taketo Yoshida 2018. Powered by{' '}
          <a href="https://gatsbyjs.org/">Gatsbyjs</a>
        </p>
      </div>
    </div>
  </div>
)

export default Footer
