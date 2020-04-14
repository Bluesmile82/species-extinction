import React from 'react';

const Material = ({ color, emissive }) => (
    <meshStandardMaterial
      attach="material"
      color={color}
      metalness={0.5}
      roughness={0.2}
      emissive={emissive || '#000'}
    />
  );


function Mesh(props) {
  const { type, color, setHovered, hovered, data } = props;
  const eventProps = {
    onPointerEnter: (e) => {
    e.stopPropagation();
    setHovered({ ...data, top: e.clientY, left: e.clientX });
  },
    onPointerOut: (e) => {
      e.stopPropagation();
      setHovered(null);
    },
    onClick: () => (
      window.open(
        `https://en.wikipedia.org/wiki/${data.name}`,
        '_blank'
      )
    )
  };
  const meshProps = {...props, ...eventProps};
  return (
    <mesh
      attach="mesh"
      {...meshProps}
    >
      {type === 'sphere' ? (
        <sphereBufferGeometry attach="geometry" args={[1, 10, 10]} />
        ) : (
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        )
      }
      <Material
        color={color}
        emissive={hovered?.name === data.name ? '#aaf' : undefined}
      />
    </mesh>
  );
}

export default Mesh;
