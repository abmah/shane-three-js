import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import gsap from 'gsap'

/**
 * Loaders
 */
let loader = document.getElementsByClassName('loader')[0];
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        // flipDigits(100)
        setTimeout(() => {
            loader.style.transform = 'translateY(-100%)';
            loader.style.transition = 'transform .6s ease-in-out';

        }, 1000);

    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        flipDigits(Math.round(progressRatio * 100))
    }
)





// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)

// Draco loader
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new dat.GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Textures
 */
const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

/**
 * Model
 */
gltfLoader.load(
    'baked2.glb',
    (gltf) => {
        gltf.scene.scale.set(0.1, 0.1, 0.1)
        scene.add(gltf.scene)

        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = bakedMaterial

            }
        })
    })
/**
 * Fireflies
 */

let alphaBitcoinTexture = textureLoader.load('bitcoin.png')


let firefliesCount = 200;


const firefliesGeometry = new THREE.BufferGeometry();


function setFirefliesPositionsAndScales() {
    const positionArray = new Float32Array(firefliesCount * 3);
    const scaleArray = new Float32Array(firefliesCount);

    for (let i = 0; i < firefliesCount; i++) {
        positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
        positionArray[i * 3 + 1] = Math.random() * 1.5;
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

        scaleArray[i] = Math.random();
    }

    firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));
}


setFirefliesPositionsAndScales();


const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms:
    {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 25 },
        uColor: { value: new THREE.Color('#ffffff') },
        uSpeed: { value: 0.03 },
        uAlphaTexture: { value: alphaBitcoinTexture }


    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true
})


gui.add({ count: firefliesCount }, 'count', 1, 5000).step(1).name('firefliesCount').onChange((value) => {
    firefliesCount = value;
    setFirefliesPositionsAndScales();
});


const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)


fireflies.position.set(0.23, 0, .5)

gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('uSize');
gui.addColor(firefliesMaterial.uniforms.uColor, 'value').name('uColor');
gui.add(firefliesMaterial.uniforms.uSpeed, 'value').min(0).max(0.1).step(0.001).name('uSpeed');


scene.add(fireflies)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 0.5
camera.position.z = 1.6

camera.rotation.y = 1.225
// camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

// gui.add(camera.position, 'x').min(- 10).max(10).step(0.001).name('cameraX')
// gui.add(camera.position, 'y').min(- 10).max(10).step(0.001).name('cameraY')
// gui.add(camera.position, 'z').min(- 10).max(10).step(0.001).name('cameraZ')

// gui.add(camera.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('cameraRotationX')
// gui.add(camera.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('cameraRotationY')
// gui.add(camera.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('cameraRotationZ')


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#201919'
renderer.setClearColor(debugObject.clearColor)




/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update materials
    firefliesMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
