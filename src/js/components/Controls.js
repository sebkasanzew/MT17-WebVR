import {Entity} from "aframe-react";
import React from "react";

export default (props) => (
    <Entity>
      {/* TODO figure out why the "Render count or primcount is 0" warnings appear */}
      <Entity id="leftController"
              vive-controls="hand: left"
              {...props}
      />
      <Entity id="rightController"
              vive-controls="hand: right"
              {...props}
      />
    </Entity>
);
