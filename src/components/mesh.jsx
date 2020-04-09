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
  return (
    <mesh
      {...props}
      onPointerEnter={(e) => {
        setHovered({ ...data, top: e.clientY, left: e.clientX });
      }}
      onPointerOut={(e) => {
        setHovered(null);
      }}
      onClick={() => (
        window.open(
          `https://en.wikipedia.org/wiki/${data.name}`,
          '_blank'
        )
      )}
    >
      {type === 'sphere' ? (
        <sphereGeometry attach="geometry" args={[1, 1, 1]} />
      ) : (
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      )}
      <Material
        color={color}
        emissive={hovered?.name === data.name ? '#aaf' : undefined}
      />
    </mesh>
  );
}

export default Mesh;
