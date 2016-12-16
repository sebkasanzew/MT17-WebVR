// import AFRAME from "aframe";
import AFRAME/*, {THREE}*/ from "../../temp/aframe-master";

"use strict";

AFRAME.registerComponent("follow", {
  schema: {
    target: {type: "selector"}
  },
  init() {

  },
  update() {

  },
  tick() {
    this.el.setAttribute("position", this.data.target.getAttribute("position"));

    /*const worldMatrix = this.data.target.object3D.matrixWorld;
    this.el.object3D.applyMatrix(worldMatrix);*/
  }
});
