import React from "react";
import renderer from "react-test-renderer";

import Camera from "../../src/js/components/Camera";
import {Scene, Entity} from "aframe-react";

/* global expect */

global.AFRAME = {
  components: {
    camera: {},
    geometry: {},
    material: {},
    position: {},
    scale: {}
  }
};

describe("Camera", () => {
  it("renders <a-camera>", () => {
    const tree = renderer.create(
        <Camera/>
    ).toJSON();
    expect(tree.type).toBe("a-entity");
  });
});

describe("Scene", () => {
  it("renders <a-scene>", () => {
    const tree = renderer.create(
        <Scene>
          <Entity/>
        </Scene>
    ).toJSON();
    expect(tree.type).toBe("a-scene");
    expect(tree.children[0].type).toBe("a-entity");
  });
});
