import React, { useState, useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useRender } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

import './style.css'

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  })

  return (
    <orbitControls 
      autoRotate
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      ref={orbitRef}
      args={[camera, gl.domElement]}
    />
  )
}

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
    <planeBufferGeometry
      attach="geometry"
      args={[100, 100]}
    />
    <meshPhysicalMaterial
      attach="material"
      color="blue"
    />
  </mesh>
)

const Box = () => {
  const [ hovered, setHovered ] = useState(false);
  const [ active, setActive ] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray"
  })

  return (
    <a.mesh 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1} /> 
      <boxBufferGeometry
        attach="geometry"
        args={[1, 1, 1]}
      />
      <a.meshPhysicalMaterial
        attach="material"
        color={props.color}
      />
    </a.mesh>
  )
}

export default () => (
  <Canvas camera={{position: [0, 0, 5]}}>
    <fog attach="fog" args={["white", 5, 15]} />
    <Controls />
    <Box />
    <Plane />
  </Canvas>
)
