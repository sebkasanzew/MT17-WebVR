import "aframe";
// import "aframe-animation-component";
// import "aframe-text-component";
import "aframe-teleport-controls";
import "babel-polyfill";
import {Entity, Scene} from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

import "./aframe-components/cuttable";
import "./aframe-components/cutter";
import "./aframe-components/extras";
import "./aframe-components/follow";
// import "./aframe-components/grab";
// import "./aframe-components/aabb-collider";

import Assets from "./components/Assets";
import Camera from "./components/Camera";
import Controls from "./components/Controls";
import Lights from "./components/Lights";
// import Saw from "./components/Saw";

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Scene
            debug
            // pool="mixin: board; size: 10" -> TODO for aframe 0.4.0
            stats
            keyboard-shortcuts="enterVR: true; resetSensor: true"
            physics="gravity: -9.8; debug: false;"
            antialias="true">

          <Assets/>

          <Camera/>

          <Controls
              // teleport-controls="true"
              static-body="shape: sphere; sphereRadius: 0.02;"
              sphere-collider="objects: .cube;"
              grab
              /*
               events={{
               gripdown: () => {
               console.log("gripdown");
               },
               trackpaddown: () => {
               console.log("trackpaddown");
               },
               menudown: () => {
               console.log("menudown");
               },
               systemdown: () => {
               console.log("systemdown");
               },
               // buttondown: () => {console.log("buttondown");},
               // touchstart: () => {console.log("touchstart");},
               triggerdown: () => {
               console.log("triggerdown");
               },
               // triggerup: () => {console.log("triggerup");},
               }}
               */
          />

          {/*
          <Saw
              id="saw"
              follow="target: #controllerRight"
          />
          */}

          <Lights/>

          {/*
           <Entity collada-model="#mainTable"
           position="0 0 -1"

           // TODO resolve errors and warnings which is caused by wrong normals
           static-body="shape: hull;"
           />
           */}

          <Entity position="0 0 -2">
            <Entity
                id="firstBox"
                geometry="primitive: box"
                material="src: #wood-toon"
                cuttable="cutter: #cutter"
                position="0 0.5 0.8" rotation="0 30 0"
                static-body="shape: box;s"
                width="1"
                height="1"
                depth="1"
                // sound="src: #saw-running; autoplay: true; loop: true"
            >
            </Entity>

            <Entity position="0 3 1">
              <Entity class="cube" mixin="cube" dynamic-body position="0.35 0 0"/>
              <Entity class="cube" mixin="cube" dynamic-body position="0 0 0"/>
              <Entity class="cube" mixin="cube" dynamic-body position="-0.35 0 0"/>
            </Entity>

            <Entity
                geometry="primitive: plane; width: 100; height: 100"
                rotation="-90 0 0"
                material="src: #wood-planks; repeat: 100 100"
            />
            <Entity // Workaround for the collider of the ground being to high
                geometry="primitive: plane; width: 100; height: 100"
                rotation="-90 0 0"
                position="0 -0.1 0"
                static-body=""
                material="transparent: true"
            />
          </Entity>

          <Entity
              id="cutter"
              geometry="primitive: box; width: 0.1; height: 0.1; depth: 0.1"
              material="color: #333; wireframe: true"
              cutter
              follow="target: #controllerRight"
          />

        </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector("#scene-container"));
