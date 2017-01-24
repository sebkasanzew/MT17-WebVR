import { Entity } from "aframe-react";
import React from "react";

export default (props) => (
    <Entity {...props}>
      <Entity id="ambient-light" light="type: ambient; color: #BBF; intensity: 0.3"/>
      <Entity id="sun-light"
              shadow-light="type: directional; color: #DDFFFF; intensity: 1.0; castShadow: true"

              position="-4 5 3"/>
      {/* shadow-light="type: directional; color: #FFF; intensity: 1.0; castShadow: true" */}
    </Entity>
);
