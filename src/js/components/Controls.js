import {Entity} from "aframe-react";
import React, {Component} from "react";

// import Saw from "../components/Saw";

export default class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*
     const events = this.props.events;
     // delete this.props.events;
     console.log(events);
     */

    return (
        <Entity>
          {/* TODO figure out why the "Render count or primcount is 0" warnings appear */}
          <Entity
              id="controllerLeft"
              vive-controls="hand: left"
              {... this.props}
          />
          <Entity
              id="controllerRight"
              vive-controls="hand: right"
              {... this.props}
          />
          {this.props.children}
        </Entity>
    );
  }
}
