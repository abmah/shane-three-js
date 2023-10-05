import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProject, types, val } from '@theatre/core'
import studio from '@theatre/studio'
import projectState from './animation03.json'
import Lenis from '@studio-freight/lenis'
import { lerp } from 'three/src/math/MathUtils'


const lenis = new Lenis({ lerp: .1 })





/**
 * Loaders
 */
let counterHidden = document.getElementsByClassName('counter-hidden')[0];
let loader = document.getElementsByClassName('loader')[0];
let loaderText = document.querySelector('.loader-text');
let isAnimating = false;
const flipQueue = [];

function processFlipQueue() {
    if (!isAnimating && flipQueue.length > 0) {
        isAnimating = true;
        if (flipQueue.length > 1) {
            flipQueue.splice(0, flipQueue.length - 1);
        }
        const nextValue = flipQueue.shift();
        flipDigits(nextValue);
        setTimeout(() => {
            isAnimating = false;
            processFlipQueue();
        }, 1300);
    } else if (flipQueue.length == 0) {
        setTimeout(() => {
            counterHidden.style.transform = 'translateY(200%)';
            counterHidden.style.transition = 'transform .7s cubic-bezier(0.77, 0, 0.175, 1)';
            loaderText.style.transform = 'translateY(200%)';
            loaderText.style.transition = 'transform .4s cubic-bezier(0.77, 0, 0.175, 1)';
        }, 500);
        setTimeout(() => {
            loader.style.transform = 'translateY(-100%)';
            loader.style.transition = 'transform .5s cubic-bezier(0.77, 0, 0.175, 1)';
        }, 1000);
        playHtmlAnimations()

    }
}

const loadingManager = new THREE.LoadingManager(
    () => { },
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        flipQueue.push(Math.round(progressRatio * 100));
        processFlipQueue();
    }
);

// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

// Draco loader
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)


/**
 * HTML animations
 */

const aboutLink = document.querySelector('.about-link');
const logo = document.querySelector('.logo');
const btnPrimary = document.querySelector('.btn-primary');
const heroTitleFirst = document.querySelector('.hero-title span');
const heroTitleSecond = document.querySelector('.hero-title-second span');
const heroSub1 = document.querySelector('.hero-sub-1');
const heroSub2 = document.querySelector('.hero-sub-2');
const heroSub3 = document.querySelector('.hero-sub-3');
const logoOverlay = document.querySelector('.logo-overlay');
const card = document.querySelectorAll('.card');


function playHtmlAnimations() {

    aboutLink.style.animation = 'fadein 1s ease-in-out forwards';
    logo.style.animation = 'fadein 1s ease-in-out 1s forwards';
    btnPrimary.style.animation = 'fadein .5s ease-in-out 1.4s forwards';
    heroTitleFirst.style.animation = 'reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards';
    heroTitleSecond.style.animation = 'reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.6s forwards';
    heroSub1.style.animation = 'reveal 1s cubic-bezier(0.77, 0, 0.175, 1) 0.9s forwards';
    heroSub2.style.animation = 'reveal 1s cubic-bezier(0.77, 0, 0.175, 1) 1s forwards';
    heroSub3.style.animation = 'reveal 1s cubic-bezier(0.77, 0, 0.175, 1) 1.1s forwards';
    gsap.to(cameraGroup.position, { duration: 3, y: 0, ease: 'power2.inOut' });
    logoOverlay.style.animation = 'overlayfadein 3s ease 1s forwards';
    card[0].style.animation = 'fadeinslideup 1s ease-in-out 1.8s forwards';
    card[1].style.animation = 'fadeinslideup 1s ease-in-out 1.6s forwards';
    card[2].style.animation = 'fadeinslideup 1s ease-in-out 1.9s forwards';

}


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
const environmentMapTexture = cubeTextureLoader.load([
    '/environmentMaps/0/px.jpg',
    '/environmentMaps/0/nx.jpg',
    '/environmentMaps/0/py.jpg',
    '/environmentMaps/0/ny.jpg',
    '/environmentMaps/0/pz.jpg',
    '/environmentMaps/0/nz.jpg'
])

/**
 * Materials
 */

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2

material.envMap = environmentMapTexture


const transparentMaterial = new THREE.MeshStandardMaterial()
transparentMaterial.metalness = 0.9
transparentMaterial.roughness = 0.1
transparentMaterial.envMap = environmentMapTexture




/**
 * Model
 */
gltfLoader.load(
    'testModelnew.glb',
    (gltf) => {
        gltf.scene.scale.set(0.1, 0.1, 0.1)
        scene.add(gltf.scene)

        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.name.startsWith('Cube')) {
                child.material = material

            } else {
                if (child.name.startsWith('transparent')) {
                    child.material = transparentMaterial
                }
            }
        })
    }
)



