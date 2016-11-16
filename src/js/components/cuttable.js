import AFRAME from "aframe";

/* global console:true */

"use strict";

AFRAME.registerComponent("cuttable", {
  multiple: true,
  init: function() {
    console.log(this.system);
  },
});

export default AFRAME;
