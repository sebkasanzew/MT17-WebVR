import "aframe";
import "babel-polyfill";
import { Entity, Scene } from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

import "file-loader?name=[name].[ext]!../index.html";

import "./aframe-components/cuttable";
import "./aframe-components/cutter";
import "./aframe-components/physics";
import "./aframe-components/extras";
// import "./aframe-components/follow";
// import "./aframe-components/grab";
// import "./aframe-components/aabb-collider";

import Assets from "./components/Assets";
import Camera from "./components/Camera";
import Controls from "./components/Controls";
import Lights from "./components/Lights";
import Domino from "./components/Domino";
import Balls from "./components/Balls";
// import Saw from "./components/Saw";

// import "aframe-animation-component";
// import "aframe-text-component";

class VRScene extends React.Component {
  /*
   constructor(props) {
   super(props);
   this.state = {};
   }
   */


  componentDidMount() {

    console.time("Scene");

    const scene = document.getElementById("sceneObject");
    if (scene) {
      scene.addEventListener("model-loaded", () => {
        console.timeEnd("Scene");
      });
    }

    /*
     console.log("Did mount");

     const scene = document.querySelector("a-scene");
     if (scene.hasLoaded) {
     run();
     } else {
     scene.addEventListener("loaded", run);
     }
     function run() {
     console.log("HAS LOADED");

     setTimeout(function() {

     }, 3000);
     }*/
  }


  render() {
    return (
        <Scene
            // debug
            // pool__domino="mixin: cube; size: 10"
            // stats
            // keyboard-shortcuts="enterVR: true; resetSensor: true"
            physics="gravity: -9.8;
                      debug: true;
                      friction: .6;
                      restitution: .3;
                      maxInterval: 0.0667;
                      contactEquationStiffness: 1e8;
                      contactEquationRelaxation: 3;
                      frictionEquationStiffness: 1e8;
                      frictionEquationRegularization: 3;"
            antialias="true"
        >

          <Assets/>

          <Camera/>

          <Controls
              static-body="shape: sphere; sphereRadius: 0.02;"
              sphere-collider="objects: .grabbable;"
              grab=""
          />

          <Lights/>

          <Entity id="work-area"
                  position="0 0 -.8">
            {/*
             <Entity position="0 1 0">
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
             */}

            <Entity // Workaround for the collider of the ground being to high
                geometry="primitive: plane; width: 100; height: 100"
                rotation="-90 0 0"
                position="0 -0.05 0"
                static-body
                material="transparent: true"
                visible="false"
            />

          </Entity>

          <Entity id="table"
                  obj-model="obj: #table-obj; mtl: #table-mtl"
                  position="-0.2 0 -1">
            <Entity id="table-collider"
                    position="0 0.27 0"
                    geometry="primitive: box;"
                    scale="1.38 0.61 0.57"
                    static-body="shape: auto"
                    material="visible: false"
            />
          </Entity>

          <Entity id="shelf"
                  obj-model="obj: #shelf-obj; mtl: #shelf-mtl"
                  position="1.2 0 0">
            <Entity mixin="shelf-collider-horizontal"
                    position="0 0.13 0"/>
            <Entity mixin="shelf-collider-horizontal"
                    position="0 0.53 0"/>
            <Entity mixin="shelf-collider-horizontal"
                    position="0 0.97 0"/>
            <Entity mixin="shelf-collider-horizontal"
                    position="0 1.38 0"/>
            <Entity mixin="shelf-collider-vertical"
                    position="0 0.5 0.92"/>
            <Entity mixin="shelf-collider-vertical"
                    position="0 0.5 -0.87"/>

            <Domino/>
          </Entity>

          <Entity id="ground"
                  obj-model="obj: #ground-obj; mtl: #ground-mtl"/>

          <Entity id="scene"
                  obj-model="obj: #scene-obj; mtl: #scene-mtl"
                  shadow="receive: true;"/>

          {/*<Entity id="sceneObject"
           gltf-model="url(../../assets/3d/scene/Scene.gltf)"/>*/}

          {/*<Entity id="sceneObject"
           collada-model="url(../../assets/3d/scene/Scene.dae)"/>*/}


          <Entity position="-.6 4.6 -1">
            <Entity id="bucket"
                    obj-model="obj: #bucket-obj;"
                    mixin="bucket-mat"
                    static-body="shape: auto;"
                    cuttable
                    position="0 -4 0">
            </Entity>
            <Balls/>
          </Entity>

          <Entity id="empty-bucket"
                  obj-model="obj: #bucket-obj;"
                  mixin="bucket-mat"
                  static-body="shape: auto;"
                  position="-1 0 -.2">
          </Entity>

          <a-sky src="#stars"/>

        </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector("#scene-container"));
