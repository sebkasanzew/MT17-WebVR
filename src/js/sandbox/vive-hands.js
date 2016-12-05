import $ from "jquery";

export default () => {
  let hands;

  $().ready(() => {
    $("#vacuumCleaner").on("loaded", () => {
      console.log("loaded!!!!");
    });

    hands = document.querySelectorAll("a-entity[tracked-controls]");
    console.log("vive controller:", hands);
  });
}
