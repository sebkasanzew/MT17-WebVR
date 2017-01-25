import "../aframe-components/physics";
import React, { Component } from "react";
// import "super-hands";

/*
 import saw from "../../assets/sound/saw_running.ogg";
 import wood from "../../assets/img/tex/wood_texture_by_dellot.jpg";
 */


export default class Assets extends Component {
  render() {
    // const ASSETS_DIR = "../../assets/";
    // Audio
    const sawRunning = require("../../assets/sound/saw_running.ogg");
    const sawBegin = require("../../assets/sound/saw_begin.ogg");
    const sawEnd = require("../../assets/sound/saw_end.ogg");

    // Models
    const sceneObj = require("../../assets/3d/scene/Scene.obj");
    const sceneMtl = require("../../assets/3d/scene/Scene.mtl");
    const sceneGLTF = require("../../assets/3d/scene/Scene.gltf");
    const groundObj = require("../../assets/3d/scene/Ground.obj");
    const groundMtl = require("../../assets/3d/scene/Ground.mtl");

    // Images
    const woodToon = require("../../assets/img/tex/wood_texture_by_dellot.jpg");
    const stars = require("../../assets/img/360/stars_optimized.png");
    // const ground = require("../../assets/img/tex/GroundCompleteMap_optimized.png");

    return (
        <a-assets timeout="10000">
          {/* Audio */} {/*src="assets/sound/saw_running.ogg"*/}
          <audio id="saw-running" src={sawRunning}/>
          <audio id="saw-begin" src={sawBegin}/>
          <audio id="saw-end" src={sawEnd}/>

          {/* Models */}
          {/*<a-asset-item id="mainTable" src="assets/3d/mainTable/IKEA Tisch.dae"/>*/}
          <a-asset-item id="scene-obj" src={sceneObj}/>
          <a-asset-item id="scene-mtl" src={sceneMtl}/>
          <a-asset-item id="scene-gltf" src={sceneGLTF}/>
          <a-asset-item id="ground-obj" src={groundObj}/>
          <a-asset-item id="ground-mtl" src={groundMtl}/>

          {/* Images */}
          {/*<img id="wood-planks" src="assets/img/tex/re_planks.png"/>*/}
          <img id="wood-toon" src={woodToon}/>
          <img id="stars" src={stars}/>
          {/*<img id="ground" src={ground}/>*/}

          {/* Materials */}
          <a-mixin id="tool-color-prime" material="color: green"/>
          <a-mixin id="tool-color-second" material="color: dark-grey"/>

          {/* Objects */}
          <a-mixin id="cube"
                   dynamic-body="shape: box; mass: 2"
              /*grabbable=""
               hoverable=""
               drag-droppable=""*/
                   geometry="primitive: box; height: 0.30; width: 0.30; depth: 0.30"
                   material="color: #EF2D00;"/>
          {/*<a-mixin id="cube-hovered"
           material="color: #FFFFFF;"/>*/}
        </a-assets>
    );
  }
}
