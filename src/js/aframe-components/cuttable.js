//import AFRAME, {THREE} from "aframe";
import AFRAME, {THREE} from "../../temp/aframe-master";

const ThreeBSP = require("three-js-csg")(THREE);

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
