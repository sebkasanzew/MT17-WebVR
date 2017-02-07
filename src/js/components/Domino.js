import { Entity } from "aframe-react";
import React, { Component } from "react";

export default class Domino extends Component {
  constructor(probs) {
    super(probs);
  }

  componentDidMount() {
    const _this = this;

    setTimeout(function() {
      console.log("Force update");
      _this.forceUpdate();
    }, 4000);
  }

  createDominos(reactId, number, startHeight, startZ, distance) {
    const dominoStack = [];

    for (let i = 0; i < number; i++) {
      const position = `0 ${startHeight} ${startZ + (i * distance)}`;
      const id = `domino${reactId}-${i}`;
      dominoStack.push(<Entity key={id}
                               mixin="cube"
                               className="cube"
                               shadow="cast: true;"
                               position={position}/>);
    }

    return dominoStack;
  }

  render() {
    const dominoStack = [];

    dominoStack.push(this.createDominos(1, 9, 1.6, -.8, .2));
    dominoStack.push(this.createDominos(2, 9, 1.3, -.8, .2));
    dominoStack.push(this.createDominos(3, 9, 0.75, -.8, .2));
    dominoStack.push(this.createDominos(4, 9, 0.5, -.8, .2));

    return (
        <Entity>
          {dominoStack}
        </Entity>
    );
  }
}
