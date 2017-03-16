import { THREE } from "aframe";

const ThreeBSP = require("three-js-csg")(THREE);

self.addEventListener("message", function(e) {

  const data = e.data;

  switch (data.cmd) {
    case "start":
      self.postMessage({
        code: "complete",
        mesh: subtract(data.cuttable, data.cutter)
      });
      break;
    case "stop":
      self.close();
      break;
    default:
      self.postMessage("Unknown command: " + data.msg);
  }

  self.postMessage(e.data);
}, false);

const subtract = function(cuttable, cutter) {
  "use strict";

  // cancel, if one of the objects is missing
  if (!cuttable || !cutter) {
    return;
  }

  let cuttableMesh = cuttable.getObject3D("mesh");
  let cutterMesh = cutter.getObject3D("mesh");

  const cuttableWorldMatrix = this.el.object3D.matrixWorld;
  const cutterWorldMatrix = this.data.cutter.object3D.matrixWorld;

  // create Three meshes out of the scene objects
  cuttableMesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(cuttableMesh.geometry));
  cutterMesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(cutterMesh.geometry));

  // apply the world matrices from the origin objects
  cuttableMesh.applyMatrix(cuttableWorldMatrix);
  cutterMesh.applyMatrix(cutterWorldMatrix);

  const cuttableBSP = new ThreeBSP(cuttable);
  const cutterBSP = new ThreeBSP(cutter);

  if (!cuttableBSP || !cutterBSP) {
    return;
  }

  const subtractedMeshBSP = this.cuttableObject.subtract(this.cutterObject);
  const newMesh = subtractedMeshBSP.toMesh();

  return new THREE.BufferGeometry().fromGeometry(newMesh.geometry);
};
