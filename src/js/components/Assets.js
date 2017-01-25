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
    const shelfObj = require("../../assets/3d/shelf/Shelf.obj");
    const shelfMtl = require("../../assets/3d/shelf/Shelf.mtl");
    const tableObj = require("../../assets/3d/table/Table.obj");
    const tableMtl = require("../../assets/3d/table/Table.mtl");
    // const mainTable = require("../../assets/3d/mainTable/IKEA Tisch.dae");
    const sceneObj = require("../../assets/3d/scene/Scene.obj");
    const sceneMtl = require("../../assets/3d/scene/Scene.mtl");
    // const sceneGLTF = require("../../assets/3d/scene/Scene.gltf");
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
          <a-asset-item id="shelf-obj" src={shelfObj}/>
          <a-asset-item id="shelf-mtl" src={shelfMtl}/>
          <a-asset-item id="table-obj" src={tableObj}/>
          <a-asset-item id="table-mtl" src={tableMtl}/>
          {/*<a-asset-item id="mainTable" src={mainTable}/>*/}
          <a-asset-item id="scene-obj" src={sceneObj}/>
          <a-asset-item id="scene-mtl" src={sceneMtl}/>
          {/*<a-asset-item id="scene-gltf" src={sceneGLTF}/>*/}
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
                   geometry="primitive: box; height: 0.30; width: 0.30; depth: 0.30"
                   material="color: #EF2D00;"/>
          <a-mixin id="shelf-collider-horizontal"
                   geometry="primitive: box;"
                   scale="0.5 0.03 1.8"
                   static-body="shape: box"
                   material="visible: false"/>
          <a-mixin id="shelf-collider-vertical"
                   geometry="primitive: box;"
                   rotation="90 0 0"
                   scale="0.5 0.03 1.8"
                   static-body="shape: box"
                   material="visible: false"/>
          {/*<a-mixin id="cube-hovered"
           material="color: #FFFFFF;"/>*/}
        </a-assets>
    );
  }
}
