import "aframe";
import "aframe-animation-component";
import "aframe-text-component";
import "babel-polyfill";
import {Entity, Scene} from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

import "./aframe-components/cuttable";
import "./aframe-components/extras";
import "./aframe-components/physics";
import "./aframe-components/grab";
import "./aframe-components/aabb-collider";

import Assets from "./components/Assets";
import Camera from "./components/Camera";
import Lights from "./components/Lights";

import "./sandbox/vive-hands";

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
            keyboard-shortcuts="enterVR: true; resetSensor: true"
            physics="gravity: -9.8"
            antialias="true">

          <Assets/>

          <Camera/>

          <Lights/>

          <Entity collada-model="#mainTable"
                  position="2 0 -1"
              /*
               TODO resolve warnings which is caused by asynchronous calls/loading
               static-body="shape: hull;"
               */
          />

          <Entity position="0 0 -1">
            <Entity class="cube" mixin="cube" position="0.30 1.65 0"/>
            <Entity class="cube" mixin="cube" position="0 1.95 0"/>
            <Entity class="cube" mixin="cube" position="-0.30 1.65 0"/>

            <Entity class="cube" mixin="cube" position="0.60 1.35 0"/>
            <Entity class="cube" mixin="cube" position="0.60 1.05 0"/>
            <Entity class="cube" mixin="cube" position="0.60 0.75 0"/>
            <Entity class="cube" mixin="cube" position="0.60 0.45 0"/>
            <Entity class="cube" mixin="cube" position="0.60 0.15 0"/>

            <Entity class="cube" mixin="cube" position="0.30 0.75 0"/>
            <Entity class="cube" mixin="cube" position="0 0.75 0"/>
            <Entity class="cube" mixin="cube" position="-0.30 0.75 0"/>

            <Entity class="cube" mixin="cube" position="-0.60 1.35 0"/>
            <Entity class="cube" mixin="cube" position="-0.60 1.05 0"/>
            <Entity class="cube" mixin="cube" position="-0.60 0.75 0"/>
            <Entity class="cube" mixin="cube" position="-0.60 0.45 0"/>
            <Entity class="cube" mixin="cube" position="-0.60 0.15 0"/>
          </Entity>

          <Entity position="0 0 -3">
            <Entity id="firstBox"
                    geometry="primitive: box"
                    material="src: #wood-toon"
                    cuttable=""
                    position="-1 0.5 0.8" rotation="0 45 0"
                    width="1"
                    height="1" depth="1" color="#4CC3D9">
            </Entity>

            {/* sound="src: #saw-running; autoplay: false; loop: true"> */}

            <Entity geometry="primitive: plane; width: 100; height: 100"
                    rotation="-90 0 0"
                    static-body=""
                    material="src: #wood-planks; repeat: 100 100">
            </Entity>
          </Entity>

        </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector(".scene-container"));
