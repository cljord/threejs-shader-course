import './style.css'
import * as THREE from 'three/webgpu'
import { Fn, length, fract, positionLocal, step, sin, time, abs, atan, vec3, cos, rotateUV, vec2 } from 'three/tsl'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10
)
camera.position.z = 1

const renderer = new THREE.WebGPURenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Animated resizing rings
//const main = Fn(() => {
  //const p = positionLocal.toVar()

  //p.mulAssign(5)
  //p.assign(p.fract().sub(0.5))
  //p.assign(length(p))
  //p.assign(sin(p.mul(10).add(time)))
  //p.assign(abs(p))
  //p.assign(step(0.5, p))

  //return p
//})

// Original psychedelic swirl
//const main = Fn(() => {
  //const p = positionLocal.toVar()
  //p.assign(rotateUV(p.xy, time, vec2()))
  //p.assign(length(p.mul(5)).sub(atan(p.zy, p.zx)).mul(5))
  //p.sinAssign()
  //p.mulAssign(5)
  //p.assign(vec3(p.x.add(sin(time).mul(5)), p.y.add(cos(time).mul(5)), 0))
  //return p
//})

const main = Fn(() => {
  const p = positionLocal.toVar()

  p.assign(length(p.mul(5)).sub(atan(p.zy, p.zx)).mul(5))
  p.assign(sin(p))
  p.mulAssign(5)

  p.assign(rotateUV(p.xy, time, vec2()))

  p.assign(vec3(p.x.add(sin(time)).mul(5), p.y.add(cos(time).mul(5)), 0))

  return p
})

// Checkered cube 
//const material = new THREE.NodeMaterial()
//material.fragmentNode = positionLocal.mul(4.9999).fract().step(0.5)

//const mesh = new THREE.Mesh(new THREE.BoxGeometry(), material)
//scene.add(mesh)

// Ringed cube
//const material = new THREE.NodeMaterial()
//material.fragmentNode = positionLocal.length().mul(15).fract().step(0.5)

//const mesh = new THREE.Mesh(new THREE.BoxGeometry(), material)
//scene.add(mesh)

const material = new THREE.NodeMaterial()
material.fragmentNode = main()

const mesh = new THREE.Mesh(new THREE.BoxGeometry(), material)
scene.add(mesh)

// renderer.debug.getShaderAsync(scene, camera, mesh).then((e) => {
//   //console.log(e.vertexShader)
//   console.log(e.fragmentShader)
// })

function animate() {
  controls.update()

  renderer.render(scene, camera)
}