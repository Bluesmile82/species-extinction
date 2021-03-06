import React, { useState } from 'react';
import './styles/app.scss';
import ThreeComponent from './components/three-component';
import Tooltip from './components/tooltip/tooltip';
import Intro from './components/intro';
import Outro from './components/outro';
import cx from 'classnames';

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [outroVisible, setOutroVisible] = useState(false);
  const [displayedYear, setDisplayedYear] = useState(false);

  const [hovered, setHovered] = useState(null);
  return (
    <>
      {/* <Intro
        onWheel={(e) => (e.deltaY > 0 && setIntroVisible(false)) }
        className={cx({ in: introVisible, out: !introVisible })}
      /> */}
      <div
        className={cx(
          'top-ui'
          // { in: !!yearsVisible }
        )}
      >
        {displayedYear}
      </div>
      <Outro className={cx({ in: outroVisible, out: !outroVisible })} />
      <ThreeComponent
        introVisible={introVisible}
        outroVisible={outroVisible}
        setIntroVisible={setIntroVisible}
        setOutroVisible={setOutroVisible}
        setDisplayedYear={setDisplayedYear}
        setHovered={setHovered}
        hovered={hovered}
      />
      <div
        id="tooltip-container"
        style={{ top: hovered?.top, left: hovered?.left }}
      >
        {hovered && <Tooltip data={hovered} />}
      </div>
    </>
  );
}

export default App;
