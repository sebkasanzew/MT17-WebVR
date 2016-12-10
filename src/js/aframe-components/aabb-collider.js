import AFRAME from "aframe";

const THREE = AFRAME.THREE;

/**
 * Implement AABB collision detection for entities with a mesh.
 * (https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box)
 * It sets the specified state on the intersected entities.
 *
 * @property {string} objects - Selector of the entities to test for collision.
 * @property {string} state - State to set on collided entities.
 *
 */
AFRAME.registerComponent("aabb-collider", {
  schema: {
    objects: {default: ""},
    state: {default: "collided"}
  },

  init() {
    this.els = [];
    this.collisions = [];
    this.elMax = new THREE.Vector3();
    this.elMin = new THREE.Vector3();
  },

  /**
   * Update list of entities to test for collision.
   */
  update() {
    const data = this.data;
    let objectEls;

    // Push entities into list of els to intersect.
    if (data.objects) {
      objectEls = this.el.sceneEl.querySelectorAll(data.objects);
    } else {
      // If objects not defined, intersect with everything.
      objectEls = this.el.sceneEl.children;
    }
    // Convert from NodeList to Array
    this.els = Array.prototype.slice.call(objectEls);
  },

  tick: (function () {
    const boundingBox = new THREE.Box3();
    return function () {
      const collisions = [];
      const el = this.el;
      const mesh = el.getObject3D("mesh");
      const self = this;
      // No mesh, no collisions
      if (!mesh) {
        return;
      }
      // Update the bounding box to account for rotations and
      // position changes.
      updateBoundingBox();
      // Update collisions.
      this.els.forEach(intersect);
      // Emit events.
      collisions.forEach(handleHit);
      // No collisions.
      if (collisions.length === 0) {
        self.el.emit("hit", {el: null});
      }
      // Updated the state of the elements that are not intersected anymore.
      this.collisions.filter(function (el) {
        return collisions.indexOf(el) === -1;
      }).forEach(function removeState(el) {
        el.removeState(self.data.state);
      });
      // Store new collisions
      this.collisions = collisions;

      // AABB collision detection
      function intersect(el) {
        let intersected;
        const mesh = el.getObject3D("mesh");
        let elMin;
        let elMax;
        if (!mesh) {
          return;
        }
        boundingBox.setFromObject(mesh);
        elMin = boundingBox.min;
        elMax = boundingBox.max;
        // Bounding boxes are always aligned with the world coordinate system.
        // The collision test checks for the conditions where cubes intersect.
        // It's an extension to 3 dimensions of this approach (with the condition negated)
        // https://www.youtube.com/watch?v=ghqD3e37R7E
        intersected = (self.elMin.x <= elMax.x && self.elMax.x >= elMin.x) &&
            (self.elMin.y <= elMax.y && self.elMax.y >= elMin.y) &&
            (self.elMin.z <= elMax.z && self.elMax.z >= elMin.z);
        if (!intersected) {
          return;
        }
        collisions.push(el);
      }

      function handleHit(hitEl) {
        hitEl.emit("hit");
        hitEl.addState(self.data.state);
        self.el.emit("hit", {el: hitEl});
      }

      function updateBoundingBox() {
        boundingBox.setFromObject(mesh);
        self.elMin.copy(boundingBox.min);
        self.elMax.copy(boundingBox.max);
      }
    };
  })()
});