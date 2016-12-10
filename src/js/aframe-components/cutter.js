import AFRAME from "aframe";

// const THREE = AFRAME.THREE;
// const ThreeBSP = require("three-js-csg")(THREE);

/* global console:true */

"use strict";

if (typeof AFRAME === "undefined") {
  throw new Error("Component attempted to register before AFRAME was available.");
}

AFRAME.registerComponent("cutter", {
  schema: {},
  update() {

  },
  remove() {

  }
});
