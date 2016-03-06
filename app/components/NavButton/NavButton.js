import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'

import Dialog from 'react-toolbox/lib/dialog'
import { Button, IconButton } from 'react-toolbox/lib/button'
import Icon from 'react-fa'

import style from './style'

function NavButton (props) {
  const { className, navOpen, navClose, navBtn } = props
  const isOpen = navBtn.get('isOpen')

  const buttonClass = classnames({
    [style.hamburger]: true,
    [style.hamburgerEmphatic]: true,
    [style.isActive]: isOpen,
    [className]: !!className
  })

  return (
    <div>
      <button
        className={buttonClass}
        type='button'
        onClick={navOpen}
        aria-label='Menu'
        aria-controls='navigation'>
        <span className={style.hamburgerBox}>
          <span className={style.hamburgerInner}></span>
        </span>
      </button>
      <Dialog
        className={style.dialog}
        active={isOpen}
        onOverlayClick={navClose}
        type='normal'>
        <Button
          flat
          primary
          label='Route List' />
        <Button
          flat
          primary
          label='Login' />
        <Button
          flat
          primary
          label='About' />
        <IconButton
          className={style.btnClose}
          icon={<Icon name='close'/>}
          onClick={navClose} />
      </Dialog>
    </div>
  )
}

NavButton.propTypes = {
  className: PropTypes.string,
  navOpen: PropTypes.func,
  navClose: PropTypes.func,
  navBtn: ImmutablePropTypes.map
}

export default NavButton
