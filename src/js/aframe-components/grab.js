import AFRAME from "aframe";

/**
 * Handles events coming from the hand-controls.
 * Determines if the entity is grabbed or released.
 * Updates its position to move along the controller.
 */
AFRAME.registerComponent("grab", {
  init() {
    this.GRABBED_STATE = "grabbed";
    // Bind event handlers
    this.onHit = this.onHit.bind(this);
    this.onGripOpen = this.onGripOpen.bind(this);
    this.onGripClose = this.onGripClose.bind(this);
  },

  play() {
    const el = this.el;
    el.addEventListener("hit", this.onHit);
    el.addEventListener("gripclose", this.onGripClose);
    el.addEventListener("gripopen", this.onGripOpen);
    el.addEventListener("thumbup", this.onGripClose);
    el.addEventListener("thumbdown", this.onGripOpen);
    el.addEventListener("pointup", this.onGripClose);
    el.addEventListener("pointdown", this.onGripOpen);
  },

  pause: function () {
    const el = this.el;
    el.removeEventListener("hit", this.onHit);
    el.removeEventListener("gripclose", this.onGripClose);
    el.removeEventListener("gripopen", this.onGripOpen);
    el.removeEventListener("thumbup", this.onGripClose);
    el.removeEventListener("thumbdown", this.onGripOpen);
    el.removeEventListener("pointup", this.onGripClose);
    el.removeEventListener("pointdown", this.onGripOpen);
  },

  onGripClose() {
    this.grabbing = true;
    delete this.previousPosition;
  },

  onGripOpen() {
    const hitEl = this.hitEl;
    this.grabbing = false;
    if (!hitEl) {
      return;
    }
    hitEl.removeState(this.GRABBED_STATE);
    this.hitEl = undefined;
  },

  onHit: function (evt) {
    const hitEl = evt.detail.el;
    // If the element is already grabbed (it could be grabbed by another controller).
    // If the hand is not grabbing the element does not stick.
    // If we're already grabbing something you can't grab again.
    if (!hitEl || hitEl.is(this.GRABBED_STATE) || !this.grabbing || this.hitEl) {
      return;
    }
    hitEl.addState(this.GRABBED_STATE);
    this.hitEl = hitEl;
  },

  tick: function () {
    const hitEl = this.hitEl;
    if (!hitEl) {
      return;
    }
    this.updateDelta();
    const position = hitEl.getComputedAttribute("position");
    hitEl.setAttribute("position", {
      x: position.x + this.deltaPosition.x,
      y: position.y + this.deltaPosition.y,
      z: position.z + this.deltaPosition.z
    });
  },

  updateDelta: function () {
    const currentPosition = this.el.getComputedAttribute("position");
    const previousPosition = this.previousPosition || currentPosition;
    const deltaPosition = {
      x: currentPosition.x - previousPosition.x,
      y: currentPosition.y - previousPosition.y,
      z: currentPosition.z - previousPosition.z
    };
    this.previousPosition = currentPosition;
    this.deltaPosition = deltaPosition;
  }
});
