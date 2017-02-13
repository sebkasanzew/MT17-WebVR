import { Entity } from "aframe-react";
import React, { Component } from "react";

import "../aframe-components/physics";

export default class Balls extends Component {
  constructor(probs) {
    super(probs);

    this.numberOfBalls = 7;
  }

  createBall(color, id) {
    const position = `0 ${1 + (Math.random() * 2)} 0`;

    return (
        <Entity key={"ball-" + id}
                geometry="primitive: sphere; radius: 0.1"
                position={position}
                material={color}
                className="grabbable"
                dynamic-body="shape: sphere; sphere-radius: 0.1"/>
    );
  }

  render() {
    const balls = [];

    for (let i = 0; i < this.numberOfBalls; i++) {
      const randomColor = "color: #" + (Math.random() * 0xFFFFFF << 0).toString(16);
      balls.push(this.createBall(randomColor, i));
    }

    console.log(balls);

    return (
        <Entity>
          {balls}
        </Entity>
    );
  }
}