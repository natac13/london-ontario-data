import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'

import NavButton from '../NavButton'

import style from './style.scss'

function Header (props) {
  const { className, navOpen, navClose, navBtn } = props
  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!className
  })

  return (
    <nav className={style.navBar}>
      <header className={wrapperClass}>
        <h1 className={style.title}>
          <span className={style.ltc}>London</span> TransitHawk
        </h1>
      </header>
      <NavButton
        navOpen={navOpen}
        navClose={navClose}
        navBtn={navBtn} />
    </nav>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  navOpen: PropTypes.func,
  navClose: PropTypes.func,
  navBtn: ImmutablePropTypes.map
}

export default Header
