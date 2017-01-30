import { Entity } from "aframe-react";
import React from "react";
// import Controls from "Controls";

export default (props) => (
    <Entity>
      <Entity camera="userHeight: 1.7"
              look-controls=""
              wasd-controls=""
              rotation="0 180 0"
              {...props}/>
    </Entity>
);
