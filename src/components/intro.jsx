import React from 'react'
import cx from 'classnames';

const Intro = ({ className }) => (
  <div className={cx("intro", className)}>
    <h1>Species Extinction</h1>
    <p>
      Human actions threaten more species with global extinction now than ever
      before
    </p>
    <p className="text-blue">Swipe or scroll to start</p>
    <div className="icon-scroll"></div>
  </div>
);

export default Intro;
