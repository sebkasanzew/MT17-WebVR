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
    // const sceneDae = require("../../assets/3d/scene/Scene.dae");
    const sceneObj = require("../../assets/3d/scene/Scene.obj");
    const sceneMtl = require("../../assets/3d/scene/Scene.mtl");
    // const sceneGLTF = require("../../assets/3d/scene/Scene.gltf");
    const groundObj = require("../../assets/3d/scene/Ground.obj");
    const groundMtl = require("../../assets/3d/scene/Ground.mtl");
    const bucketObj = require("../../assets/3d/bucket/bucket.obj");

    // Images
    const woodToon = require("../../assets/img/tex/wood_texture_by_dellot.jpg");
    const stars = require("../../assets/img/360/stars_optimized.png");
    require("../../assets/img/tex/GroundCompleteMap_optimized.png");
    require("../../assets/3d/shelf/COM_Deco_IndecoA_SteelShelf01_D01.tga.png");
    require("../../assets/3d/table/COM_Deco_OutdecoB_WoodTable01_D01.tga.png");

    return (
        <a-assets timeout="5000">
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
          {/*<a-asset-item id="scene-dae" src={sceneDae}/>*/}
          <a-asset-item id="scene-obj" src={sceneObj}/>
          <a-asset-item id="scene-mtl" src={sceneMtl}/>
          {/*<a-asset-item id="scene-gltf" src={sceneGLTF}/>*/}
          <a-asset-item id="ground-obj" src={groundObj}/>
          <a-asset-item id="ground-mtl" src={groundMtl}/>
          <a-asset-item id="bucket-obj" src={bucketObj}/>

          {/* Images */}
          {/*<img id="wood-planks" src="assets/img/tex/re_planks.png"/>*/}
          <img id="wood-toon" src={woodToon}/>
          <img id="stars" src={stars}/>
          {/*<img id="ground" src={ground}/>*/}

          {/* Materials */}
          <a-mixin id="tool-color-prime" material="color: green"/>
          <a-mixin id="tool-color-second" material="color: dark-grey"/>
          <a-mixin id="bucket-mat" material="color: #1376FD"/>

          {/* Objects */}
          <a-mixin id="cube"
                   dynamic-body="shape: box; mass: 2;"
                   geometry="primitive: box; height: 0.3; width: 0.2; depth: 0.07"
                   material="color: #AAA;"/>
          <a-mixin id="shelf-collider-horizontal"
                   geometry="primitive: box;"
                   scale="0.5 0.03 1.8"
                   static-body="shape: auto"
                   material="visible: false"/>
          <a-mixin id="shelf-collider-vertical"
                   geometry="primitive: box;"
                   scale="0.5 1.8 0.03"
                   static-body="shape: auto"
                   material="visible: false"/>
          {/*<a-mixin id="cube-hovered"
           material="color: #FFFFFF;"/>*/}
        </a-assets>
    );
  }
}
