import { Entity } from "aframe-react";
import React from "react";
// import Controls from "Controls";

export default (props) => (
    <Entity>
      <Entity camera="userHeight: 1.7" look-controls="" wasd-controls="" {...props}/>
    </Entity>
);
