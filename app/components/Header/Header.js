import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import style from './style';


class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { className } = this.props;
    const wrapperClass = classnames({
      [`${style.wrapper}`]: true,
      [`${className}`]: !!className
    });

    return (
      <header className={wrapperClass}>
        <h1 className={style.title}>
          Stop ID Search
        </h1>
      </header>
    );
  }
}

export default Header;