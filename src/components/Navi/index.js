import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

class Navi extends React.Component {
  render() {
    const { location, title } = this.props

    return (
      <header className="container header">
        <a href="/">
          <h1>{title}</h1>
        </a>
      </header>
    )
  }
}

export default Navi
