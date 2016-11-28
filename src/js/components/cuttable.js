import AFRAME from "aframe";
import extras from "aframe-extras";
import $ from "jquery";

/* global console:true */

"use strict";

if (typeof AFRAME === "undefined") {
  throw new Error("Component attempted to register before AFRAME was available.");
}

// TODO register only used components
extras.registerAll();

AFRAME.registerComponent("cuttable", {
  multiple: true,
  init: function() {
    console.log("cuttable registered");
  },
});

let hands;

$().ready(() => {
  $("#vacuumCleaner").on("loaded", function() {
    console.log("loaded!!!!");
  });

  hands = document.querySelectorAll("a-entity[tracked-controls]");
  console.log(hands);
});
