
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, Environment, OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing'

import { gsap } from "../../utils/gsap";


// function Box({ z, props }) {
//     const [clicked, setClicked] = useState(false)
//     const [hovered, setHovered] = useState(false)

//     const { nodes, materials } = useGLTF('/eyespeach-transformed.glb')
//     const ref = useRef()
//     const { viewport, camera } = useThree()

//     const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

//     const [data] = useState({
//         x: THREE.MathUtils.randFloatSpread(2),
//         y: THREE.MathUtils.randFloatSpread(height),
//         rX: Math.random() * Math.PI,
//         rY: Math.random() * Math.PI,
//         rZ: Math.random() * Math.PI,
//     }
//     )

//     useFrame((state) => {
//         ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001))
//         ref.current.position.set(data.x * width, (data.y += 0.05), z)
//         if (data.y > height) {
//             data.y = -height
//         }
//     })

//     return (
//         <group {...props} ref={ref} scale={(0.02)} dispose={null}>
//             <group rotation={[-Math.PI, 0, -Math.PI]}>
//                 <group position={[-35.05, 103.16, -8.6]} rotation={[-1.67, -0.13, -0.25]} scale={[43.9, 23.27, 3.33]}>
//                     <mesh geometry={nodes.Leaves_LeafColor_0.geometry} material={materials.LeafColor} position={[0.71, 0.36, -5.97]} />
//                 </group>
//                 <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
//                     <mesh geometry={nodes.Peach_PeachColor_0.geometry} material={materials.PeachColor} position={[0, 0.01, 0.01]} />
//                 </group>
//                 <group position={[0, 84.58, -4.8]} rotation={[-Math.PI / 2, 0, 0]} scale={[4, 4, 36.5]}>
//                     <mesh geometry={nodes.stem_StemColor_0.geometry} material={materials.StemColor} position={[0.07, -0.02, -0.06]} />
//                 </group>
//             </group>
//             <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material} position={[36.83, 22.81, 88.12]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.11} />
//             <mesh geometry={nodes.Sphere001.geometry} material={nodes.Sphere001.material} position={[-35.93, 23.98, 87.57]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.11} />
//             <mesh geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} position={[1.02, 16.31, 90.13]} rotation={[-Math.PI, 0, -Math.PI]} scale={[30.05, 2.55, 0.99]} />
//         </group>


//     )
// }

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

export function Peach({ anim, ...props }) {
    const { width, height } = useWindowDimensions();
    const boxRef = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);

    // console.log({ width, height })


    const isMd = width && width < 1024
    const isLg = width && width > 1023 && width < 1280
    const isXl = width && width > 1279

    console.log({ width, isMd, isLg, isXl })


    useFrame(() => {

        if (isLg) {
            boxRef.current.position.x = -2 * anim.mx
            boxRef.current.position.y = -1.5 * anim.my
            boxRef.current.scale.x = anim.ms
            boxRef.current.scale.y = anim.ms
            boxRef.current.scale.z = anim.ms

        }
        if (isXl) {
            boxRef.current.position.x = -2 * anim.mx
            boxRef.current.position.y = -1.5 * anim.my
            boxRef.current.scale.x = anim.ms
            boxRef.current.scale.y = anim.ms
            boxRef.current.scale.z = anim.ms

        } else {
            boxRef.current.position.x = -2 * anim.x
            boxRef.current.position.y = -1.5 * anim.y
            boxRef.current.scale.x = anim.scale
            boxRef.current.scale.y = anim.scale
            boxRef.current.scale.z = anim.scale
        }
        // console.log("boxRef.current", boxRef.current)

    });


    const { nodes, materials } = useGLTF('/eyespeach-transformed.glb')
    return (
        <>
            <Float
                speed={5}
                rotationIntensity={0.6}
                floatIntensity={0.6}
            >
                <OrbitControls

                    enablePan={false}
                    enableZoom={false}
                    enableDamping
                    dampingFactor={0.5}
                    rotateSpeed={1}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />

                <group {...props} dispose={null} ref={boxRef}
                    className="grouptest"
                    // onClick={() => {
                    //     setActive(!active);
                    // }}
                    onPointerOver={() => {
                        setHover(true);
                    }}
                    onPointerOut={() => {
                        setHover(false);
                    }}
                >

                    {/* <group {...props} ref={boxRef} scale={(0.02)} dispose={null}> */}
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
                    <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material} position={[36.83, 22.81, 88.12]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.11} />
                    <mesh geometry={nodes.Sphere001.geometry} material={nodes.Sphere001.material} position={[-35.93, 23.98, 87.57]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.11} />
                    <mesh geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} position={[1.02, 16.31, 90.13]} rotation={[-Math.PI, 0, -Math.PI]} scale={[30.05, 2.55, 0.99]} />
                </group>
            </Float>
        </>
    )
}

function SinglePeach() {

    const animable = {
        x: 0,
        y: -0.3,
        scale: 0.006,
        ms: 0.007,
        mx: 0,
        my: -0.2,
    }


    useEffect(() => {

        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.thisMoves',
                start: 'top top',
                endTrigger: ".section2",
                end: 'bottom bottom',
                snap: 1,
                scrub: 1,
                markers: true
            }
        })
        tl1.to(animable, {
            x: -0,
            y: -0.45,
            mx: -0.45,
            ms: 0.006,
            my: -0.2,
            scale: 0.0045,
        })
        // const tl3 = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '.section-two',
        //         start: 'top top',
        //         endTrigger: '.section-three',
        //         end: 'bottom bottom',
        //         markers: true,
        //         scrub: 1
        //     }
        // })

    }, [animable])


    return (
        <Canvas gl={{ alpha: true }} camera={{ near: 0.01, far: 110, fov: 30 }} className="testing">
            {/* <color attach="background" args={["#ffbf40"]} /> */}
            <ambientLight intensity={0.05} />
            <spotLight position={[10, 10, 10]} intensity={0.6} />
            <Suspense fallback={null}>
                <Peach scale={(0.007)} anim={animable} />

                <Environment preset="sunset" />
                {/* {Array.from({ length: count }, (_, i) => (<Box key={i} z={-(i / count) * depth - 20} />))} */}
                {/* <EffectComposer>
                    <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={7} height={700} />
                </EffectComposer> */}
            </Suspense>
        </Canvas >

    )
}

export default SinglePeach




type WindowDimentions = {
    width: number | undefined;
    height: number | undefined;
};

const useWindowDimensions = (): WindowDimentions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize(): void {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
};

