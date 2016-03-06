import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'

import NavButton from '../NavButton'

import style from './style'

class Header extends Component {
  render () {
    const { className, navOpen, navClose, navBtn } = this.props
    const wrapperClass = classnames({
      [style.wrapper]: true,
      [className]: !!className
    })

    return (
      <nav className={style.navBar}>
        <header className={wrapperClass}>
          <h1 className={style.title}>
            LTC Webwatch
          </h1>
        </header>
        <NavButton
          navOpen={navOpen}
          navClose={navClose}
          navBtn={navBtn} />
      </nav>
    )
  }
}

Header.propTypes = {
  className: PropTypes.string,
  navOpen: PropTypes.func,
  navClose: PropTypes.func,
  navBtn: ImmutablePropTypes.map
}

export default Header
