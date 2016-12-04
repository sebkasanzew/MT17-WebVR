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
  init: function() {
    const box = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(this.el.getObject3D('mesh').geometry));
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(.7, 32, 32));

    const sBSP = new ThreeBSP(sphere);
    const bBSP = new ThreeBSP(box);

    const sub = bBSP.subtract(sBSP);
    const newMesh = sub.toMesh();

    newMesh.material = new THREE.MeshPhongMaterial({
      color: 0xdddddd,
      specular: 0x1a1a1a,
      shininess: 30,
      // shading: THREE.FlatShading
    });

    this.el.removeAttribute('geometry');
    this.el.setObject3D('firstBox', newMesh);
  },
  update: function() {

  },
  remove: function() {
    this.el.removeObject3D('mesh');
  }
});
