import { Entity } from "aframe-react";
import React, { Component } from "react";
import _ from "lodash";

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
    const dominoStack = _.concat(
        this.createDominos(1, 9, 1.6, -.8, .2),
        this.createDominos(2, 9, 1.2, -.8, .2),
        this.createDominos(3, 9, 0.7, -.8, .2),
        this.createDominos(4, 9, 0.35, -.8, .2)
    );

    return (
        <Entity>
          {dominoStack}
        </Entity>
    );
  }
}
