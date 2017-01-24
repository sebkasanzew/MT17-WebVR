import "aframe";
import "babel-polyfill";
import { Entity, Scene } from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

// import "./aframe-components/cuttable";
// import "./aframe-components/cutter";
import "./aframe-components/physics";
import "./aframe-components/extras";
// import "./aframe-components/follow";
// import "./aframe-components/grab";
// import "./aframe-components/aabb-collider";

import Assets from "./components/Assets";
import Camera from "./components/Camera";
import Controls from "./components/Controls";
import Lights from "./components/Lights";
// import Saw from "./components/Saw";

// import "aframe-animation-component";
// import "aframe-text-component";
// import "aframe-teleport-controls";
// import "super-hands";

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Scene
            // debug
            // pool="mixin: board; size: 10" -> TODO for aframe 0.4.0
            // stats
            // keyboard-shortcuts="enterVR: true; resetSensor: true"
            physics="gravity: -9.8; debug: false;"
            antialias="true"
        >

          <Assets/>

          <Camera/>

          <Controls
              // teleport-controls="true"
              static-body="shape: sphere; sphereRadius: 0.02;"
              sphere-collider="objects: .cube;"
              grab=""
          />

          <Lights/>

          <Entity position="0 0 -1">
            {/*
            <Entity
                id="firstBox"
                geometry="primitive: box"
                material="src: #wood-toon"
                position="0 0.5 0.8"
                rotation="0 30 0"
                static-body="shape: box;"
                width="1"
                height="1"
                depth="1"
                // shadow="receive: true; cast: true;"
                // sound="src: #saw-running; autoplay: true; loop: true"
            />
            */}

            <Entity position="0 2 .5">
              <Entity mixin="cube"
                      shadow="cast: true;"
                      className="cube"
                      position="0.35 0 0"/>
              <Entity mixin="cube"
                      shadow="cast: true;"
                      className="cube"
                      position="0 0 0"/>
              <Entity mixin="cube"
                      shadow="cast: true;"
                      className="cube"
                      position="-0.35 0 0"/>
            </Entity>

            <Entity
                geometry="primitive: plane; width: 10; height: 10"
                rotation="-90 0 0"
                position="4 0.05 -2.5"
                shadow="receive: true;"
                material="src: #ground;" // color: #FFF
            />

            <Entity // Workaround for the collider of the ground being to high
                geometry="primitive: plane; width: 100; height: 100"
                rotation="-90 0 0"
                position="0 -0.05 0"
                static-body
                material="transparent: true"
            />

          </Entity>

          <Entity obj-model="obj: #scene-obj; mtl: #scene-mtl"
                  // shadow="receive: true;"
                  position="4 .01 -2.5"/>

          <a-sky src="#stars"/>

        </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector("#scene-container"));
