import { Entity } from "aframe-react";
import React, { Component } from "react";
import "aframe-auto-detect-controllers-component";

// import Saw from "../components/Saw";

export default class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Entity>
          <Entity
              id="controllerLeft"
              auto-detect-controllers="hand: left;"
              // vive-controls="hand: left;"
              {... this.props}
          />
          <Entity
              id="controllerRight"
              auto-detect-controllers="hand: right;"
              // vive-controls="hand: right;"
              {... this.props}
          />
          {this.props.children}
        </Entity>
    );
  }
}
