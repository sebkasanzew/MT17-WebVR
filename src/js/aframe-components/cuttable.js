import AFRAME, { THREE } from "aframe";

"use strict";

const SubtractWorker = require("worker-loader?name=subtractWorker.[hash].js!../../worker/subtractWorker.js");
//import { SubtractWorker } from "worker-loader?!../../worker/subtractWorker.js";


AFRAME.registerComponent("cuttable", {
  schema: {
    cutter: {
      type: "selector",
      default: "a-entity[cutter]"
    }
  },
  init() {
    // this.addKeyboardEvents();
    this.addViveControllerEvents();

    console.info("WebWorker working:" + SubtractWorker);

    this.subtractWorker = new SubtractWorker();

    this.subtractWorker.addEventListener("message", function(e) {
      if (e.data.code === "complete" && e.data.mesh) {
        this.applyMesh(e.data.mesh);
      } else {
        console.log(e.data);
      }
    }, false);
  },
  update() {

  },
  subtractMeshes() {
    const cuttable = this.el;
    const cutter = this.data.cutter;

    this.subtractWorker.postMessage({
      cmd: "start",
      cuttable,
      cutter
    });
  },
  applyMesh(data) {
    this.el.getObject3D("mesh").geometry = new THREE.BufferGeometry().fromGeometry(data.geometry);
  },
  addKeyboardEvents() {
    document.addEventListener("keydown", (evt) => {
      const keyName = evt.key;

      if (keyName === "Control") {
        return;
      }

      if (event.ctrlKey) {
        switch (keyName) {
          case "q":
            // this.unionMeshes();
            break;
        }
      } else {
        let currentPos;

        switch (keyName) {
          case "q":
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
  addViveControllerEvents() {
    const rightController = document.getElementById("controllerRight");

    rightController.addEventListener("triggerdown", () => {
      this.subtractMeshes();
    });
  }
});
