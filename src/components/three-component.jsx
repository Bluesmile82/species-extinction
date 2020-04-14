import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import cx from 'classnames';
import extinctionJson from '../data/extinction.json';
import Mesh from './mesh';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

extend({ UnrealBloomPass, RenderPass, EffectComposer, BokehPass })

const BACKGROUND_COLOR = new THREE.Color('#08151e');

const ThreeComponent = ({ setHovered, hovered, introVisible, setIntroVisible, outroVisible, setOutroVisible }) => {
  const START_YEAR = 1450;
  const END_YEAR = 2015;
  const CAMERA_START_Z = 500;
  const kingdomColors = {
    ANIMALIA: '#552222',
    PLANTAE: '#73956f'
  };
  const [displayedYear, setDisplayedYear] = useState(START_YEAR);
  const [yearsVisible, setYearsVisible] = useState(false);
  const [selectedCamera, setCamera] = useState(null);
  const canvasRef = useRef();


  const move = (displacement) => {
    const year = parseInt((selectedCamera.position.z / -10) + START_YEAR , 10);
    const nextyear = parseInt(
      ((selectedCamera.position.z + displacement) / -10) + START_YEAR,
      10
    );

    const isInBounds = nextyear > START_YEAR - 100 && nextyear < END_YEAR;
    if (isInBounds) {
      if (introVisible) {
        setIntroVisible(false);
      }
      if (!introVisible && nextyear <= START_YEAR) {
        setIntroVisible(true);
      }
      if (!outroVisible && nextyear >= END_YEAR - 10) {
        setOutroVisible(true);
        setYearsVisible(false);

      }
      if (outroVisible && nextyear < END_YEAR - 10) {
        setOutroVisible(false);
      }

      const roundedYear = Math.round(year / 10) * 10;

      if (
        (displayedYear !== roundedYear && roundedYear % 100 === 0) ||
        (roundedYear > 1890 && roundedYear % 10 === 0)
      ) {
        // setDisplayedYear(roundedYear);
      }

      selectedCamera.position.z += displacement;
    }
  };

  const onWheel = (e, swipeDisplacement) => {
    const displacement = swipeDisplacement
    ? -swipeDisplacement * 10
    : -e.deltaY;
    move(displacement);
  }


  const Controls = () => {
    const { camera } = useThree();
    if (!selectedCamera && camera) {
      setCamera(camera)
    }
    return null
  }


  function Effects() {
    const composer = useRef()
    const { scene, gl, size, camera } = useThree();
    useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
    useFrame(() => {
      // move(-10)

      return composer?.current?.render()
    }, 1);
    return (
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85]} />
        <bokehPass
          attachArray="passes"
          args={[scene,camera,
            {
              focus: 20.0,
              aperture: 1.1 * 0.00001,
              maxblur: 0.0125,
              width: window.innerWidth,
              height: window.innerHeight
            }
          ]}
        />
      </effectComposer>
    )
  }

  const meshData = useMemo(() => extinctionJson
    .filter((d, i) => d.year)
    .map((d) => {
      const position = [
        Math.random() * 250 - 100,
        Math.random() * 200,
        (START_YEAR - d.year) * 10
      ];
      const scale =
        Math.random() * 8 + (d.redlistCategory === 'Extinct' ? 8 : 1);
      const rotation = [0, Math.random() * 90, Math.random() * 90];
      const type = d.redlistCategory !== 'Extinct' ? 'sphere' : 'box'
      return {
        data: d,
        scale: [scale, scale, scale],
        position,
        rotation,
        type
      }
    }), []);

    return (
      <div className="three-component" ref={canvasRef}>
        <div className={cx("top-ui", { in: yearsVisible })} >{displayedYear}</div>
        <Canvas
          onWheel={onWheel}
          onCreated={({ scene }) => {
            scene.background = BACKGROUND_COLOR;
            scene.fog = new THREE.FogExp2(BACKGROUND_COLOR, 0.0009);
          }}
          camera={{ fov: 55, near: 1, far: 10000, position: [0, 100, CAMERA_START_Z] }}
        >
          <ambientLight color={'#08151e'} />
          <directionalLight
            color={'#fff'}
            intensity={5}
            position={[10, 1, 100]}
          />
          <directionalLight color={'#002288'} position={[1, 1, 1]} />
          <pointLight intensity={4} position={[0, 100, 0]} distance={1000} />
          {meshData.map((d) => (
            <Mesh
              key={d.data.name}
              data={d.data}
              setHovered={setHovered}
              hovered={hovered}
              color={kingdomColors[d.data.kingdomName] || '#fff'}
              position={d.position}
              rotation={d.rotation}
              scale={d.scale}
              type={d.type}
            />
          ))}
          <Controls />
          <Effects />
        </Canvas>
      </div>
    );
};

export default ThreeComponent;