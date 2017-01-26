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

  render() {
    const dominoStack = [];

    for (let i = 0; i < 10; i++) {
      const position = `0 1.6 ${-.8 + (i / 5)}`;
      const id = `domino1-${i}`;
      dominoStack.push(<Entity key={id}
                               mixin="cube"
                               className="cube"
                               shadow="cast: true;"
                               position={position}/>);
    }

    for (let i = 0; i < 10; i++) {
      const position = `0 1.3 ${-.8 + (i / 5)}`;
      const id = `domino2-${i}`;
      dominoStack.push(<Entity key={id}
                               mixin="cube"
                               className="cube"
                               shadow="cast: true;"
                               position={position}/>);
    }

    for (let i = 0; i < 10; i++) {
      const position = `0 0.75 ${-.8 + (i / 5)}`;
      const id = `domino3-${i}`;
      dominoStack.push(<Entity key={id}
                               mixin="cube"
                               className="cube"
                               shadow="cast: true;"
                               position={position}/>);
    }

    for (let i = 0; i < 10; i++) {
      const position = `0 0.5 ${-.8 + (i / 5)}`;
      const id = `domino4-${i}`;
      dominoStack.push(<Entity key={id}
                               mixin="cube"
                               className="cube"
                               shadow="cast: true;"
                               position={position}/>);
    }

    return (
        <Entity>
          {dominoStack}
        </Entity>
    );
  }
}
