// import AFRAME from "aframe";
import AFRAME, {THREE} from "../../temp/aframe-master";

"use strict";

AFRAME.registerComponent("follow", {
  schema: {
    // type: "selector",
    target: {type: "selector"}
  },
  init() {
    /*
    this.initialPosition = this.el.getAttribute("position");
    this.initialRotation = this.el.getAttribute("rotation");
    console.log(this.el.getObject3D("mesh"));
    */
    this.initialMatrix = this.el.getObject3D("mesh").matrix;
  },
  update() {
    this.target = this.data.target;
    this.targetMesh = this.target.getObject3D("mesh");
  },
  tick() {
    /*
    const matrix = new THREE.Matrix();
    matrix.applyMatrix(this.initialMatrix).applyMatrix(this.targetMesh.matrix);
    this.el.getObject3D("mesh").matrix.applyMatrix(matrix);
    */
  }
});
