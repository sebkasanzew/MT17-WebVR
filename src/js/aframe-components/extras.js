import extras from "aframe-extras";

export default () => {
  // TODO register only used components
  console.log("extras:", extras);

  extras.registerAll();
}
