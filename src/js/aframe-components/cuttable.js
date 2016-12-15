//import AFRAME, {THREE} from "aframe";
import AFRAME, {THREE} from "../../temp/aframe-master";

"use strict";

const ThreeBSP = require("three-js-csg")(THREE);

AFRAME.registerComponent("cuttable", {
  schema: {
    cutter: {
      type: "selector",
      default: document.querySelector("a-entity[cutter]")
    }
  },
  init() {
    document.addEventListener("keydown", (evt) => {
      const keyName = evt.key;

      if (keyName === "Control") {
        return;
      }

      if (event.ctrlKey) {
        switch (keyName) {
        case "q":
          this.updateBSP();
          this.unionMeshes();
          break;
        }
      } else {
        let currentPos;

        switch (keyName) {
        case "q":
          this.updateBSP();
          this.subtractMeshes();
          break;
        case "e":
          currentPos = this.data.cutter.getAttribute("position");
          currentPos.x += 0.1;
          this.data.cutter.setAttribute("position", currentPos);
          break;
        case "r":
          currentPos = this.data.cutter.getAttribute("position");
          currentPos.x -= 0.1;
          this.data.cutter.setAttribute("position", currentPos);
          break;
        }
      }
    });
  },
  update() {

  },
  updateBSP() { // we do the update inside the modifier functions, right before the BSP is needed
    const cuttableMesh = this.el.getObject3D("mesh");
    const cutterMesh = this.data.cutter.getObject3D("mesh");

    // cancel, if one of the objects is missing
    if (!cuttableMesh || !cutterMesh) {
      return;
    }

    const cuttableWorldMatrix = this.el.object3D.matrixWorld;
    const cutterWorldMatrix = this.data.cutter.object3D.matrixWorld;

    // create Three meshes out of the scene objects
    const cuttable = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(cuttableMesh.geometry));
    const cutter = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(cutterMesh.geometry));

    // apply the world matrices from the origin objects
    cuttable.applyMatrix(cuttableWorldMatrix);
    cutter.applyMatrix(cutterWorldMatrix);

    this.cuttableObject = new ThreeBSP(cuttable);
    this.cutterObject = new ThreeBSP(cutter);
  },
  subtractMeshes() {
    this.updateBSP();
    console.time("subtract meshes");
    if (!this.cutterObject || !this.cuttableObject) {
      return;
    }

    const subtractedMeshBSP = this.cuttableObject.subtract(this.cutterObject);
    const newMesh = subtractedMeshBSP.toMesh();

    this.el.getObject3D("mesh").geometry = new THREE.BufferGeometry().fromGeometry(newMesh.geometry);
    console.timeEnd("subtract meshes");
  },
  unionMeshes() {
    this.updateBSP();
    console.time("union meshes");

    if (!this.cutterObject || !this.cuttableObject) {
      return;
    }

    const summedMeshBSP = this.cuttableObject.union(this.cutterObject);
    const newMesh = summedMeshBSP.toMesh();

    this.el.getObject3D("mesh").geometry = new THREE.BufferGeometry().fromGeometry(newMesh.geometry);
    console.timeEnd("union meshes");
  },
  remove() {

  }
});
