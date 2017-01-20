import { Entity } from "aframe-react";
import React from "react";

export default (props) => (
    <Entity {...props}>
      <Entity light="type: ambient; color: #BBB"/>
      <Entity light="type: directional; color: #FFF; intensity: 0.6;" position="-0.5 1 1"/>
    </Entity>
);
