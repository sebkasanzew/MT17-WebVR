import "../aframe-components/physics";
import React, { Component } from "react";
// import "super-hands";

export default class Assets extends Component {
  render() {
    return (
        <a-assets timeout="10000">
          {/* Audio */}
          <audio id="saw-running" src="assets/sound/saw_running.ogg"/>
          <audio id="saw-begin" src="assets/sound/saw_begin.ogg"/>
          <audio id="saw-end" src="assets/sound/saw_end.ogg"/>

          {/* Models */}
          <a-asset-item id="mainTable" src="assets/3d/mainTable/IKEA Tisch.dae"/>
          <a-asset-item id="scene-obj" src="assets/3d/scene/scene.obj"/>
          <a-asset-item id="scene-mtl" src="assets/3d/scene/scene.mtl"/>

          {/* Images */}
          <img id="wood-planks" src="assets/img/tex/re_planks.png"/>
          <img id="wood-toon" src="assets/img/tex/wood_texture_by_dellot.jpg"/>

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
