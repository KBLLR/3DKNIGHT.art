import {Curtains, Plane} from "curtainsjs";
import $ from "jquery";
import * as THREE from 'three'
import * as PIXI from "pixi.js"
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
import gsap from 'gsap'
import { easePack } from 'gsap'
import { WebGLRenderer } from "three";
import * as core from '@theatre/core';
import {getProject, types as t} from "@theatre/core"
import studio from '@theatre/studio';
import state from './state.json'

// Only initialises Studio on development mode 
// if (process.env.NODE_ENV === "development") {
studio.initialize()
// }
// To hide/show the UI pressing alt + \
studio.ui.hide()

// Creates the project and the scene (Sheet as it acts like a spreadheet)
const proj = core.getProject("G.O.D")
const sheet = proj.sheet("Scene")
const animation = sheet.sequence
animation.position = 0
animation.position = 9


// Add the elements to the scene

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

const eye = document.getElementById('god__eye')

setTimeout(() => {
  document.appendChild(eye)
})

eyeball.onValuesChange((newValues) => { 
  eye.style.left = newValues.position.x + 'px'
  eye.style.top = newValues.position.y + 'px'
})

eye.addEventListener("click", () => {
  animation.play(
  {
    range: [ 0, 9]
  })
})










