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

      if (keyName === 'Control') {
        return;
      }

      if (event.ctrlKey) {
        switch (keyName) {
          case "q":
            this.addMesh();
            break;
        }
      } else {
        switch (keyName) {
          case "q":
            this.subtractMesh();
            break;
        }
      }
    });

    console.log("data:", this.data.cutter);
  },
  update() {
    this.updateBSP();
  },
  updateBSP() {
    const cuttableMesh = this.el.getObject3D("mesh");
    // const cutterMesh = this.data.cutter.getObject3D("mesh");

    // console.log(cutterMesh);

    if (!cuttableMesh /*|| cutterMesh*/) {
      return;
    }

    const cuttableObject = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(cuttableMesh.geometry));
    const cutterObject = new THREE.Mesh(new THREE.SphereGeometry(.7, 32, 32));

    this.cutterObject = new ThreeBSP(cutterObject);
    this.cuttableObject = new ThreeBSP(cuttableObject);
  },
  subtractMesh() {
    if (!this.cutterObject || !this.cuttableObject) {
      return;
    }

    const subtractedMeshBSP = this.cuttableObject.subtract(this.cutterObject);
    const newMesh = subtractedMeshBSP.toMesh();

    this.el.getObject3D("mesh").geometry = newMesh.geometry;

    this.updateBSP();
  },
  addMesh() {
    if (!this.cutterObject || !this.cuttableObject) {
      return;
    }

    const summedMeshBSP = this.cuttableObject.union(this.cutterObject);
    const newMesh = summedMeshBSP.toMesh();

    this.el.getObject3D("mesh").geometry = newMesh.geometry;

    this.updateBSP();
  },
  remove() {

  }
});
