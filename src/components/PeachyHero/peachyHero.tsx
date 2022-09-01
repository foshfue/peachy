
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing'

function Box({ z, props }) {
    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)

    const { nodes, materials } = useGLTF('/peach-transformed.glb')

    const ref = useRef()
    const { viewport, camera } = useThree()

    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    }
    )





    useFrame((state) => {
        ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001))
        ref.current.position.set(data.x * width, (data.y += 0.05), z)
        if (data.y > height) {
            data.y = -height
        }
    })

    return (
        <group {...props} ref={ref} scale={(0.022)} dispose={null}>
            <group rotation={[-Math.PI, 0, -Math.PI]}>
                <group position={[-35.05, 103.16, -8.6]} rotation={[-1.67, -0.13, -0.25]} scale={[43.9, 23.27, 3.33]}>
                    <mesh geometry={nodes.Leaves_LeafColor_0.geometry} material={materials.LeafColor} position={[0.71, 0.36, -5.97]} />
                </group>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <mesh geometry={nodes.Peach_PeachColor_0.geometry} material={materials.PeachColor} position={[0, 0.01, 0.01]} />
                </group>
                <group position={[0, 84.58, -4.8]} rotation={[-Math.PI / 2, 0, 0]} scale={[4, 4, 36.5]}>
                    <mesh geometry={nodes.stem_StemColor_0.geometry} material={materials.StemColor} position={[0.07, -0.02, -0.06]} />
                </group>
            </group>
        </group>

    )
}

// function Peach(props) {
//     const { scene } = useGLTF('/peachycompressed.gltf')

//     // // scene.traverse(obj => {
//     // //     if (obj.isMesh) {
//     // //         obj.castShadow = true
//     // //         obj.receiveShadow = true
//     // //     }
//     // })

//     return <primitive object={scene}  {...props} />
// }


function PeachyHero({ count = 100, depth = 30 }) {
    return (
        <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }} >
            <color attach="background" args={["#ffbf40"]} />
            {/* <ambientLight intensity={0.1} /> */}
            <spotLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
                {/* <Peach scale={(0.007)} /> */}

                <Environment preset="sunset" />
                {Array.from({ length: count }, (_, i) => (<Box key={i} z={-(i / count) * depth - 20} />))}
                <EffectComposer>
                    <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={7} height={700} />
                </EffectComposer>
            </Suspense>
        </Canvas >

    )
}

export default PeachyHero