import {Entity} from "aframe-react";
import React from "react";
// import Controls from "Controls";

export default (props) => (
    <Entity>
      <Entity camera="userHeight: 1.7" look-controls="" wasd-controls="" {...props}/>
      {/*
      <Entity id="leftController"
              vive-controls="hand: left"
              static-body="shape: sphere; sphereRadius: 0.02;"
              sphere-collider="objects: .cube"
              grab
      />
      <Entity id="rightController"
              vive-controls="hand: right"
              static-body="shape: sphere; sphereRadius: 0.02;"
              sphere-collider="objects: .cube"
              grab
      />
      */}
    </Entity>
);
