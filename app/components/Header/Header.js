import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import style from './style'

class Header extends Component {
  render () {
    const { className } = this.props
    const wrapperClass = classnames({
      [style.wrapper]: true,
      [className]: !!className
    })

    return (
      <header className={wrapperClass}>
        <h1 className={style.title}>
          LTC Webwatch
        </h1>
      </header>
    )
  }
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
