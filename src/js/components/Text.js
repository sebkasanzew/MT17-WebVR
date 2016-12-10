import {Entity} from "aframe-react";
import React from "react";
import AFRAME from "aframe";

export default (props) => {
  const extraProps = AFRAME.utils.extend({}, props);
  delete extraProps.color;
  delete extraProps.text;

  return <Entity
      text={{text: props.text}} material={{color: props.color}}
      {...extraProps}/>;
};
