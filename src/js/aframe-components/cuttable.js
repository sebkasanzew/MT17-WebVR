import AFRAME from "aframe";

const THREE = AFRAME.THREE;
const ThreeBSP = require("three-js-csg")(THREE);

/* global console:true */

"use strict";

if (typeof AFRAME === "undefined") {
  throw new Error("Component attempted to register before AFRAME was available.");
}

AFRAME.registerComponent("cuttable", {
  schema: {},
  init() {

  },
  update() {
    const mesh = this.el.getObject3D("mesh");

    if (!mesh) {
      return;
    }

    const box = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(mesh.geometry));
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(.7, 32, 32));

    const sBSP = new ThreeBSP(sphere);
    const bBSP = new ThreeBSP(box);

    const sub = bBSP.subtract(sBSP);
    const newMesh = sub.toMesh();

    mesh.geometry = newMesh.geometry;
  },
  remove() {

  }
});