//ambiant light
const ambiantLight = new THREE.AmbientLight(0xffffff, .1)
scene.add(ambiantLight)

// directional light
const directionalLight = new THREE.DirectionalLight(0xfff8, 0.5)
directionalLight.position.set(0.25, 3, -2.25)
scene.add(directionalLight)

/**
 * Fog
 */
const fog = new THREE.Fog('#ffffff', 1, 35)
scene.fog = fog


/**
 * Fireflies
 */

let alphaBitTexture = textureLoader.load('bitcoin-logo.png')
let alphaEthTexture = textureLoader.load('eth.png')
let alphaThetherTexture = textureLoader.load('tether.png')
let alphaBNBTexture = textureLoader.load('bnb.png')
let firefliesCount = 200;


let alphaTextures = [
    alphaBitTexture,
    alphaEthTexture,
    alphaThetherTexture,
    alphaBNBTexture
];

function getRandomAlphaTexture() {
    // Generate a random index within the range of the alphaTextures array
    let randomIndex = Math.floor(Math.random() * alphaTextures.length);

    // Return the randomly selected alpha texture
    return alphaTextures[randomIndex];
}


const firefliesGeometry = new THREE.BufferGeometry();


function setFirefliesPositionsAndScales() {
    const positionArray = new Float32Array(firefliesCount * 3);
    const scaleArray = new Float32Array(firefliesCount);
    const alphaTextureArray = new Array(firefliesCount);

    for (let i = 0; i < firefliesCount; i++) {
        positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
        positionArray[i * 3 + 1] = Math.random() * 1.5;
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

        scaleArray[i] = Math.random();
        alphaTextureArray[i] = getRandomAlphaTexture();
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
        uSize: { value: 45 },
        uColor: { value: new THREE.Color('#474747') },
        uSpeed: { value: 0.03 },
        uAlphaTexture: { value: alphaTextures[1] }
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

// temporary funcitons 




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
camera.position.y = .8
camera.position.z = 1.6



camera.rotation.y = 1.225

const cameraGroup = new THREE.Group()
cameraGroup.add(camera)

cameraGroup.position.y = .5

scene.add(cameraGroup)

gui.add(camera.position, 'x').min(- 100).max(100).step(0.001).name('cameraX')
gui.add(camera.position, 'y').min(- 100).max(100).step(0.001).name('cameraY')
gui.add(camera.position, 'z').min(- 100).max(100).step(0.001).name('cameraZ')

gui.add(camera.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('cameraRotationX')
gui.add(camera.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('cameraRotationY')
gui.add(camera.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('cameraRotationZ')


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


/* Theatre js */

// studio.initialize()



// create project 
const project = getProject('Shane project 2', { state: projectState })
const sheet = project.sheet('Animated scene')
const sequenceLength = val(sheet.sequence.pointer.length);
window.addEventListener('click', () => {
    console.log(sheet)
    console.log(sequenceLength)
    sheet.sequence.play({ iterationCount: Infinity })
})

window.addEventListener('dblclick', () => {

    sheet.sequence.position = 0
})

const cameraObject = sheet.object('Camera', {
    // Note that the rotation and position are in radians
    // (full rotation: 2 * Math.PI)
    rotation: types.compound({
        x: types.number(camera.rotation.x, { range: [-2, 2] }),
        y: types.number(camera.rotation.y, { range: [-2, 2] }),
        z: types.number(camera.rotation.z, { range: [-20, 20] }),
    }),
    position: types.compound({
        x: types.number(camera.position.x, { range: [-100, 100] }),
        y: types.number(camera.position.y, { range: [-100, 100] }),
        z: types.number(camera.position.z, { range: [-100, 100] }),
    }),
})

cameraObject.onValuesChange((values) => {
    camera.rotation.set(values.rotation.x, values.rotation.y, values.rotation.z)
    camera.position.set(values.position.x, values.position.y, values.position.z)
})


// console.log(projectState)
let scrollPercentage = 0
let transitionOne = document.getElementById('transition-one')
function logScrollPercentage() {
    // Calculate the scroll percentage
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    scrollPercentage = scrollPosition / (documentHeight - windowHeight);

    // Log the scroll percentage
    // console.log(`Scroll Percentage: ${scrollPercentage.toFixed(4)}`);
    sheet.sequence.position = scrollPercentage * sequenceLength;

}

// Attach the function to the scroll event
window.addEventListener('scroll', logScrollPercentage);



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = (time) => {


    const elapsedTime = clock.getElapsedTime()

    lenis.raf(time)

    console

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
