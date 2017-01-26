import { Entity } from "aframe-react";
import React, { Component } from "react";

export default class Saw extends Component {
  attachToController() {
    // console.log("$");
  }

  componentWillUpdate() {
    /*
    const saw = sceneEl.getElementById("saw");
    const controller = evt.detail.target.object3D;
    // console.log(evt.detail.target.object3D.position);

    saw.setAttribute("position", controller.position);
    saw.setAttribute("rotation", controller.rotation);
    */
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    this.attachToController();
  }

  render() {
    return (
        <Entity
            id="saw"
            geometry="primitive: cylinder; height: 0.005; radius: 0.1"
            rotation="0 0 90"
            position="0 -0.1 0.05"
            {... this.props}
        />
    );
  }
}
