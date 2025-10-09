/**
 * @file This script leverages the Theatre.js library to create and manage interactive animations.
 * It initializes a Theatre.js project, defines an animatable object representing an "eyeball,"
 * and links its properties to a DOM element. The animation is triggered by a user click.
 */
import * as core from '@theatre/core';
import {getProject, types as t} from "@theatre/core"
import studio from '@theatre/studio';
// import state from './state.json'

// Initialize Theatre.js Studio only in development mode for animation editing and debugging.
if (import.meta.env.MODE === 'development') {
  studio.initialize()
}
// Hide the Theatre.js UI by default. It can be toggled by pressing Alt + \.
studio.ui.hide()

// Create a new Theatre.js project named "G.O.D" and a sheet (timeline) named "Scene".
const proj = core.getProject("G.O.D")
const sheet = proj.sheet("Scene")
const animation = sheet.sequence
animation.position = 0
animation.scaleY = 0
animation.scaleX = 0


// Define an animatable object named "Eyeball" within the sheet.
// This object has properties for position, stretch, and light, which can be controlled and animated.
const eyeball = sheet.object("Eyeball", {
  position: t.compound({
    x: t.number(0, {
      range: [-60, 60],
      label: "Horizontal"
    }),
    y: t.number(0, {
      range: [-70, 70],
      label: "Vertical"
    })
  }),
  stretch: t.compound({
    x: t.number(0, {
      range: [0, 20],
      label: "ScaleX"
    }),
    y: t.number(0, {
      range: [0, 20],
      label: "ScaleY"
    })
  }),
  light: t.stringLiteral(
    "green", 
    {
      green: "Green",
      red: "Red",
      yellow: "Yellow",
    },
    {as: "switch"}
  ),
})

// Select the DOM element with the class "god__eye" to apply the animations to.
const eye = document.querySelector('.god__eye')
 
// setTimeout(() => {
//   document.appendChild(eye)
// })

// Listen for changes in the "Eyeball" object's values and update the DOM element's style accordingly.
// This creates a live link between the Theatre.js animation and the visual representation on the page.
eyeball.onValuesChange((newValues) => {
  eye.style.left = `${newValues.position.x}px`
  eye.style.top = `${newValues.position.y}px`
  eye.style.transform = `scaleX(${newValues.stretch.x}) scaleY(${newValues.stretch.y})`
})

// Add a click event listener to the eye element to trigger the animation sequence.
// When clicked, the animation will play from frame 0 to 9.
eye.addEventListener("click", () => {
  animation.play(
  {
    range: [ 0, 9]
  })
})








