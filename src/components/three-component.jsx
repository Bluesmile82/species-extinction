import React, { useMemo, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import extinctionJson from '../data/extinction.json';
import Mesh from './mesh';

const BACKGROUND_COLOR = new THREE.Color('#08151e');



//     if (nextyear > START_YEAR - 10 && nextyear < END_YEAR) {
//       if (introVisible) {
//         intro.classList.add('out');
//         introVisible = false;
//       }
//       if (!introVisible && nextyear <= START_YEAR) {
//         intro.classList.remove('out');
//         intro.classList.add('in');
//         introVisible = true;
//       }

//       if (!outroVisible && nextyear >= END_YEAR - 10) {
//         clearTimeout(yearTimeout);
//         yearUI.classList.add('out');
//         outro.classList.remove('out');
//         outro.classList.add('in');
//         outroVisible = true;
//       }
//       if (outroVisible && nextyear < END_YEAR - 10) {
//         const outro = document.getElementById('outro');
//         outro.classList.add('out');
//         outroVisible = false;
//       }

//       const roundedYear = Math.round(year / 10) * 10;

//       if (
//         (displayedYear !== roundedYear && roundedYear % 100 === 0) ||
//         (roundedYear > 1890 && roundedYear % 10 === 0)
//       ) {
//         clearTimeout(yearTimeout);
//         yearUI.classList.remove('in');
//         yearUI.classList.remove('out');
//         yearUI.innerHTML = `${roundedYear}`;
//         yearUI.classList.add('in');
//         yearTimeout = setTimeout(function () {
//           yearUI.classList.add('out');
//         }, 2000);

//         displayedYear = roundedYear;
//       }
//       cameraLight.position.set(
//         camera.position.x,
//         camera.position.y,
//         camera.position.z + displacement
//       );
//       camera.position.set(
//         camera.position.x,
//         camera.position.y,
//         camera.position.z + displacement
//       );
//     }
//   }

const ThreeComponent = ({ setHovered, hovered, introVisible, setIntroVisible, outroVisible, setOutroVisible }) => {
  const START_YEAR = 1450;
  const END_YEAR = 2015;
  const kingdomColors = {
    ANIMALIA: '#552222',
    PLANTAE: '#73956f'
  };
  // position={[
  //   Math.random() * 250 - 100,
  //   Math.random() * 200,
  //   (START_YEAR - d.year) * 10
  // ]}
  const [cameraPosition, setCameraPosition] = useState([0, 100, 0])
  const onWheel = (e, swipeDisplacement) => {
    const cameraZ = cameraPosition[2];
    const displacement = swipeDisplacement
      ? -swipeDisplacement * 10
      : e.deltaY;
    const year = parseInt(cameraZ / -10 + START_YEAR, 10);
    const nextyear = parseInt((cameraZ + displacement) / -10 + START_YEAR, 10);
    console.log('wiiii', e, e.deltaY, year, nextyear, cameraZ, displacement);
    if (nextyear > START_YEAR - 10 && nextyear < END_YEAR) {
      if (introVisible) {
        setIntroVisible(false)
      }
      if (!introVisible && nextyear <= START_YEAR) {
        setIntroVisible(true)
      }
    }

//       if (!outroVisible && nextyear >= END_YEAR - 10) {
//         clearTimeout(yearTimeout);
//         yearUI.classList.add('out');
//         outro.classList.remove('out');
//         outro.classList.add('in');
//         outroVisible = true;
//       }
//       if (outroVisible && nextyear < END_YEAR - 10) {
//         const outro = document.getElementById('outro');
//         outro.classList.add('out');
//         outroVisible = false;
//       }

//       const roundedYear = Math.round(year / 10) * 10;

//       if (
//         (displayedYear !== roundedYear && roundedYear % 100 === 0) ||
//         (roundedYear > 1890 && roundedYear % 10 === 0)
//       ) {
//         clearTimeout(yearTimeout);
//         yearUI.classList.remove('in');
//         yearUI.classList.remove('out');
//         yearUI.innerHTML = `${roundedYear}`;
//         yearUI.classList.add('in');
//         yearTimeout = setTimeout(function () {
//           yearUI.classList.add('out');
//         }, 2000);

//         displayedYear = roundedYear;
//       }
//       cameraLight.position.set(
//         camera.position.x,
//         camera.position.y,
//         camera.position.z + displacement
//       );
//       camera.position.set(
//         camera.position.x,
//         camera.position.y,
//         camera.position.z + displacement
//       );
//     }
//   }
  }

  const meshData = useMemo(() => extinctionJson
    .filter((d, i) => d.year && i < 15)
    .map((d) => {
      const position = [Math.random() * 250 - 100, 0, 0];
      const scale =
        Math.random() * 8 + (d.redlistCategory === 'Extinct' ? 8 : 1);
      const rotation = [0, Math.random() * 90, Math.random() * 90];
      return {
        data: d,
        scale: [scale, scale, scale],
        position,
        rotation
      }
    }), []);

    return (
    <div className="three-component">
      <Canvas
        onWheel={onWheel}
        onCreated={({ scene }) => {
          scene.background = BACKGROUND_COLOR;
          scene.fog = new THREE.FogExp2(BACKGROUND_COLOR, 0.0009);
        }}
        camera={{ fov: 55, near: 1, far: 10000, position: cameraPosition }}
      >
        >
        <ambientLight color={'#08151e'} />
        <directionalLight
          color={'#fff'}
          intensity={5}
          position={[10, 1, -100]}
        />
        <directionalLight color={'#002288'} position={[-1, -1, -1]} />
        <pointLight intensity={4} position={[0, 100, 0]} distance={1000} />
        {meshData.map(d => (
          <Mesh
            key={d.data.name}
            data={d.data}
            setHovered={setHovered}
            hovered={hovered}
            color={kingdomColors[d.data.kingdomName] || 'ffffff'}
            position={d.position}
            rotation={d.rotation}
            scale={d.scale}
            type={d.redlistCategory !== 'Extinct' ? 'sphere' : 'box'}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default ThreeComponent;


// const postprocessing = {};
// let camera, scene, renderer, yearTimeout, displayedYear, raycaster, tooltip;
// const data = {};


// const intro = document.getElementById('intro');
// const outro = document.getElementById('outro');

// const mobileOrTablet = isMobileOrTablet();

// function init() {
//   raycaster = new THREE.Raycaster();
//   renderer = new THREE.WebGLRenderer({ antialias: true });

//   const yearUI = document.createElement('div');
//   yearUI.classList.add('year');
//   document.getElementById('top-ui').appendChild(yearUI);

//   tooltip = document.createElement('div');
//   tooltip.classList.add('tooltip');
//   document.getElementById('tooltip-container').appendChild(tooltip);

//   // controls

//

//   function handleTouchMove(evt) {
//     if (!xDown || !yDown) {
//       return;
//     }
//     var xUp = evt.touches[0].clientX;
//     var yUp = evt.touches[0].clientY;
//     var xDiff = xDown - xUp;
//     var yDiff = yDown - yUp;

//     if (Math.abs(xDiff) > Math.abs(yDiff)) {
//       /*most significant*/
//       if (xDiff > 0) {
//         /* left swipe */
//       } else {
//         /* right swipe */
//       }
//     } else {
//       const displacement = parseInt(Math.abs(yDiff), 10);

//       for (let i = parseInt(displacement, 10); i--; i > 0) {
//         setTimeout(() => {
//           onMouseWheel(evt, yDiff / 5);
//         }, i * 50);
//       }
//       if (yDiff > 0) {
//         /* up swipe */
//       } else {
//         /* down swipe */
//       }
//     }
//     /* reset values */
//     xDown = null;
//     yDown = null;
//   }

//   document.addEventListener('mousemove', onDocumentMouseMove, false);
//   document.addEventListener('wheel', onMouseWheel, false);
//   document.addEventListener('DOMMouseScroll', onMouseWheel, false);
//   document.addEventListener('onmousewheel', onMouseWheel, false);
//   document.addEventListener('touchstart', handleTouchStart, false);
//   document.addEventListener('touchmove', handleTouchMove, false);
//   document.addEventListener('click', handleClick, false);

//   // WORLD

//   geometry.translate(0, 0, 0);


//   // LIGHTS

//   window.addEventListener('resize', onWindowResize, false);


// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
//   postprocessing.composer.setSize(window.innerWidth, window.innerHeight);
// }

// function initPostprocessing() {
//   var renderPass = new RenderPass(scene, camera);

//   var bokehPass = new BokehPass(scene, camera, {
//     focus: 20.0,
//     aperture: 1.1 * 0.00001,
//     maxblur: 0.0125,
//     width: window.innerWidth,
//     height: window.innerHeight
//   });

//   var composer = new EffectComposer(renderer);

//   composer.addPass(renderPass);
//   composer.addPass(bokehPass);

//   postprocessing.composer = composer;
//   postprocessing.bokeh = bokehPass;
// }

// function animate() {
//   requestAnimationFrame(animate);
//   // controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
//   render();
// }

// function showTooltip(data) {
//   tooltip.classList.add('visible');
//   tooltip.style.left = `${mousePosition.x}px`;
//   tooltip.style.top = `${mousePosition.y}px`;
//   tooltip.parentElement.style.cursor = 'pointer';

//   tooltip.innerHTML = `
//     <div class="tooltip-item">
//       <div class="tooltip-name">
//       ${data.name}
//       </div>
//       <div class="kingdom-name">
//         ${data.kingdomName} - ${data.speciesClassName}
//       </div>
//       ${
//         mobileOrTablet
//           ? ''
//           : `<div class="tooltip-message">Click to open wikipedia page</div>`
//       }
//     </div>
//   `;
// }

// function clearTooltip() {
//   tooltip.classList.remove('visible');
//   tooltip.parentElement.style.cursor = 'auto';
// }